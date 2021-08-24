import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-display-customer-draft-invoice',
  templateUrl: './display-customer-draft-invoice.component.html',
  styleUrls: ['./display-customer-draft-invoice.component.css']
})
export class DisplayCustomerDraftInvoiceComponent implements OnInit {
  customerinvoices = []; 
  customerdrftinvoices=[];
  whose=localStorage.getItem("uEmail"); 
  constructor(private router:Router,private api:ApiService,private sharedapi:SharedService) {
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
    this.api.getAllCustomerDraftInvoioce(this.whose).subscribe((data:any)=>{
      //console.log(data);    
      data.forEach(element => {
        this.api.getCustomerNameFromId(element.customerid).subscribe((nameobj:any)=>{
          this.customerinvoices.push({"customerid":element.customerid,"id":element._id,"invoiceid":element.invoiceid,"reference":element.reference,"customername":nameobj.name,"date":element.date,"duedate":element.duedate,"totalamount":element.totalamount,"status":"draft"});
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
