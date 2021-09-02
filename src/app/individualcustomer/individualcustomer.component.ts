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

     displaycustomerorsupplier="NONE";
     viewuserdetails="NONE"
  EnterValidData(){
   window.alert("Enter Valid Data");
  }
  constructor(private api:ApiService,private router:Router,private sharedservice:SharedService) { 
    // var id=this.sharedservice.getidforcustomeredit();
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
    this.customerid=this.sharedservice.getSelectedCustomer();
   this.editing=false;
   this.noediting=true;
   if(this.sharedservice.getCustomerOrSupplier()=="Customer"){
    this.displaycustomerorsupplier="Customer"; 
    this.viewuserdetails="View Customer Details";
    this.api.getCustomerDetails(this.customerid).subscribe((data:any)=>{      
      this.userFullName=data[0].userFullName;
      this.userEmailId=data[0].userEmailId;
      this.userContactNo=data[0].userContactNo;
      this.userAddress=data[0].userAddress;      
    });  
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
   else if(this.sharedservice.getCustomerOrSupplier()=="Supplier"){
    this.displaycustomerorsupplier="Supplier"; 
    this.viewuserdetails="View Supplier Details";
    this.api.getSupplierDetails(this.customerid).subscribe((data:any)=>{      
      this.userFullName=data[0].userFullName;
      this.userEmailId=data[0].userEmailId;
      this.userContactNo=data[0].userContactNo;
      this.userAddress=data[0].userAddress;      
    });  
    this.api.getAllInvoioceOfASupplier(this.whose,this.customerid).subscribe((data:any)=>{
      //console.log(data);    
      data.forEach(element => {
        this.api.getSupplierNameFromId(element.customerid).subscribe((nameobj:any)=>{
          this.totalmamount=this.totalmamount+Number(element.totalamount);
          this.customerinvoices.push({"customerid":element.customerid,"id":element._id,"invoiceid":element.invoiceid,"reference":element.reference,"customername":nameobj.name,"date":element.date,"duedate":element.duedate,"totalamount":element.totalamount,"status":"approved"});
        });        
      });
    }); 
    this.api.getAllInvoioceOfASupplierDraft(this.whose,this.customerid).subscribe((data:any)=>{
      //console.log(data);    
      data.forEach(element => {
        this.totalmamount=this.totalmamount+Number(element.totalamount);
        this.api.getSupplierNameFromId(element.customerid).subscribe((nameobj:any)=>{
          this.customerinvoices.push({"customerid":element.customerid,"id":element._id,"invoiceid":element.invoiceid,"reference":element.reference,"customername":nameobj.name,"date":element.date,"duedate":element.duedate,"totalamount":element.totalamount,"status":"draft"});
        });        
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
  deleteCustomer(){
    if(this.sharedservice.getCustomerOrSupplier()=="Customer"){
      this.api.deleteCustomer(this.customerid).subscribe((data:any)=>{
        window.alert(data.msg);      
        this.isOpen=false;
        this.router.navigate(['\displaycustomerinvoices']); 
      }); 
    }
     else if(this.sharedservice.getCustomerOrSupplier()=="Supplier"){
      this.api.deleteSupplier(this.customerid).subscribe((data:any)=>{
        window.alert(data.msg);      
        this.isOpen=false;
        this.router.navigate(['\displaycustomerinvoices']); 
      }); 
    }
    else{    
          this.displaycustomerorsupplier="NONE"; 
          this.router.navigate(['/report']);     
    }
  }
  updateCustomer(){
    if(this.sharedservice.getCustomerOrSupplier()=="Customer"){
      this.api.updateCustomer(this.customerid,this.userFullName,this.userEmailId,this.userContactNo,this.userAddress).subscribe((data:any)=>{
        window.alert(data.msg);      
        this.isOpen=false;
        this.router.navigate(['\displaycustomerinvoices']); 
      }); 
    }
     else if(this.sharedservice.getCustomerOrSupplier()=="Supplier"){
      this.api.updateSupplier(this.customerid,this.userFullName,this.userEmailId,this.userContactNo,this.userAddress).subscribe((data:any)=>{
        window.alert(data.msg);      
        this.isOpen=false;
        this.router.navigate(['\displaycustomerinvoices']); 
      }); 
    }
    else{    
          this.displaycustomerorsupplier="NONE"; 
          this.router.navigate(['/report']);     
    }
      
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
