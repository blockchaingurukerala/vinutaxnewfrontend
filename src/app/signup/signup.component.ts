import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  fullname="";
  email="";
  password="";
  constructor(private api:ApiService,private router:Router) { 
    if(localStorage.getItem("loggedIn")=="true"){
      this.router.navigate(['/dashboard']);
    }
  }
  ngOnInit(): void {
  }
  signUpUser(){
    this.email=this.email.trim();
    this.password=this.password.trim();
    this.api.checkUserNameAvailable(this.email).subscribe((data:any)=>{
      if(data.msg=="Already Registered"){
        window.alert("Already Registered..Pls Login"); 
        this.router.navigate(['']);
      }
      else{
        this.api.insertNewUser(this.fullname,this.email,this.password).subscribe((data:any)=>{
         console.log(data.msg);
         window.alert(data.msg);
          this.router.navigate(['']);
        }); 
      }  
    });  
  }
}
