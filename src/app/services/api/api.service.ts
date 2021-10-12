import { Injectable } from '@angular/core';
import { ProductInterface } from '../../models/product.interface';
import { ResponseInterface } from '../../models/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://127.0.0.1:5000/webApi/';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductInterface[]> {
    let dir = this.url + 'products';
    return this.http.get<ProductInterface[]>(dir);
  }

  newProducts(product: ProductInterface): Observable<ResponseInterface> {
    let dir = this.url + 'product';
    return this.http.post<ResponseInterface>(dir, product);
  }

  updateProduct(product: ProductInterface): Observable<ResponseInterface> {
    let dir = this.url + 'product';
    return this.http.put<ResponseInterface>(dir, product);
  }

  deleteProduct(product: ProductInterface): Observable<ResponseInterface> {
    let dir = this.url + 'product';
    return this.http.delete<ResponseInterface>(dir, {
      params: { id_product: product.id_product },
    });
  }
}
