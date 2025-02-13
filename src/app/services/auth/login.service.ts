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
      if(!(users[0].isDeactivateByUser || users[0].isDeactivateByAdmin) ){
        if(password === users[0].password){
          localStorage.setItem("userId",users[0].id);
          localStorage.setItem("user", JSON.stringify(users[0]));
          return users[0];
        }else{
          alert("Invalid Login Credentials");
          console.log("Data not found");
          return null
        }
      }else{
        alert("Your ID has been deactivated.");
        console.log("Data not found");
        return null
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

  deleteUserById(userId : string):Observable<any>{
    // return this.http.delete(this.url+"/"+userId);
    return this.http.patch(`${this.url}/${userId}`, {isDeactivateByUser : true});
  }

  deleteUserByIdAdmin(userId : string):Observable<any>{
    console.log(userId);
    debugger
    // return this.http.delete(this.url+"/"+userId);
    return this.http.patch(`${this.url}/${userId}`, {isDeactivateByAdmin : true});
  }



}
