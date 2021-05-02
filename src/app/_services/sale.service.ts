import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  getAllSales():Observable<any>{
    return this.http.get(
        `${apiUrl}getSales`, 
        {
          headers:{
            'x-access-token': localStorage.getItem('token')
          }
        }
      )
  }

  getVATRate():Observable<any>{
    return this.http.get(
        `${apiUrl}getVAT`,
        {
          headers:{
            'x-access-token': localStorage.getItem('token')
          }
        }
      )
  }

  addSale(sale:object):Observable<any>{
    return this.http.post(
        `${apiUrl}addSale`, 
        sale, 
        {
          headers:{
            'x-access-token': localStorage.getItem('token')
          }
        }
      )
  }

  getChartData(days:number):Observable<any>{
    return this.http.get(
        `${apiUrl}getSales/${days}`,
        {
          headers:{
            'x-access-token': localStorage.getItem('token')
          }
        }
      )
  }

}
