import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})

export class AuthService {


  constructor(private http:HttpClient) { }


  login(user):Observable<any>{
    return this.http.post(
      `${apiUrl}login`, 
      user
    )
  }

  getAllUsers():Observable<any>{
    return this.http.get(
        `${apiUrl}getUsers`, 
        {
          headers:{
            'x-access-token': localStorage.getItem('token')
          }
        }
      )
  }
  
  addUser(user):Observable<any>{
    return this.http.post(
        `${apiUrl}register`, 
        user, 
        {
          headers:{
            'x-access-token': localStorage.getItem('token')
          }
        }
      )
  }

  updateUser(user:object):Observable<any>{
    return this.http.put(
      `${apiUrl}updateUser/${user['user_id']}`, 
      user, 
      {
        headers:{
          'x-access-token': localStorage.getItem('token')
        }
      }
    )
  }
  
}
