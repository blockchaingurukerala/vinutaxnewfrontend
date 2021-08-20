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
  selector: 'app-customerinvoiceintermediatedisplay',
  templateUrl: './customerinvoiceintermediatedisplay.component.html',
  styleUrls: ['./customerinvoiceintermediatedisplay.component.css']
})
export class CustomerinvoiceintermediatedisplayComponent implements OnInit {

  status="";
  invoice = new Invoice(); 
  name="";
  i=0;
  totalmamount=0;
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
                text: this.name,
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
  constructor(private api:ApiService,private router:Router,private sharedservice:SharedService) { 
    var id=this.sharedservice.getidforcustomeredit();
    var status=this.sharedservice.getcustomerinvoicestatus();
    this.status=status;
    if(status=="approved"){
      this.api.getCustomerInvoioceFromId(id).subscribe((data)=>{     
        this.api.getCustomerNameFromId(data[0].customerid).subscribe((customername:any)=>{        
         this.name=customername.name;
         this.invoice.date=data[0].date;
         this.invoice.duedate=data[0].duedate;
         this.invoice.invoiceno=data[0].invoiceid;
         this.invoice.referenceno=data[0].reference;
         this.invoice.additionalDetails=data[0].additionaldetails;  
         this.totalmamount=data[0].totalamount;
         for(var i=0;i<data[0].products.length;i++)  {
          this.invoice.products.push(new Product());
           this.invoice.products[i]=data[0].products[i];
         }  
        })
      });
    }
    else if(status=="draft") {
      this.api.getDraftCustomerInvoioceFromId(id).subscribe((data)=>{
        this.api.getCustomerNameFromId(data[0].customerid).subscribe((customername:any)=>{        
          this.name=customername.name;
          this.invoice.date=data[0].date;
          this.invoice.duedate=data[0].duedate;
          this.invoice.invoiceno=data[0].invoiceid;
          this.invoice.referenceno=data[0].reference;
          this.invoice.additionalDetails=data[0].additionaldetails;  
          this.totalmamount=data[0].totalamount;  
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
  editInvoice(){   
        this.router.navigate(['/editcustomerinvoice']);  
  }
  deleteInvoice(){  
    var id=this.sharedservice.getidforcustomeredit();
    if(this.status=="approved"){
      this.api.deleteCustomerInvoice(id).subscribe((data:any)=>{
        window.alert(data.msg);
        this.router.navigate(['/displaycustomerinvoices']);          
      });
      
    }
    else if(this.status=="draft") {
      this.api.deleteCustomerInvoiceFromDraft(id).subscribe((data:any)=>{
        window.alert(data.msg);
        this.router.navigate(['/displaycustomerinvoices']);          
      });
    }
   
  }

}