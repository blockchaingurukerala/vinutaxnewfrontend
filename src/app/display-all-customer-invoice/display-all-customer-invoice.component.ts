import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service'
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-display-all-customer-invoice',
  templateUrl: './display-all-customer-invoice.component.html',
  styleUrls: ['./display-all-customer-invoice.component.css']
})
export class DisplayAllCustomerInvoiceComponent implements OnInit {
  customerinvoices = []; 
  customerdrftinvoices=[];
  whose=localStorage.getItem("uEmail"); 
  constructor(private router:Router,private api:ApiService,private sharedapi:SharedService) {
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
    this.api.getAllCustomerInvoioce(this.whose).subscribe((data:any)=>{
      //console.log(data);    
      data.forEach(element => {
        this.api.getCustomerNameFromId(element.customerid).subscribe((nameobj:any)=>{
          this.customerinvoices.push({"id":element._id,"invoiceid":element.invoiceid,"reference":element.reference,"customername":nameobj.name,"date":element.date,"duedate":element.duedate,"totalamount":element.totalamount,"status":"approved"});
        });        
      });
    }); 
    this.api.getAllCustomerDraftInvoioce(this.whose).subscribe((data:any)=>{
      //console.log(data);    
      data.forEach(element => {
        this.api.getCustomerNameFromId(element.customerid).subscribe((nameobj:any)=>{
          this.customerinvoices.push({"id":element._id,"invoiceid":element.invoiceid,"reference":element.reference,"customername":nameobj.name,"date":element.date,"duedate":element.duedate,"totalamount":element.totalamount,"status":"draft"});
        });        
      });
    }); 

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
}
