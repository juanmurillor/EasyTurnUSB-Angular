import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from '../../global';
import { Observable } from 'rxjs';
import { Producto } from './../../domain/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url: string;

  constructor(public httpClient: HttpClient) {
    this.url = GLOBAL.url + 'productrestaurantes';
   }

  public save(producto: Producto): Observable<any> {
    return this.httpClient.post(this.url + '/saveProductrestaurantes/', producto);
  }

  public update(producto: Producto): Observable<any> {
    return this.httpClient.post(this.url + '/updateProductrestaurantes/', producto);
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete(this.url + '/deleteProductrestaurantes/' + id);
  }

  public findAll(): Observable<any> {
    return this.httpClient.get(this.url + '/getDataProductrestaurantes');
  }

  public findById(id: string) {
    return this.httpClient.get(this.url + '/getProductrestaurantes/' + id);
  }

  public findProductoByRestaurante(id: number) {
    return this.httpClient.get(this.url + '/getProductByRestaurant/' + id);
  }
}
