import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {
  baseUrl:string = "https://www.nrb.org.np/api/forex/v1/"
  constructor(
    private http: HttpClient
  ) { }

  getFOREXrate(perpage, date1, date2, page):Observable<any>{
    return this.http.get(
        `${this.baseUrl}rates?per_page=${perpage}&from=${date1}&to=${date2}&page=${page}`,
        
      )
  }

}
// rates?per_page=2&from=2020-12-18&to=2020-12-18&page=1

// {
//   "code": "wp_die",
//   "message": "<h1>Error establishing a database connection</h1>",
//   "data": {
//       "status": 500
//   },
//   "additional_errors": []
// }