import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment'

export interface AuthResponseData{
   idToken	:string	;
   email:string;
   refreshToken:string;
   expiresIn:string;
   localId:string;
   registered?:boolean;
}



@Injectable({
    providedIn:"root"
})
export class AuthService{
    tokenExpirationTimer:any;
    constructor(private http:HttpClient,private router:Router){}

    user =new BehaviorSubject<User>(null);

    signup(email:string,password:string)
{
    return this.http.
    post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,
    {
    email:email,
    password:password,
    returnSecureToken:true
}
)
  .pipe(
    catchError(this.handelError),
    tap(resData=>{
    this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn
    );
})
)
}

login(email:string,password:string)
{
return   this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
 {
    email:email,
    password:password,
    returnSecureToken:true
  }
  )
  .pipe(
      catchError(this.handelError),
      tap(resData => {
    this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn
    );
}))
}
private handelError(errorRes:HttpErrorResponse)
    {
        let errorMessage='An unknown error occurred!'
        if(!errorRes.error ||!errorRes.error.error)
        {   
             return throwError(errorMessage);
        }
        switch (errorRes.error.error.message){
            case 'EMAIL_EXISTS':
            errorMessage="email already exist";
            break;
            case 'EMAIL_NOT_FOUND':
                errorMessage="wrong email id"
                break;
            case 'INVALID_PASSWORD':
                errorMessage="wrong password "
                break;
                }
        return throwError(errorMessage);
    }
autoLogin(){
    const userdata:{
        email: string;
        id: string;
       _token: string;
      _tokenExpirationDate: Date;
    }
    =JSON.parse(localStorage.getItem('userData'));
    if(!userdata){
        return;
    }
    const loadedUser= new User(userdata.email,userdata.id,userdata._token,new Date(userdata._tokenExpirationDate));
    if(loadedUser.token)
    {
        this.user.next(loadedUser);
        const expirationdate=new Date(userdata._tokenExpirationDate).getTime()-new Date().getTime()
        this.autoLogOut(expirationdate)
    }

}
private handleAuthentication(
    email:string,
    userId:string,token:string,
    expiresIn:number
    )
    {
    const expirationDate=new Date(new Date().getTime()+ expiresIn*1000);
    const user=new User(email,userId,token,expirationDate)
    this.user.next(user);
    this.autoLogOut(expiresIn*1000);
    localStorage.setItem('userData',JSON.stringify(user));
}
logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer)
    {
        clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer=null;
}
autoLogOut(expirationDuration:number)
{
  this.tokenExpirationTimer =setTimeout(()=>{
      this.logout();
  },expirationDuration)
}

}