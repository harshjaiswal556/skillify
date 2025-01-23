import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  protected url = 'http://localhost:3000/users';

  constructor(private http : HttpClient) { }

  getUser(email : any, password : any):Observable<any>{
    return this.http.get<any[]>(`${this.url}?email=${email}`).pipe(map(users=>{
      if(users.length !== 0 ){
        if(password === users[0].password){
          console.log("Data found");
        }else{
          console.log("Data not found");
        }
      }else{
        console.log("Data not found");
      }
    }))
  }
}
