import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CreateUsertoDTO, User } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `${environment.API_URL}/api/users`;

  constructor(private http: HttpClient) {}

  create(dto: CreateUsertoDTO) {
    return this.http.post<User>(this.apiUrl, dto);
  }

  getAll() {
    return this.http.get<User[]>(this.apiUrl);
  }

  deleteUser(id: string) {
    return this.http.delete<User['id']>(`${this.apiUrl}/${id}`);
  }

  $openForm = new EventEmitter<any>();
  $send = new EventEmitter<any>();
}
