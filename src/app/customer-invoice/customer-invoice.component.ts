import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ApiService } from '../api.service';
import {Router} from '@angular/router';
import { SharedService } from '../shared.service';
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
    this.products.push(new Product());
  }
}

@Component({
  selector: 'app-customer-invoice',
  templateUrl: './customer-invoice.component.html',
  styleUrls: ['./customer-invoice.component.css']
})
export class CustomerInvoiceComponent implements OnInit {
  invoice = new Invoice(); 
  names=[];
  i=0;
  displaycustomerorsupplier="NONE";
  heading="";
  showreadonly=true;
  show=false;
  addcontactbtn=false;
  selectedcustomerid="";
  btnEnable=false;
  generatePDF(action = 'open') {
    let docDefinition = {
      content: [
        {
          text: 'ELECTRONIC SHOP',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.invoice.customerName,
                bold:true
              },
              { text: this.invoice.address },
              { text: this.invoice.email },
              { text: this.invoice.contactNo }
            ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              { 
                text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Order Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Product', 'Price', 'Quantity', 'Amount'],
              ...this.invoice.products.map(p => ([p.name, p.price, p.qty, (p.price*p.qty).toFixed(2)])),
              [{text: 'Total Amount', colSpan: 3}, {}, {}, this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price), 0).toFixed(2)]
            ]
          }
        },
        {
          text: 'Additional Details',
          style: 'sectionHeader'
        },
        {
            text: this.invoice.additionalDetails,
            margin: [0, 0 ,0, 15]          
        },
        {
          columns: [
            [{ qr: `${this.invoice.customerName}`, fit: '50' }],
            [{ text: 'Signature', alignment: 'right', italics: true}],
          ]
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
            ul: [
              'Order can be return in max 10 days.',
              'Warrenty of the product will be subject to the manufacturer terms and conditions.',
              'This is system generated invoice.',
            ],
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]          
        }
      }
    };

    if(action==='download'){
      pdfMake.createPdf(docDefinition).download();
    }else if(action === 'print'){
      pdfMake.createPdf(docDefinition).print();      
    }else{
      pdfMake.createPdf(docDefinition).open();      
    }

  }

  addProduct(){
    this.invoice.products.push(new Product());
  }
  EnterValidData(){
   window.alert("Enter Valid Data");
  }
  constructor(private api:ApiService,private router:Router,private sharedapi:SharedService) {
    this.addcontactbtn=false;
    this.btnEnable=false;
    if(this.sharedapi.getCustomerOrSupplier()=="Customer"){
      this.heading="Customer Details";
      this.displaycustomerorsupplier="New Customer Invoice";
      this.showreadonly=true;
      this.show=false;
      var today = new Date().toISOString().split('T')[0];
      var duedate=new Date()
      //window.alert(today);
      this.invoice.date=today;
      duedate.setDate(duedate.getDate() + 7);
      this.invoice.duedate=new Date(duedate).toISOString().split('T')[0];
      //let latest_date =this.datepipe.transform(today, 'yyyy-MM-dd');
      var whose=localStorage.getItem("uEmail"); 
      this.api.createNextCustomerInvoiceNumber(whose).subscribe((data:any)=>{
        this.invoice.invoiceno=data.msg;
      });
      this.api.getAllCustomers(whose).subscribe((data:any)=>{
        data.forEach(element => {
          this.names.push(element);
        });
      });
    }
    else if(this.sharedapi.getCustomerOrSupplier()=="Supplier"){
      this.heading="Supplier Details";
      this.displaycustomerorsupplier="New Supplier Invoice";
      var whose=localStorage.getItem("uEmail"); 
      this.showreadonly=false;
      this.show=true;
      this.api.getAllSuppliers(whose).subscribe((data:any)=>{
        data.forEach(element => {
          this.names.push(element);
        });
      });
    }
    else{
      this.heading="NONE";
      this.displaycustomerorsupplier="NONE";
      this.showreadonly=true;
      this.show=false;
      window.alert("Do not Refresh the page");
      this.router.navigate(['/report']);
    }   
   }

  ngOnInit(): void {
  }
  onCustomerSelection(e){
    let userFullName = e.target.value;
   
    let customer = this.names.filter(x => x.userFullName === userFullName)[0];
   //console.log(customer);
    if(customer){
      this.invoice.address=customer.userAddress;
      this.invoice.contactNo=customer.userContactNo;
      this.invoice.email=customer.userEmailId;
      this.addcontactbtn=false;
      this.selectedcustomerid=customer._id;
      //window.alert(customer._id);
    }
    else{
      window.alert("New Contact Found. You can add This Contact..");
      this.invoice.address="";
      this.invoice.contactNo=Number("");
      this.invoice.email="";
      this.addcontactbtn=true;
      this.btnEnable=false;
      this.selectedcustomerid="";
    }  
  }
  approveInvoice(){
    var whose=localStorage.getItem("uEmail");  
    var i: number,sum=0;   
    if(this.sharedapi.getCustomerOrSupplier()=="Customer"){     
        for(i=0;i<this.invoice.products.length;i++){
          sum+=this.invoice.products[i].price*this.invoice.products[i].qty;
        } 
        this.api.addCustomerInvoice(this.invoice.date,this.invoice.duedate,this.invoice.invoiceno,this.invoice.referenceno,this.invoice.products,sum,this.invoice.additionalDetails,whose,this.selectedcustomerid,this.invoice.customerName).subscribe((data:any)=>{
          window.alert(data.msg);
          this.router.navigate(['/report']);          
        });
    }
    else if(this.sharedapi.getCustomerOrSupplier()=="Supplier"){
        for(i=0;i<this.invoice.products.length;i++){
          sum+=this.invoice.products[i].price*this.invoice.products[i].qty;
        }  
        this.api.addSupplierInvoice(this.invoice.date,this.invoice.duedate,this.invoice.invoiceno,this.invoice.referenceno,this.invoice.products,sum,this.invoice.additionalDetails,whose,this.selectedcustomerid,this.invoice.customerName).subscribe((data:any)=>{
          window.alert(data.msg);
          this.router.navigate(['/report']);          
        });
    }
    else{
      window.alert("Do not Refresh the page");
      this.router.navigate(['/report']);
    }
  }
  saveInvoiceonDraft(){
    var whose=localStorage.getItem("uEmail");  
    var i: number,sum=0;
    if(this.sharedapi.getCustomerOrSupplier()=="Customer"){
        for(i=0;i<this.invoice.products.length;i++){
          sum+=this.invoice.products[i].price*this.invoice.products[i].qty;
        }  
        this.api.addCustomerInvoiceDraft(this.invoice.date,this.invoice.duedate,this.invoice.invoiceno,this.invoice.referenceno,this.invoice.products,sum,this.invoice.additionalDetails,whose,this.selectedcustomerid,this.invoice.customerName).subscribe((data:any)=>{
          window.alert(data.msg);
          this.router.navigate(['/report']);          
        });
    }
    else if(this.sharedapi.getCustomerOrSupplier()=="Supplier"){
       for(i=0;i<this.invoice.products.length;i++){
          sum+=this.invoice.products[i].price*this.invoice.products[i].qty;
        }  
        this.api.addSupplierInvoiceDraft(this.invoice.date,this.invoice.duedate,this.invoice.invoiceno,this.invoice.referenceno,this.invoice.products,sum,this.invoice.additionalDetails,whose,this.selectedcustomerid,this.invoice.customerName).subscribe((data:any)=>{
          window.alert(data.msg);
          this.router.navigate(['/report']);          
        });
    }
    else{
      window.alert("Do not Refresh the page");
      this.router.navigate(['/report']);
    }   
  }
  setasCustomer(){   
    this.sharedapi.setCustomerOrSupplier("Customer");
    this.heading="Customer Details";
    var today = new Date().toISOString().split('T')[0];
    var duedate=new Date()
    //window.alert(today);
    this.invoice.date=today;
    duedate.setDate(duedate.getDate() + 7);
    this.invoice.duedate=new Date(duedate).toISOString().split('T')[0];
    //let latest_date =this.datepipe.transform(today, 'yyyy-MM-dd');
    var whose=localStorage.getItem("uEmail"); 
    this.names=[];
    this.api.createNextCustomerInvoiceNumber(whose).subscribe((data:any)=>{
      this.invoice.invoiceno=data.msg;
    });
    this.api.getAllCustomers(whose).subscribe((data:any)=>{
      data.forEach(element => {
        this.names.push(element);
      });
    });
  }
  setasSupplier(){   
    this.sharedapi.setCustomerOrSupplier("Supplier");
    this.names=[];
    this.heading="Supplier Details";
      var whose=localStorage.getItem("uEmail"); 
      this.api.getAllSuppliers(whose).subscribe((data:any)=>{
        data.forEach(element => {
          this.names.push(element);
        });
      });
  }
  addContact(){
    var whose=localStorage.getItem("uEmail");  
    window.alert("clicked");
    if(this.sharedapi.getCustomerOrSupplier()=="Customer"){
      this.api.addCustomerDetils(this.invoice.customerName,this.invoice.email,this.invoice.contactNo.toString(),this.invoice.address,whose).subscribe((data:any)=>{
        if(data.msg!="Database Error"){
          window.alert("Contact Added Successfully..");
          this.selectedcustomerid=data.msg;
          this.btnEnable=true;
        }
        else{
          window.alert("Error try again later..");
          this.router.navigate(['/report']); 
        }
      });
   }
   else if(this.sharedapi.getCustomerOrSupplier()=="Supplier"){
    this.api.addSupplierDetils(this.invoice.customerName,this.invoice.email,this.invoice.contactNo.toString(),this.invoice.address,whose).subscribe((data:any)=>{
      if(data.msg!="Database Error"){
        window.alert("Contact Added Successfully..");
        this.selectedcustomerid=data.msg;
        this.btnEnable=true;
      }
      else{
        window.alert("Error try again later..");
        this.router.navigate(['/report']); 
      }
    });
  }
  else{
    window.alert("Error try again later..");
    this.router.navigate(['/report']); 
  }
  }
}
