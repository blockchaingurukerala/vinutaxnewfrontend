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
  category:string;
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
  categorytitle="";
  invoice = new Invoice(); 
  names=[];
  categorynamefront=[];
  categorynames=[];
  i=0;
  displaycustomerorsupplier="NONE";
  heading="";
  showreadonly=true;
  show=false;
  addcontactbtn=false;
  selectedcustomerid="";
  btnEnable=false;
  displaynames=false;
  addnewenable=false;
  displaycategorynames=[]
  addnewcategoryenable=[]
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
    this.displaycategorynames.push(false);
    this.addnewcategoryenable.push(false);
  }
  removeProduct(i: number) {
    this.invoice.products.splice(i, 1);
    this.displaycategorynames.splice(i, 1);
    this.addnewcategoryenable.splice(i, 1);
  }
  EnterValidData(){
   window.alert("Enter Valid Data");
  }
  constructor(private api:ApiService,private router:Router,private sharedapi:SharedService) {
    this.addcontactbtn=false;
    this.btnEnable=false;
    this.displaycategorynames[0]=false;
    this.addnewcategoryenable[0]=false;
    if(this.sharedapi.getCustomerOrSupplier()=="Customer"){
      this.heading="Customer Details";
      this.categorynames=[];
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
      this.api.getCategories().subscribe((data:any)=>{        
        data.forEach(element => {
          this.categorynames.push(element);
        });  
      }); 
    }
    else if(this.sharedapi.getCustomerOrSupplier()=="Supplier"){
      this.heading="Supplier Details";
      this.categorynames=[];
      this.displaycustomerorsupplier="New Supplier Invoice";
      var whose=localStorage.getItem("uEmail"); 
      this.showreadonly=false;
      this.show=true;
      this.api.getAllSuppliers(whose).subscribe((data:any)=>{
        data.forEach(element => {
          this.names.push(element);
        });
      });
      this.api.getExpenceCategories().subscribe((data:any)=>{        
        data.forEach(element => {
          this.categorynames.push(element);
        });  
      }); 
    }
    else{
      this.heading="NONE";
      this.categorynames=[];
      this.displaycustomerorsupplier="NONE";
      this.showreadonly=true;
      this.show=false;
      window.alert("Do not Refresh the page");
      this.router.navigate(['/report']);
    }   
   }

  ngOnInit(): void {
  }
  onSearchChange(searchValue: string){
    this.displaynames=true;
    this.addnewenable=false;
    var flag=false;
    var i=0;
    for(i=0;i<this.names.length;i++){
      // console.log(this.names[i].userFullName);
      // console.log(searchValue)
      if(this.names[i].userFullName.toUpperCase().indexOf(searchValue.toUpperCase())!=-1){
        flag=true;break;
      }
    }
    if(flag==false){
      this.invoice.address="";
      this.invoice.contactNo=Number("");
      this.invoice.email="";
      this.addcontactbtn=true;
      this.btnEnable=false;
      this.selectedcustomerid="";
      this.addnewenable=true;
    }
  }
  onPressKeyboardCategory(searchValue: string,j:number){   
    // this.displaycategorynames[j]=true;    
    // this.addnewcategoryenable[j]=false;
    // var flag=false;
    // var i=0;    
    // for(i=0;i<this.categorynames.length;i++){      
    //   if(this.categorynames[i].category.toUpperCase().indexOf(searchValue.toUpperCase())!=-1){
    //     flag=true;break;
    //   }
    // }
    // if(flag==false){       
    //   this.addnewcategoryenable[j]=true;      
    // }   
    this.categorynamefront=[];
    var flag=false;
    this.displaycategorynames[j]=true;    
    this.addnewcategoryenable[j]=false;
    this.api.getCategories().subscribe( (data:any)=>{  
      var len=data.length; 
      var op=0;
      for(var o=0;o<len;o++){  
        this.categorynamefront.push({"titlecategory":data[op].titlecategory,"category":[]});
        for(var q=0;q<data[op].category.length;q++) {
          if(data[op].category[q].toUpperCase().indexOf(searchValue.toUpperCase())!=-1){
            this.categorynamefront[o].category.push(data[op].category[q]);           
            flag=true;           
          }
        }
        if(this.categorynamefront[o].category.length<=0){
            this.categorynamefront.splice(o,1);
              len--;  
              o--;
        }
        op++;
      }   
      if(flag==false){       
          this.addnewcategoryenable[j]=true;      
      } 
    });    
  }
  selectedUser(name){
     let userFullName = name;   
    let customer = this.names.filter(x => x.userFullName.toUpperCase() === userFullName.toUpperCase())[0];
   //console.log(customer);
    if(customer){
      this.invoice.customerName=name;
      this.invoice.address=customer.userAddress;
      this.invoice.contactNo=customer.userContactNo;
      this.invoice.email=customer.userEmailId;
      this.addcontactbtn=false;
      this.selectedcustomerid=customer._id;
      //window.alert(customer._id);
      this.displaynames=false;
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
  selectedProductCategory(c,i:number){
    this.invoice.products[i].category=c;    
    this.displaycategorynames[i]=false;     
  }
  
  approveInvoice(){
    var whose=localStorage.getItem("uEmail");  
    var i: number,sum=0;   
    if(this.sharedapi.getCustomerOrSupplier()=="Customer"){     
        for(i=0;i<this.invoice.products.length;i++){
          this.invoice.products[i].price=-1*this.invoice.products[i].price;
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
          this.invoice.products[i].price=-1*this.invoice.products[i].price;
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
    if(this.invoice.customerName=="")   {
      window.alert("Enter Customer Name");
      return;
    } 
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
  addNewCategory(i:number){
    // if(this.sharedapi.getCustomerOrSupplier()=="Customer"){
    //   // this.api.insertNewCategory(this.invoice.products[i].category).subscribe((data:any)=>{       
    //   //   window.alert(data.msg);   
    //   //   this.addnewcategoryenable[i]=false;       
    //   //  });
    // }
    // else if(this.sharedapi.getCustomerOrSupplier()=="Supplier"){
    //   // this.api.insertNewExpenceCategory(this.invoice.products[i].category).subscribe((data:any)=>{       
    //   //   window.alert(data.msg);   
    //   //   this.addnewcategoryenable[i]=false;        
    //   //  });
    // }
    // else{
    //   window.alert("Error try again later..");
    //   this.router.navigate(['/report']); 
    // }
    if(!this.categorytitle){
      window.alert("Select Category Title");
      return;
    }
    if(!this.invoice.products[i].category){
      window.alert("Category should not be empty");
      return;
    }    
    this.api.insertNewCategory(this.categorytitle,this.invoice.products[i].category).subscribe((data:any)=>{       
      window.alert(data.msg);   
      this.addnewcategoryenable[i]=false;       
     });
    
  }
}
