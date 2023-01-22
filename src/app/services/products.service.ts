import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import {
  Producto,
  CreateProductoDTO,
  UpdateProductDTO,
} from '../models/product.model';
import { environment } from '../../environments/environment';
import { retry, catchError, map } from 'rxjs/operators'; //para reintentar peticiones
import { throwError, zip } from 'rxjs'; //para reintentar peticiones (devolver un error)
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}/api`;

  constructor(private http: HttpClient) {}

  getByCategory(categoryId: string, limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Producto[]>(
      `${this.apiUrl}/categories/${categoryId}/products`,
      { params }
    );
  }

  getAllProducts(limit?: number, offset?: number) {
    //es opcional tanto el limit como el offset
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http
      .get<Producto[]>(this.apiUrl, { params, context: checkTime() })
      .pipe(
        //hago un trnaformacion de esta peticion
        //cuantas veces puedo reintentar dicha peticion (3 veces)
        retry(3),
        map((products) =>
          products.map((item) => {
            return {
              ...item,
              taxes: 0.19 * item.price,
            };
          })
        )
      );
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
    return zip(this.getProduct(id), this.update(id, dto));
  }
  // Manejo de los errores:
  getProduct(id: string) {
    return this.http.get<Producto>(`${this.apiUrl}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.Conflict) {
          return throwError(() => new Error('Algo esta fallando en el Server'));
          //return throwError('Algo esta fallando en el Server'); //esta en desuso
        }
        if (error.status == HttpStatusCode.NotFound) {
          return throwError(() => new Error('El producto no existe'));
          //return throwError('El producto no existe');
        }
        if (error.status == HttpStatusCode.Unauthorized) {
          return throwError(
            () => new Error('No estas permitido para ingrasar')
          );
          //erro 401 cuando uno no esta autorizado
          //return throwError('No estas permitido para ingrasar');
        }
        return throwError(() => new Error('Ups algo salio mal'));
        // return throwError('Ups algo salio mal');
      })
    );
  }
  // paginación
  getProductsBypage(limit: number, offset: number) {
    return this.http.get<Producto[]>(`${this.apiUrl}`, {
      params: { limit, offset },
    });
  }

  create(dto: CreateProductoDTO) {
    return this.http.post<Producto>(`${this.apiUrl}/products`, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Producto>(`${this.apiUrl}/products/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}
