import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from '../api.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-customerawaitingpayment',
  templateUrl: './customerawaitingpayment.component.html',
  styleUrls: ['./customerawaitingpayment.component.css']
})
export class CustomerawaitingpaymentComponent implements OnInit {

  customerinvoices = []; 
  customerdrftinvoices=[];
  whose=localStorage.getItem("uEmail"); 
  displaycustomerorsupplier="NONE";
  invoicename="NONE";
  constructor(private router:Router,private api:ApiService,private sharedapi:SharedService) {
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
    if(this.sharedapi.getCustomerOrSupplier()=="Customer"){
      this.displaycustomerorsupplier="Customer"; 
      this.invoicename="New Customer Invoice";
      this.api.getAllCustomerInvoioce(this.whose).subscribe((data:any)=>{
        //console.log(data);    
        data.forEach(element => {
          if(element.customerid==""){
            this.customerinvoices.push({"customerid":element.customerid,"id":element._id,"invoiceid":element.invoiceid,"reference":element.reference,"customername":element.customername,"date":element.date,"duedate":element.duedate,"totalamount":element.totalamount,"status":"approved","link":false});
          }
          else{
            this.customerinvoices.push({"customerid":element.customerid,"id":element._id,"invoiceid":element.invoiceid,"reference":element.reference,"customername":element.customername,"date":element.date,"duedate":element.duedate,"totalamount":element.totalamount,"status":"approved","link":true});
           // this.api.getCustomerNameFromId(element.customerid).subscribe((nameobj:any)=>{
             // this.customerinvoices.push({"customerid":element.customerid,"id":element._id,"invoiceid":element.invoiceid,"reference":element.reference,"customername":element.customername,"date":element.date,"duedate":element.duedate,"totalamount":element.totalamount,"status":"approved","link":true});
           // });
          }        
        });
      }); 
    }
    else if(this.sharedapi.getCustomerOrSupplier()=="Supplier"){
      this.displaycustomerorsupplier="Supplier"; 
      this.invoicename="New Supplier Invoice";
      this.api.getAllSupplierInvoioce(this.whose).subscribe((data:any)=>{
        //console.log(data);    
        data.forEach(element => {
          if(element.customerid==""){
            this.customerinvoices.push({"customerid":element.customerid,"id":element._id,"invoiceid":element.invoiceid,"reference":element.reference,"customername":element.customername,"date":element.date,"duedate":element.duedate,"totalamount":element.totalamount,"status":"approved","link":false});
          }
          else{
            this.customerinvoices.push({"customerid":element.customerid,"id":element._id,"invoiceid":element.invoiceid,"reference":element.reference,"customername":element.customername,"date":element.date,"duedate":element.duedate,"totalamount":element.totalamount,"status":"approved","link":true});
           // this.api.getCustomerNameFromId(element.customerid).subscribe((nameobj:any)=>{
             // this.customerinvoices.push({"customerid":element.customerid,"id":element._id,"invoiceid":element.invoiceid,"reference":element.reference,"customername":element.customername,"date":element.date,"duedate":element.duedate,"totalamount":element.totalamount,"status":"approved","link":true});
           // });
          }       
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
  displayNewinvoice(){
    this.router.navigate(['\customerinvoice']);
  }
  editordelete(i,status){
    // window.alert(status)
     this.sharedapi.setidforcustomeredit(i,status);
     //this.router.navigate(['\editcustomerinvoice']);
      this.router.navigate(['\intermediatedisplay']);    
   }
   customerclicked(i){   
     this.sharedapi.setSelectedCustomerID(i);
   }
   setasCustomer(){   
    this.sharedapi.setCustomerOrSupplier("Customer");

  }
  setasSupplier(){   
    this.sharedapi.setCustomerOrSupplier("Supplier");
  }
}
