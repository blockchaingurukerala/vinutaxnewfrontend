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
     addnewcategoryenable1=[];
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
   this.savebtndisabled[0]=true;
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
   checkValuePositive(k,i){   
    //window.alert("clicked chkpositive"+this.customerinvoices[k].balanceamount)
    
     var recievedamount=0;
     var totalallocated=0;
     if(this.displayincomes[i].amount<0){
      recievedamount=-1*this.displayincomes[i].amount;
     }
     else if(this.displayincomes[i].amount>=0){
      recievedamount=this.displayincomes[i].amount;
     }
       if(this.customerinvoices[k].checked){         
        if(this.outby[i]<0){         
          this.customerinvoices[k].checked=true;  
          return;
        }
        else if(this.customerinvoices[k].balanceamount1<=this.outby[i]){         
          this.customerinvoices[k].allocatedAmount=this.customerinvoices[k].balanceamount1;  
            this.sum[i]=this.sum[i]+this.customerinvoices[k].allocatedAmount;     
        }   
        else{
          this.customerinvoices[k].allocatedAmount=this.outby[i];   
          this.sum[i]=this.sum[i]+this.customerinvoices[k].allocatedAmount;      
        }  
        this.outby[i]=this.outby[i]-this.customerinvoices[k].balanceamount1; 
      }
      else{
        this.sum[i]=this.sum[i]-this.customerinvoices[k].allocatedAmount;
        this.customerinvoices[k].allocatedAmount=0;
        this.outby[i]=this.outby[i]+this.customerinvoices[k].balanceamount1;
      }   
    if(this.outby[i]<=0){
      for(var z=0;z<this.customerinvoices.length;z++){
        totalallocated=totalallocated+this.customerinvoices[z].allocatedAmount;
        
        if((this.customerinvoices[z].allocatedAmount<=0)){        
          this.customerinvoices[z].checked=true;
        }
        if(z==k){
          this.customerinvoices[z].checked=false;
        }
      }    
      for(var z=0;z<this.suppliernegativeinvoices.length;z++){   
        totalallocated=totalallocated+this.suppliernegativeinvoices[z].allocatedAmount; 
      
        if((this.suppliernegativeinvoices[z].allocatedAmount<=0)){        
          this.suppliernegativeinvoices[z].checked=true;
        }        
      }  
           
      if(totalallocated==recievedamount){
        this.savebtndisabled[i]=false;
      }
      else{
        this.savebtndisabled[i]=true;
      }
      
    }
    else{
      for(var z=0;z<this.customerinvoices.length;z++){       
          this.customerinvoices[z].checked=false;      
      } 
      for(var z=0;z<this.suppliernegativeinvoices.length;z++){
        this.suppliernegativeinvoices[z].checked=false;
      }
      this.savebtndisabled[i]=true;
    }
    //enable SAVE button
    if((this.sum[i]+this.adjustedsum[i])==this.recievedamount[i]){
      this.savebtndisabled[i]=false;
    }
    else{
      this.savebtndisabled[i]=true;
    }
   }

   checkValueNegative(k,i){   
    //window.alert("clicked chknegative"+this.suppliernegativeinvoices[k].balanceamount1)
      var recievedamount=0;
      var totalallocated=0;

      if(this.displayincomes[i].amount>=0){
        recievedamount=this.displayincomes[i].amount;
       }
       else if(this.displayincomes[i].amount<0){
        recievedamount=this.displayincomes[i].amount;
       }

       if(this.suppliernegativeinvoices[k].checked){ 
        if(this.outby[i]<0){         
          this.suppliernegativeinvoices[k].checked=true;   
          return         
        }
        else if(this.suppliernegativeinvoices[k].balanceamount1<=this.outby[i]){
          this.suppliernegativeinvoices[k].allocatedAmount=this.suppliernegativeinvoices[k].balanceamount1; 
          this.sum[i]=this.sum[i]+this.suppliernegativeinvoices[k].allocatedAmount;           
        }   
        else{
          this.suppliernegativeinvoices[k].allocatedAmount=this.outby[i];
          this.sum[i]=this.sum[i]+this.suppliernegativeinvoices[k].allocatedAmount;  
        }  
        this.outby[i]=this.outby[i]-this.suppliernegativeinvoices[k].balanceamount1;                
      }
      else{
        this.sum[i]=this.sum[i]-this.suppliernegativeinvoices[k].allocatedAmount;  
        this.suppliernegativeinvoices[k].allocatedAmount=0;
        this.outby[i]=this.outby[i]+this.suppliernegativeinvoices[k].balanceamount1;
      }
      if(this.outby[i]<=0){
        for(var z=0;z<this.suppliernegativeinvoices.length;z++){
          totalallocated=totalallocated+this.suppliernegativeinvoices[z].allocatedAmount;
          if((this.suppliernegativeinvoices[z].allocatedAmount<=0)){        
            this.suppliernegativeinvoices[z].checked=true;
          }
          if(z==k){
            this.suppliernegativeinvoices[z].checked=false;
          }
        }    
        for(var z=0;z<this.customerinvoices.length;z++){   
          totalallocated=totalallocated+this.customerinvoices[z].allocatedAmount;     
          if((this.customerinvoices[z].allocatedAmount<=0)){        
            this.customerinvoices[z].checked=true;
          }        
        }   
        if(totalallocated==recievedamount){
          this.savebtndisabled[i]=false;
        }
        else{
          this.savebtndisabled[i]=true;
        }
      }
    else{
          for(var z=0;z<this.customerinvoices.length;z++){       
            this.customerinvoices[z].checked=false;  
          } 
        for(var z=0;z<this.suppliernegativeinvoices.length;z++){
          this.suppliernegativeinvoices[z].checked=false;
        }
        this.savebtndisabled[i]=true;
    }   
      //enable SAVE button
      if((this.sum[i]+this.adjustedsum[i])==this.recievedamount[i]){
        this.savebtndisabled[i]=false;
      }
      else{
        this.savebtndisabled[i]=true;
      }
   }

   onPressKeyboardCategory1(searchValue: string,j:number){     
    this.categorynamefront=[];
    var flag=false;
    this.displaycategorynames1[j]=true;    
    this.addnewcategoryenable1[j]=false;
    this.api.getCategories().subscribe( (data:any)=>{  
      var len=data.length; 
      var op=0;
      for(var o=0;o<len;o++){  
        this.categorynamefront.push({"titlecategory":data[op].titlecategory,"category":[]});
        for(var q=0;q<data[op].category.length;q++) {
          if((data[op].category[q].whose=="All")||(data[op].category[q].whose==this.email)){
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
          this.addnewcategoryenable1[j]=true;      
      } 
    });    
  }

   onPressKeyboardAdjustedValue(amt:string,j:number,i:number){
    //   console.log(this.adjustedvalues);
    // console.log(this.negativeadjustedvalues);
  
        var sum=0;
        //this.outby[i]=this.adjustedoutby[i];
        for(var k=0;k<this.adjustedvalues.length;k++){
          if(this.adjustedvalues[k].amount)
             sum=sum+Number(this.adjustedvalues[k].amount)
        }
        //this.outby[i]=this.outby[i]-sum;
        this.adjustedsum[i]=sum;
        //enable SAVE button
          if((this.sum[i]+this.adjustedsum[i])==this.recievedamount[i]){
            this.savebtndisabled[i]=false;
          }
          else{
            this.savebtndisabled[i]=true;
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
        var a=0; 
        
       
        if(element.amount<0)  {
          a=-1*element.amount;
        }

        

        this.outby.push(a);
        
        this.recievedamount.push(a)
        this.sum.push(0);
        this.adjustedsum.push(0)
        this.adjustedoutby.push(a);
        this.savebtndisabled.push(true);

        //this.outby[j]=parseFloat(paidOut);
        //this.recievedamount[j]=Number(paidOut);
        //this.adjustedoutby[j]=this.outby[j];
              
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
     //this.outby[i]=this.displayincomes[i].amount;
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

      //this.outby[i]=this.displayincomes[i].amount;
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
    selectedProductCategory1(c,i:number){    
      this.adjustedvalues[i].category=c;    
      this.displaycategorynames1[i]=false; 
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
  async allocateAmount(date222,desc,i){    
    var whose=localStorage.getItem("uEmail"); 
     var amount=0;
    var checkpaidin=0;//checking  paidin or paidout
    if(this.displayincomes[i].amount<0){ 
     checkpaidin=1;
      amount=-1*this.displayincomes[i].amount;
      for(var j=0;j<this.customerinvoices.length;j++) {
         await new Promise<void> (resolve1 => {
           if(this.customerinvoices[j].allocatedAmount>0){              
           // window.alert("allocating"+element.allocatedAmount)  ;       
             this.api.allocateToCustomerInvoice(whose,this.customerinvoices[j].id,date222,this.customerinvoices[j].totalamount,-1*this.customerinvoices[j].allocatedAmount).subscribe((data:any)=>{
               // console.log(data)               
               resolve1();
             });       
           }
           else{
             resolve1();
           }
         });
      } 
      for(var k=0;k<this.suppliernegativeinvoices.length;k++) {
       await new Promise<void> (resolve1 => {
         if(this.suppliernegativeinvoices[k].allocatedAmount>0){            
         // window.alert("allocating"+element.allocatedAmount)  ;       
           this.api.allocateToSupplierInvoice(whose,this.suppliernegativeinvoices[k].id,date222,-1*this.suppliernegativeinvoices[k].totalamount,-1*this.suppliernegativeinvoices[k].allocatedAmount).subscribe((data:any)=>{
             // console.log(data)             
             resolve1();
           });       
         }
         else{
           resolve1();
         }
       });
      }             
     //  this.suppliernegativeinvoices.forEach(element => {       
     //  if(element.allocatedAmount>0){          
     //    this.api.allocateToSupplierInvoice(whose,element.id,date,-1*element.totalamount,-1*element.allocatedAmount).subscribe((data:any)=>{
     //       // console.log(data)
     //    });       
     //  }
     // });
    }

    else if(this.displayincomes[i].amount>=0){
     checkpaidin=0;
     amount=this.displayincomes[i].amount;
     for(var j=0;j<this.customerinvoices.length;j++) {
       await new Promise<void> (resolve1 => {
         if(this.customerinvoices[j].allocatedAmount>0){            
         // window.alert("allocating"+element.allocatedAmount)  ;       
           this.api.allocateToSupplierInvoice(whose,this.customerinvoices[j].id,date222,this.customerinvoices[j].totalamount,this.customerinvoices[j].allocatedAmount).subscribe((data:any)=>{
             // console.log(data)             
             resolve1();
           });       
         }
         else{
           resolve1();
         }
       });
    } 
    for(var k=0;k<this.suppliernegativeinvoices.length;k++) {
     await new Promise<void> (resolve1 => {
       if(this.suppliernegativeinvoices[k].allocatedAmount>0){            
       // window.alert("allocating"+element.allocatedAmount)  ;       
         this.api.allocateToCustomerInvoice(whose,this.suppliernegativeinvoices[k].id,date222,-1*this.suppliernegativeinvoices[k].totalamount,this.suppliernegativeinvoices[k].allocatedAmount).subscribe((data:any)=>{
           // console.log(data)           
           resolve1();
         });       
       }
       else{
         resolve1();
       }
     });
    }    

   }

   //adding to bankStatement
   this.api.addbankstatement(date222,amount,desc,whose).subscribe((data:any)=>{
    // window.alert("Saved Successfully");
     //this.removePayment(i);
     this.displayincomes.splice(i,1);

   });

   //Adjusted amount needs to add in cash account
   //window.alert(date222)
  // window.alert(this.adjustedvalues.length);
  
  var flag=1;
  
   for(var h=0;h<this.adjustedvalues.length;h++){
     await new Promise<void> (resolve2 => {
       this.api.createNextCashAccountNumber(this.email).subscribe((data:any)=>{
         var cashaccountid=data.msg;
         var amount=0;
         if(checkpaidin==1){ //if paidin
               //Find negativeadustment negativeadjustedvalues
               
               this.negativeadjustedvalues[h].description=this.adjustedvalues[h].description;
               this.negativeadjustedvalues[h].category=this.adjustedvalues[h].category;
               this.negativeadjustedvalues[h].amount=-1*Number(this.adjustedvalues[h].amount);

               this.api.addCashAccountFromAdjusted(this.email,this.negativeadjustedvalues[h],date222,cashaccountid).subscribe((data1:any)=>{
                 if(data1.msg=="Successfully Saved"){
                   resolve2();             
                 }
                 else{
                   window.alert("Please Try after some time");
                   flag=0;
                   resolve2();
                 }  
               });
       }
       else if(checkpaidin==0){ //if paidout
           this.api.addCashAccountFromAdjusted(this.email,this.adjustedvalues[h],date222,cashaccountid).subscribe((data1:any)=>{
             if(data1.msg=="Successfully Saved"){
               resolve2();             
             }
             else{
               window.alert("Please Try after some time");
               flag=0;
               resolve2();
             }  
           });
       }

       });
     });
     
   }    
   if(flag==1){
     window.alert("SAVED Successfully")
   }
   else{
     window.alert("Pls Try after some time")
   }
   this.router.navigate(['\allaccount']); 
    //Adjested value to cash account ends
  }
}
