import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { SignUp } from '../../components/authentication/sign-up-form/sign-up-form.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  protected url = 'http://localhost:3000/users';

  private users : SignUp[] = []

  constructor(private http : HttpClient) { }
  
  // private currentUserSubject = new BehaviorSubject<SignUp | null>(null);
  // public currentUser$: Observable<SignUp | null> = this.currentUserSubject.asObservable();

  getUser(email : any, password : any):Observable<any>{
    return this.http.get<any[]>(`${this.url}?email=${email}`).pipe(map(users=>{
      if(users.length !== 0 ){
        if(password === users[0].password){
          // this.currentUserSubject.next(users[0])
          localStorage.setItem("userId",users[0].id);
          return users[0];
        }else{
          alert("Invalid Login Credentials");
          console.log("Data not found");
        }
      }else{
        alert("Invalid Login Credentials");
        console.log("Data not found");
      }
    }))
  }

  getUserById(userId : string):Observable<any>{
    return this.http.get<any[]>(`${this.url}?id=${userId}`).pipe(map(users=>{
      if(users.length!==0){
        return users[0];
      }
    }))
  }

}
