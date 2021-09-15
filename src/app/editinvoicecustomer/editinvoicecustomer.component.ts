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
  displaycustomerorsupplier="NONE";
  displaycategorynames=[];
  addnewcategoryenable=[];
  categorynames=[];
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
  constructor(private api:ApiService,private router:Router,private sharedservice:SharedService) { 
    var id=this.sharedservice.getidforcustomeredit();
    var status=this.sharedservice.getcustomerinvoicestatus();
    this.status=status;
    this.displaycategorynames[0]=false;
    this.addnewcategoryenable[0]=false;
    if(this.sharedservice.getCustomerOrSupplier()=="Customer"){
      this.displaycustomerorsupplier="Customer"; 
      this.categorynames=[];
      this.api.getCategories().subscribe((data:any)=>{        
        data.forEach(element => {
          this.categorynames.push(element);
        });  
      });
      if(status=="approved"){
        this.aprove=true;
        this.draft=false;
        this.api.getCustomerInvoioceFromId(id).subscribe((data)=>{     
          //this.api.getCustomerNameFromId(data[0].customerid).subscribe((customername:any)=>{        
            this.name=data[0].customername;
           this.invoice.date=data[0].date;
           this.invoice.duedate=data[0].duedate;
           this.invoice.invoiceno=data[0].invoiceid;
           this.invoice.referenceno=data[0].reference;
           this.invoice.additionalDetails=data[0].additionaldetails;    
           for(var i=0;i<data[0].products.length;i++)  {
            this.invoice.products.push(new Product());
             this.invoice.products[i]=data[0].products[i];
           }  
         // })
        });
      }
      else if(status=="draft") {
        this.aprove=false;
        this.draft=true;
        this.api.getDraftCustomerInvoioceFromId(id).subscribe((data)=>{
         // this.api.getCustomerNameFromId(data[0].customerid).subscribe((customername:any)=>{        
              this.name=data[0].customername;
              this.invoice.date=data[0].date;
              this.invoice.duedate=data[0].duedate;
              this.invoice.invoiceno=data[0].invoiceid;
              this.invoice.referenceno=data[0].reference;
              this.invoice.additionalDetails=data[0].additionaldetails;    
              for(var i=0;i<data[0].products.length;i++)  {
                this.invoice.products.push(new Product());
                this.invoice.products[i]=data[0].products[i];
              }  
          //})
        });
      }
    }
     else if(this.sharedservice.getCustomerOrSupplier()=="Supplier"){
      this.displaycustomerorsupplier="Supplier"; 
      this.categorynames=[];
      this.api.getExpenceCategories().subscribe((data:any)=>{        
        data.forEach(element => {
          this.categorynames.push(element);
        });  
      });
      if(status=="approved"){
        this.aprove=true;
        this.draft=false;
        this.api.getSupplierInvoioceFromId(id).subscribe((data)=>{     
          //this.api.getSupplierNameFromId(data[0].customerid).subscribe((customername:any)=>{        
            this.name=data[0].customername;
           this.invoice.date=data[0].date;
           this.invoice.duedate=data[0].duedate;
           this.invoice.invoiceno=data[0].invoiceid;
           this.invoice.referenceno=data[0].reference;
           this.invoice.additionalDetails=data[0].additionaldetails;    
           for(var i=0;i<data[0].products.length;i++)  {
            this.invoice.products.push(new Product());
             this.invoice.products[i]=data[0].products[i];
           }  
         // })
        });
      }
      else if(status=="draft") {
        this.aprove=false;
        this.draft=true;
        this.api.getDraftSupplierInvoioceFromId(id).subscribe((data)=>{
          //this.api.getSupplierNameFromId(data[0].customerid).subscribe((customername:any)=>{        
              this.name=data[0].customername;
              this.invoice.date=data[0].date;
              this.invoice.duedate=data[0].duedate;
              this.invoice.invoiceno=data[0].invoiceid;
              this.invoice.referenceno=data[0].reference;
              this.invoice.additionalDetails=data[0].additionaldetails;    
              for(var i=0;i<data[0].products.length;i++)  {
                this.invoice.products.push(new Product());
                this.invoice.products[i]=data[0].products[i];
              }  
          //})
        });
      }
    }
    else{    
          this.displaycustomerorsupplier="NONE"; 
          this.router.navigate(['/report']); 
          this.categorynames=[];    
    }

    
   }

  ngOnInit(): void {
  }
  onPressKeyboardCategory(searchValue: string,j:number){   
    this.displaycategorynames[j]=true;    
    this.addnewcategoryenable[j]=false;
    var flag=false;
    var i=0;    
    for(i=0;i<this.categorynames.length;i++){      
      if(this.categorynames[i].category.toUpperCase().indexOf(searchValue.toUpperCase())!=-1){
        flag=true;break;
      }
    }
    if(flag==false){       
      this.addnewcategoryenable[j]=true;      
    }   
  }
  selectedProductCategory(c,i:number){
    this.invoice.products[i].category=c;    
    this.displaycategorynames[i]=false;     
  }
  updateInvoice(){
    var whose=localStorage.getItem("uEmail");  
    var id=this.sharedservice.getidforcustomeredit();
    var i: number,sum=0;    
      for(i=0;i<this.invoice.products.length;i++){
        sum+=this.invoice.products[i].price*this.invoice.products[i].qty;
      }   
      if(this.sharedservice.getCustomerOrSupplier()=="Customer"){
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
       else if(this.sharedservice.getCustomerOrSupplier()=="Supplier"){
        if(this.status=="approved"){
          this.api.updteSupplierInvoice(id,this.invoice.date,this.invoice.duedate,this.invoice.invoiceno,this.invoice.referenceno,this.invoice.products,sum,this.invoice.additionalDetails).subscribe((data:any)=>{
            window.alert(data.msg);
            this.router.navigate(['/displaycustomerinvoices']);          
          });
        }
        else  if(this.status=="draft"){  
          this.api.updteSupplierInvoiceDraft(id,this.invoice.date,this.invoice.duedate,this.invoice.invoiceno,this.invoice.referenceno,this.invoice.products,sum,this.invoice.additionalDetails).subscribe((data:any)=>{
            window.alert(data.msg);
            this.router.navigate(['/displaycustomerinvoices']);          
          });
        }  
      }
      else{    
            window.alert("ERROR..Please Try again Later..");
            this.displaycustomerorsupplier="NONE"; 
            this.router.navigate(['/report']);     
      }
  }
  deleteInvoice(){  
    var id=this.sharedservice.getidforcustomeredit();
    if(this.sharedservice.getCustomerOrSupplier()=="Customer"){
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
     else if(this.sharedservice.getCustomerOrSupplier()=="Supplier"){
      if(this.status=="approved"){
        this.api.deleteSupplierInvoice(id).subscribe((data:any)=>{
          window.alert(data.msg);
          this.router.navigate(['/displaycustomerinvoices']);          
        });
      }
      else  if(this.status=="draft"){ 
        this.api.deleteSupplierInvoiceFromDraft(id).subscribe((data:any)=>{
          window.alert(data.msg);
          this.router.navigate(['/displaycustomerinvoices']);          
        }); 
      }  
    }
    else{    
          window.alert("ERROR..Please Try again Later..");
          this.displaycustomerorsupplier="NONE"; 
          this.router.navigate(['/report']);     
    }
    
  }
  aprovedraftinvoice(){
    var id=this.sharedservice.getidforcustomeredit();
    if(this.sharedservice.getCustomerOrSupplier()=="Customer"){
      this.api.aprovedraftinvoice(id).subscribe((data:any)=>{
        window.alert(data.msg);
        this.router.navigate(['/displaycustomerinvoices']); 
      });
    }
     else if(this.sharedservice.getCustomerOrSupplier()=="Supplier"){
      this.api.aprovedraftinvoiceSupplier(id).subscribe((data:any)=>{
        window.alert(data.msg);
        this.router.navigate(['/displaycustomerinvoices']); 
      });
    }
    else{   
          window.alert("ERROR..Please Try again Later.."); 
          this.displaycustomerorsupplier="NONE"; 
          this.router.navigate(['/report']);     
    }
  }
  addNewCategory(i:number){
    if(this.sharedservice.getCustomerOrSupplier()=="Customer"){
      this.api.insertNewCategory(this.invoice.products[i].category).subscribe((data:any)=>{       
        window.alert(data.msg);   
        this.addnewcategoryenable[i]=false;       
       });
    }
    else if(this.sharedservice.getCustomerOrSupplier()=="Supplier"){
      this.api.insertNewExpenceCategory(this.invoice.products[i].category).subscribe((data:any)=>{       
        window.alert(data.msg);   
        this.addnewcategoryenable[i]=false;        
       });
    }
    else{
      window.alert("Error try again later..");
      this.router.navigate(['/report']); 
    }
    
  }
  setasCustomer(){   
    this.sharedservice.setCustomerOrSupplier("Customer");
  }
  setasSupplier(){   
    this.sharedservice.setCustomerOrSupplier("Supplier");
  }
}
