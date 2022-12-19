export interface Category {
  id: string;
  name: string;
}

export interface Producto {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number;
}
// Creo una interfaz que herede lo mismo que Producto pero omita (Omit) el id y la categoria
export interface CreateProductoDTO extends Omit<Producto, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductoDTO> {}
