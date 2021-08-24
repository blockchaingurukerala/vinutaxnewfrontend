import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ApiService } from '../api.service';
import {Router} from '@angular/router';
import {SharedService} from '../shared.service'
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Product{
  name: string;
  price: number;
  qty: number;
}
class Invoice{
  customerName: string;
  address: string;
  contactNo: number;
  email: string;
  date:string;
  duedate:string;
  invoiceno:string;
  referenceno:string;
  products: Product[] = [];
  additionalDetails: string;  
  constructor(){
    // Initially one empty product row we will show 
   
  }
}

@Component({
  selector: 'app-editinvoicecustomer',
  templateUrl: './editinvoicecustomer.component.html',
  styleUrls: ['./editinvoicecustomer.component.css']
})
export class EditinvoicecustomerComponent implements OnInit {

  invoice = new Invoice(); 
  name="";
  i=0;
  status="";
  aprove=true;
  draft=false;
  addProduct(){
    this.invoice.products.push(new Product());
  }
  EnterValidData(){
   window.alert("Enter Valid Data");
  }
  constructor(private api:ApiService,private router:Router,private sharedservice:SharedService) { 
    var id=this.sharedservice.getidforcustomeredit();
    var status=this.sharedservice.getcustomerinvoicestatus();
    this.status=status;
    if(status=="approved"){
      this.aprove=true;
      this.draft=false;
      this.api.getCustomerInvoioceFromId(id).subscribe((data)=>{     
        this.api.getCustomerNameFromId(data[0].customerid).subscribe((customername:any)=>{        
         this.name=customername.name;
         this.invoice.date=data[0].date;
         this.invoice.duedate=data[0].duedate;
         this.invoice.invoiceno=data[0].invoiceid;
         this.invoice.referenceno=data[0].reference;
         this.invoice.additionalDetails=data[0].additionaldetails;    
         for(var i=0;i<data[0].products.length;i++)  {
          this.invoice.products.push(new Product());
           this.invoice.products[i]=data[0].products[i];
         }  
        })
      });
    }
    else if(status=="draft") {
      this.aprove=false;
      this.draft=true;
      this.api.getDraftCustomerInvoioceFromId(id).subscribe((data)=>{
        this.api.getCustomerNameFromId(data[0].customerid).subscribe((customername:any)=>{        
            this.name=customername.name;
            this.invoice.date=data[0].date;
            this.invoice.duedate=data[0].duedate;
            this.invoice.invoiceno=data[0].invoiceid;
            this.invoice.referenceno=data[0].reference;
            this.invoice.additionalDetails=data[0].additionaldetails;    
            for(var i=0;i<data[0].products.length;i++)  {
              this.invoice.products.push(new Product());
              this.invoice.products[i]=data[0].products[i];
            }  
        })
      });
    }
   }

  ngOnInit(): void {
  }
  // onCustomerSelection(e){
  //   let userFullName = e.target.value;
  //   let customer = this.names.filter(x => x.userFullName === userFullName)[0];
  //   console.log(customer);
  //   if(customer){
  //     this.invoice.address=customer.userAddress;
  //     this.invoice.contactNo=customer.userContactNo;
  //     this.invoice.email=customer.userEmailId;
  //   }
  //   else{
  //     this.invoice.address="";
  //     this.invoice.contactNo=Number("");
  //     this.invoice.email="";
  //   }
  // }
  updateInvoice(){
    var whose=localStorage.getItem("uEmail");  
    var id=this.sharedservice.getidforcustomeredit();
    var i: number,sum=0;    
      for(i=0;i<this.invoice.products.length;i++){
        sum+=this.invoice.products[i].price*this.invoice.products[i].qty;
      }   
      if(this.status=="approved"){
        this.api.updteCustomerInvoice(id,this.invoice.date,this.invoice.duedate,this.invoice.invoiceno,this.invoice.referenceno,this.invoice.products,sum,this.invoice.additionalDetails).subscribe((data:any)=>{
          window.alert(data.msg);
          this.router.navigate(['/displaycustomerinvoices']);          
        });
      }
      else  if(this.status=="draft"){  
        this.api.updteCustomerInvoiceDraft(id,this.invoice.date,this.invoice.duedate,this.invoice.invoiceno,this.invoice.referenceno,this.invoice.products,sum,this.invoice.additionalDetails).subscribe((data:any)=>{
          window.alert(data.msg);
          this.router.navigate(['/displaycustomerinvoices']);          
        });
      }     
    
      
       
  }
  deleteInvoice(){  
    var id=this.sharedservice.getidforcustomeredit();
    if(this.status=="approved"){
      this.api.deleteCustomerInvoice(id).subscribe((data:any)=>{
        window.alert(data.msg);
        this.router.navigate(['/displaycustomerinvoices']);          
      });
    }
    else  if(this.status=="draft"){ 
      this.api.deleteCustomerInvoiceFromDraft(id).subscribe((data:any)=>{
        window.alert(data.msg);
        this.router.navigate(['/displaycustomerinvoices']);          
      }); 
    }   
  }
  aprovedraftinvoice(){
    var id=this.sharedservice.getidforcustomeredit();
    this.api.aprovedraftinvoice(id).subscribe((data:any)=>{
      window.alert(data.msg);
      this.router.navigate(['/displaycustomerinvoices']); 
    });
   
  }
  setasCustomer(){   
    this.sharedservice.setCustomerOrSupplier("Customer");
  }
  setasSupplier(){   
    this.sharedservice.setCustomerOrSupplier("Supplier");
  }
}
