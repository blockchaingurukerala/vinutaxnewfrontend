import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service'
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-displayallcustomers',
  templateUrl: './displayallcustomers.component.html',
  styleUrls: ['./displayallcustomers.component.css']
})
export class DisplayallcustomersComponent implements OnInit {
  whose=localStorage.getItem("uEmail"); 
  allcustomers=[];
  userFullName="";
  userEmailId="";
  userAddress="";
  userContactNo="";
  isOpen:boolean;
  constructor(private router:Router,private api:ApiService,private sharedapi:SharedService) {
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
    this.api.getAllCustomers(this.whose).subscribe((data:any)=>{
      //console.log(data);    
      data.forEach(element => {      
          this.allcustomers.push(element);            
      });
    }); 
  }

  ngOnInit(): void {
  }
  displayIndividualCustomer(i){
    this.sharedapi.setSelectedCustomerID(i);
    this.router.navigate(['\individualcustomer']);
  }
  addNewCustomer(){
    this.isOpen=false;
    this.api.addCustomerDetils(this.userFullName,this.userEmailId,this.userContactNo,this.userAddress,this.whose).subscribe((data:any)=>{
      if(data.msg=="Database Error"){
        window.alert("Connection Error Please Try After Some time");
      }
      else{
        window.alert("Added Successfully");
        this.allcustomers.push({"_id":data.msg,"userFullName":this.userFullName,"userEmailId":this.userEmailId,"userAddress":this.userAddress,"userContactNo":this.userContactNo})        
      }
    });

  }
}
