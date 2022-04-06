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
  showinvoice=true;
  editing=false;
  noediting=true;
   customerid="";
   userFullName ="";
   userEmailId ="";
   userContactNo="";
   userAddress="";
    customerinvoices = []; 
    customerdrftinvoices=[];
    displayincomes=[]
     whose=localStorage.getItem("uEmail"); 
     isOpen:boolean;
     matchactive=[];
     selectedmatchingcategory=[];
     displaycategorynames=[];
     categorynamefront=[];
     addnewcategoryenable=[];
     displaycustomerorsupplier="NONE";
     viewuserdetails="NONE";     
     adjustedoutby=[];
     sum=[];
     adjustedsum=[];
     recievedamount=[];
     outby=[];
     savebtndisabled=[];
     email=localStorage.getItem("uEmail");
     suppliernegativeinvoices=[];
     displaycategorynames1=[];
     public adjustedvalues: any[] = [{description: '',category: '',amount: ''}];
     public negativeadjustedvalues: any[] = [{description: '',category: '',amount: ''}];
  EnterValidData(){
   window.alert("Enter Valid Data");
  }
  constructor(private api:ApiService,private router:Router,private sharedservice:SharedService) { 
    // var id=this.sharedservice.getidforcustomeredit();
    this.selectedmatchingcategory=[];

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
  showInvoices(){
    this.showinvoice=true;
  }
  showAdvancePayment(){    
    this.displayincomes=[];
    this.api.getAllCashAccountsCustomer(this.userFullName,this.whose).subscribe((data:any)=>{
     // console.log(data);
      data.forEach(element => {
        this.displayincomes.push(element);
        this.matchactive.push(false);
        this.displaycategorynames.push(false);
        this.addnewcategoryenable.push(false);
        this.selectedmatchingcategory.push("");       
              
      });
    })
    this.showinvoice=false;
  }
  // matchSelected(i){
  //   var p=0;
  //   for(p=0;p<this.matchactive.length;p++){
  //     if(p!=i){
  //       this.matchactive[p]=false;
  //     }
  //   }
  //   this.matchactive[i]=true;

  // }


  matchSelected(i){   
   
    var p=0;
    for(p=0;p<this.matchactive.length;p++){
      if(p!=i){
        this.matchactive[p]=false;
      }
    }
   if(this.displayincomes[i].amount<0){
     //customer invoice and Supplier negative inoice;
     this.matchactive[i]=true;
     this.outby[i]=this.displayincomes[i].amount;
     this.customerinvoices=[];
      this.suppliernegativeinvoices=[];
     this.api.getAllCustomerInvoioceUnallocated(this.email).subscribe((data:any)=>{

       console.log(data)      
      data.forEach(element => {
        var balanceamount=element.autototalamount+element.allocatedAmount;
       // window.alert(element.autototalamount+","+element.allocatedAmount)
        if(element.customerid==""){
          this.customerinvoices.push({"customerid":element.customerid,"id":element._id,"invoiceid":element.invoiceid,"reference":element.reference,"customername":element.customername,"date":element.date,"duedate":element.duedate,"totalamount":element.totalamount,"allocatedAmount":0,"status":"approved","link":false,"checked":false,"balanceamount":balanceamount,"balanceamount1":balanceamount});
        }
        else{
          this.customerinvoices.push({"customerid":element.customerid,"id":element._id,"invoiceid":element.invoiceid,"reference":element.reference,"customername":element.customername,"date":element.date,"duedate":element.duedate,"totalamount":element.totalamount,"allocatedAmount":0,"status":"approved","link":true,"checked":false,"balanceamount":balanceamount,"balanceamount1":balanceamount});         
        }        
      });
    }); 
    this.api.getAllSupplierNegativeInvoioceUnallocated(this.email).subscribe((data:any)=>{        
      data.forEach(element => {
       var balanceamount=element.autototalamount-element.allocatedAmount;
        if(element.customerid==""){
          this.suppliernegativeinvoices.push({"customerid":element.customerid,"id":element._id,"invoiceid":element.invoiceid,"reference":element.reference,"customername":element.customername,"date":element.date,"duedate":element.duedate,"totalamount":element.totalamount,"allocatedAmount":0,"status":"approved","link":false,"checked":false,"balanceamount":balanceamount,"balanceamount1":balanceamount});           
        }
        else{
          this.suppliernegativeinvoices.push({"customerid":element.customerid,"id":element._id,"invoiceid":element.invoiceid,"reference":element.reference,"customername":element.customername,"date":element.date,"duedate":element.duedate,"totalamount":element.totalamount,"allocatedAmount":0,"status":"approved","link":true,"checked":false,"balanceamount":balanceamount,"balanceamount1":balanceamount});         
        }        
      });
    }); 
   }

   else if(this.displayincomes[i].amount>=0){
     //Supplier invoice and Customer negative invoice
     this.matchactive[i]=true;
     this.customerinvoices=[];
      this.suppliernegativeinvoices=[];

      this.outby[i]=this.displayincomes[i].amount;
     this.api.getAllSupplierInvoioceUnallocated(this.email).subscribe((data:any)=>{        
      data.forEach(element => {
       var balanceamount=element.autototalamount-element.allocatedAmount;
        if(element.customerid==""){
          this.customerinvoices.push({"customerid":element.customerid,"id":element._id,"invoiceid":element.invoiceid,"reference":element.reference,"customername":element.customername,"date":element.date,"duedate":element.duedate,"totalamount":element.totalamount,"allocatedAmount":0,"status":"approved","link":false,"checked":false,"balanceamount":balanceamount,"balanceamount1":-1*balanceamount});
        }
        else{
          this.customerinvoices.push({"customerid":element.customerid,"id":element._id,"invoiceid":element.invoiceid,"reference":element.reference,"customername":element.customername,"date":element.date,"duedate":element.duedate,"totalamount":element.totalamount,"allocatedAmount":0,"status":"approved","link":true,"checked":false,"balanceamount":balanceamount,"balanceamount1":-1*balanceamount});         
        }        
      });        
    }); 
    this.api.getAllCustomerNegativeInvoioceUnallocated(this.email).subscribe((data:any)=>{        
      data.forEach(element => {
       var balanceamount=element.autototalamount-element.allocatedAmount;
        if(element.customerid==""){
          this.suppliernegativeinvoices.push({"customerid":element.customerid,"id":element._id,"invoiceid":element.invoiceid,"reference":element.reference,"customername":element.customername,"date":element.date,"duedate":element.duedate,"totalamount":element.totalamount,"allocatedAmount":0,"status":"approved","link":false,"checked":false,"balanceamount":balanceamount,"balanceamount1":-1*balanceamount});
        }
        else{
          this.suppliernegativeinvoices.push({"customerid":element.customerid,"id":element._id,"invoiceid":element.invoiceid,"reference":element.reference,"customername":element.customername,"date":element.date,"duedate":element.duedate,"totalamount":element.totalamount,"allocatedAmount":0,"status":"approved","link":true,"checked":false,"balanceamount":balanceamount,"balanceamount1":-1*balanceamount});         
        }        
      });
    }); 
   }
   else{
     window.alert("Enter Amount");
   }
  }


  createSelected(i){      
    this.matchactive[i]=false;
   }
  onPressKeyboardCategory(searchValue: string,j:number){     
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
          if((data[op].category[q].whose=="All")||(data[op].category[q].whose==this.whose)){
            if(data[op].category[q].category.toUpperCase().indexOf(searchValue.toUpperCase())!=-1){
              this.categorynamefront[o].category.push(data[op].category[q].category);           
              flag=true;           
            }
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

  savePayment(i:number){
    if(this.selectedmatchingcategory[i].length==0){
      window.alert("Select category")
      return;
    }
     
      this.api.updateCashAccount(this.displayincomes[i]._id,this.selectedmatchingcategory[i]).subscribe((data:any)=>{
        window.alert(data.msg)
      })
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
  addNewLine(){
    this.adjustedvalues.push( {description: '',category: '',amount: ''});
    this.negativeadjustedvalues.push( {description: '',category: '',amount: ''});    
  }
  removeNewLine(i: number) {
    this.displaycategorynames1[i]=false; 
   this.adjustedvalues.splice(i, 1);
   this.negativeadjustedvalues.splice(i, 1);
 }
  setasCustomer(){   
    this.sharedservice.setCustomerOrSupplier("Customer");
  }
  setasSupplier(){   
    this.sharedservice.setCustomerOrSupplier("Supplier");
  }
  selectedProductCategory(c,i:number){
    //this.invoice.products[i].category=c;  
    this.selectedmatchingcategory[i]=c; 
    this.displaycategorynames[i]=false; 
  }
}
