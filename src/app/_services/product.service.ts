import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAllProduct():Observable<any>{
    return this.http.get(
        `${apiUrl}getProducts`, 
        {
          headers:{
            'x-access-token': localStorage.getItem('token')
          }
        }
      )
  }

  addProduct(product:object):Observable<any>{
    return this.http.post(
        `${apiUrl}addProduct`, 
        product, 
        {
          headers:{
            'x-access-token': localStorage.getItem('token')
          }
        }
      )
  }

  updateProduct(product:object):Observable<any>{
    return this.http.put(
        `${apiUrl}updateProduct/${product['product_id']}`, 
        product, 
        {
          headers:{
            'x-access-token': localStorage.getItem('token')
          }
        }
      )
  }
  
}
