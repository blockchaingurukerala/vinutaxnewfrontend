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
  displaycustomerorsupplier="NONE";
  userdetails="NONE";
  allusers="NONE";
  addnewuserbtn="NONE";
  constructor(private router:Router,private api:ApiService,private sharedapi:SharedService) {
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
    if(this.sharedapi.getCustomerOrSupplier()=="Customer"){
      this.addnewuserbtn="ADD NEW CUSTOMER";
      this.displaycustomerorsupplier="Customer";
      this.userdetails="Customer Details";
      this.allusers="All Customers";
      this.api.getAllCustomers(this.whose).subscribe((data:any)=>{
        //console.log(data);    
        data.forEach(element => {      
            this.allcustomers.push(element);            
        });
      }); 
    }
     else if(this.sharedapi.getCustomerOrSupplier()=="Supplier"){
      this.addnewuserbtn="ADD NEW SUPPLIER";
      this.displaycustomerorsupplier="Supplier";
      this.userdetails="Supplier Details";
      this.allusers="All Suppliers";
      this.api.getAllSuppliers(this.whose).subscribe((data:any)=>{
        //console.log(data);    
        data.forEach(element => {      
            this.allcustomers.push(element);            
        });
      }); 
    }
    else{    
          this.displaycustomerorsupplier="NONE"; 
          this.router.navigate(['/report']);     
    }
  
  }

  ngOnInit(): void {
  }
  displayIndividualCustomer(i){
    this.sharedapi.setSelectedCustomerID(i);
    this.router.navigate(['\individualcustomer']);
  }
  addNewCustomer(){
    this.isOpen=false;
    if(this.sharedapi.getCustomerOrSupplier()=="Customer"){
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
     else if(this.sharedapi.getCustomerOrSupplier()=="Supplier"){
      this.api.addSupplierDetils(this.userFullName,this.userEmailId,this.userContactNo,this.userAddress,this.whose).subscribe((data:any)=>{
        if(data.msg=="Database Error"){
          window.alert("Connection Error Please Try After Some time");
        }
        else{
          window.alert("Added Successfully");
          this.allcustomers.push({"_id":data.msg,"userFullName":this.userFullName,"userEmailId":this.userEmailId,"userAddress":this.userAddress,"userContactNo":this.userContactNo})        
        }
      });
  
    }
    else{    
          this.displaycustomerorsupplier="NONE"; 
          this.router.navigate(['/report']);     
    }
   
  }
  setasCustomer(){   
    this.sharedapi.setCustomerOrSupplier("Customer");
    this.addnewuserbtn="ADD NEW CUSTOMER";
    this.displaycustomerorsupplier="Customer";
    this.userdetails="Customer Details";
    this.allusers="All Customers";
    this.allcustomers=[];
    this.api.getAllCustomers(this.whose).subscribe((data:any)=>{
      //console.log(data);    
      data.forEach(element => {      
          this.allcustomers.push(element);            
      });
    }); 
  }
  setasSupplier(){   
    this.sharedapi.setCustomerOrSupplier("Supplier");
    this.addnewuserbtn="ADD NEW SUPPLIER";
      this.displaycustomerorsupplier="Supplier";
      this.userdetails="Supplier Details";
      this.allusers="All Suppliers";
      this.allcustomers=[];
      this.api.getAllSuppliers(this.whose).subscribe((data:any)=>{
        //console.log(data);    
        data.forEach(element => {      
            this.allcustomers.push(element);            
        });
      }); 
  }
}
