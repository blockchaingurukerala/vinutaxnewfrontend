import { Component, OnInit,AfterContentChecked } from '@angular/core';
import {SharedService} from '../shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,AfterContentChecked{
   fullname="";
   loggedin=false;
  constructor(private sharedService:SharedService,private router:Router) {
    if(localStorage.getItem("loggedIn")=="true"){
      this.router.navigate(['/summary']);
    }
   }
  ngOnInit(): void {
   
  }
  logOut(){    
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("uName");
    localStorage.removeItem("uEmail");
    this.router.navigate(['']);
  }
  ngAfterContentChecked() {
    if(localStorage.getItem("loggedIn")=="true"){
      this.loggedin=true;
    } 
    else{
      this.loggedin=false;
    }   
    this.fullname = localStorage.getItem("uName");
  }
}
