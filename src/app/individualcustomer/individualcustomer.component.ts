import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Router} from '@angular/router';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-individualcustomer',
  templateUrl: './individualcustomer.component.html',
  styleUrls: ['./individualcustomer.component.css']
})
export class IndividualcustomerComponent implements OnInit {
  totalmamount=0;
  editing=false;
  noediting=true;
   customerid="";
   userFullName ="";
   userEmailId ="";
   userContactNo="";
   userAddress="";
    customerinvoices = []; 
    customerdrftinvoices=[];
     whose=localStorage.getItem("uEmail"); 
     isOpen:boolean;
  EnterValidData(){
   window.alert("Enter Valid Data");
  }
  constructor(private api:ApiService,private router:Router,private sharedservice:SharedService) { 
    // var id=this.sharedservice.getidforcustomeredit();
    this.customerid=this.sharedservice.getSelectedCustomer();
   this.editing=false;
   this.noediting=true;
    this.api.getCustomerDetails(this.customerid).subscribe((data:any)=>{      
      this.userFullName=data[0].userFullName;
      this.userEmailId=data[0].userEmailId;
      this.userContactNo=data[0].userContactNo;
      this.userAddress=data[0].userAddress;      
    });   
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
    this.api.getAllInvoioceOfACustomer(this.whose,this.customerid).subscribe((data:any)=>{
      //console.log(data);    
      data.forEach(element => {
        this.api.getCustomerNameFromId(element.customerid).subscribe((nameobj:any)=>{
          this.totalmamount=this.totalmamount+Number(element.totalamount);
          this.customerinvoices.push({"customerid":element.customerid,"id":element._id,"invoiceid":element.invoiceid,"reference":element.reference,"customername":nameobj.name,"date":element.date,"duedate":element.duedate,"totalamount":element.totalamount,"status":"approved"});
        });        
      });
    }); 
    this.api.getAllInvoioceOfACustomerDraft(this.whose,this.customerid).subscribe((data:any)=>{
      //console.log(data);    
      data.forEach(element => {
        this.totalmamount=this.totalmamount+Number(element.totalamount);
        this.api.getCustomerNameFromId(element.customerid).subscribe((nameobj:any)=>{
          this.customerinvoices.push({"customerid":element.customerid,"id":element._id,"invoiceid":element.invoiceid,"reference":element.reference,"customername":nameobj.name,"date":element.date,"duedate":element.duedate,"totalamount":element.totalamount,"status":"draft"});
        });        
      });
    }); 
   }

  ngOnInit(): void {
  }
  editordelete(i,status){
    // window.alert(status)
     this.sharedservice.setidforcustomeredit(i,status);
     //this.router.navigate(['\editcustomerinvoice']);
      this.router.navigate(['\intermediatedisplay']);     
   }
   customerclicked(i){   
     this.sharedservice.setSelectedCustomerID(i);
   }
  editInvoice(){   
        this.router.navigate(['\editcustomerinvoice']);  
  }
  enableEditing(){
    this.editing=true;
    this.noediting=false;
  }
  updateCustomer(){
    this.api.updateCustomer(this.customerid,this.userFullName,this.userEmailId,this.userContactNo,this.userAddress).subscribe((data:any)=>{
      window.alert(data.msg);      
      this.isOpen=false;
      this.router.navigate(['\displaycustomerinvoices']); 
    });    
  }
  // deleteInvoice(){  
  //   var id=this.sharedservice.getidforcustomeredit();
  //   if(this.status=="approved"){
  //     this.api.deleteCustomerInvoice(id).subscribe((data:any)=>{
  //       window.alert(data.msg);
  //       this.router.navigate(['/displaycustomerinvoices']);          
  //     });
      
  //   }
  //   else if(this.status=="draft") {
  //     this.api.deleteCustomerInvoiceFromDraft(id).subscribe((data:any)=>{
  //       window.alert(data.msg);
  //       this.router.navigate(['/displaycustomerinvoices']);          
  //     });
  //   }
   
  // }
  setasCustomer(){   
    this.sharedservice.setCustomerOrSupplier("Customer");
  }
  setasSupplier(){   
    this.sharedservice.setCustomerOrSupplier("Supplier");
  }

}
