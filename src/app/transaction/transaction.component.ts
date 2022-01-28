import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import {Router} from '@angular/router';
import {SharedService} from '../shared.service';
class Payment{
  id: string;
  date: string;
  paidin: number;
  paidout: number;
  description: string;  
  category:string;
  amount :number; 
  constructor(){
    this.date=new Date().toISOString().split('T')[0];
  }
};
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})

export class TransactionComponent implements OnInit {
  categoryCode="";
  categoryName="";
  categorytitle="";
 
  // categorytitles=[];
  categorynamesoriginal=[];
  categorynames=[];
  categorynamefront=[];
  incomecategories=[];
  expencecategories=[];
  displaycategorynames=[];
  addnewcategoryenable=[];
  payments: Payment[] = [];
  matchactive=[];
  email=localStorage.getItem("uEmail");
  //matchactive=false;
  customerinvoices = []; 
  suppliernegativeinvoices=[];
  outby=[];
  savebtndisabled=[];
   today = new Date().toISOString().split('T')[0];

   @ViewChild('closebutton') closebutton;
  constructor(private api:ApiService,private router:Router,private sharedservice:SharedService) { 
    // var id=this.sharedservice.getidforcustomeredit();
    this.categorynames=[];
    //this.categorynamesoriginal=[];
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
    this.api.getCategories().subscribe((data:any)=>{        
      data.forEach(element => {
        this.categorynames.push(element);
        this.categorynamesoriginal.push(element)
        this.incomecategories.push(element);
        // if(this.categorytitles.indexOf(element.titlecategory)==-1){
        //   this.categorytitles.push(element.titlecategory);
        // }        
      });  
    }); 
    // this.api.getExpenceCategories().subscribe((data:any)=>{        
    //   data.forEach(element => {
    //     this.categorynames.push(element);
    //     this.expencecategories.push(element);
    //   });  
    // }); 
    this.payments.push(new Payment());
    this.payments[0].date=this.today;
    
    this.displaycategorynames[0]=false;
    this.addnewcategoryenable[0]=false;
    this.matchactive[0]=false;
    this.outby[0]=0;
    this.savebtndisabled[0]=true;
  }
  addPayment(){
    this.payments.push(new Payment());
    this.displaycategorynames.push(false);
    this.addnewcategoryenable.push(false);
    this.matchactive.push(false);
    this.outby.push(0);
    this.savebtndisabled.push(true);
  }
  removePayment(i: number) {
    this.payments.splice(i, 1);
    this.displaycategorynames.splice(i, 1);
    this.addnewcategoryenable.splice(i, 1);
    this.matchactive.splice(i,1);
    this.outby.splice(i,1);
    this.savebtndisabled.splice(i,1);
  }
  ngOnInit(): void {
  }
  selectedProductCategory(c,i:number){    
    this.payments[i].category=c;    
    this.displaycategorynames[i]=false; 
  }
  
  addNewCategory(){
    if(!this.categorytitle){
      window.alert("Select Category Title");
      return;
    }
    if(!this.categoryCode){
      window.alert("Category Code should not be empty");
      return;
    }    
    if(!this.categoryName){
      window.alert("Category Name should not be empty");
      return;
    }
    var category=this.categoryCode+"-"+this.categoryName;
    this.api.insertNewCategory(this.categorytitle,category,this.email).subscribe((data:any)=>{       
      window.alert(data.msg); 
      this.closebutton.nativeElement.click();
      //this.addnewcategoryenable[i]=false;       
     });
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
          this.addnewcategoryenable[j]=true;      
      } 
    });    
  }
  onPressKeyboardPaidOut(paidOut: string,j:number){   
   if(this.payments[j].paidin) {
     window.alert("This Payment is Changed to PayOut");
     this.payments[j].paidin=null;     
   } 
   this.outby[j]=parseFloat(paidOut)
   
  }
  onPressKeyboardPaidIn(paidOut: string,j:number){   
    if(this.payments[j].paidout) {
      window.alert("This Payment is Changed to PayIn");
      
      this.payments[j].paidout=null;     
    } 
    this.outby[j]=parseFloat(paidOut)
   }


   savePayment(i:number){
    this.email=localStorage.getItem("uEmail");
    var amount=0;
    if((!this.payments[i].paidin)&&(!this.payments[i].paidout)) {
      window.alert("Enter Amount");
      return;
    }
    if(!this.payments[i].category){
      window.alert("Enter Category");
      return;
    }
     //update in income table
     this.api.createNextCashAccountNumber(this.email).subscribe((data:any)=>{
      this.payments[i].id=data.msg;

      if(this.payments[i].paidin){
        amount=this.payments[i].paidin;
        this.payments[i].amount=-1*this.payments[i].paidin;
        this.api.addCashAccount(this.email,this.payments[i]).subscribe((data:any)=>{
          if(data.msg=="Successfully Saved"){
            window.alert("Saved Successfully");
            this.router.navigate(['/report']);
          }
          else{
            window.alert("Please Try after some time");
          }  
        });
      }
      else if(this.payments[i].paidout){
        amount=-1*this.payments[i].paidout;
        this.payments[i].amount=this.payments[i].paidout;
        this.api.addCashAccount(this.email,this.payments[i]).subscribe((data:any)=>{
          if(data.msg=="Successfully Saved"){
            window.alert("Saved Successfully");
            this.router.navigate(['/report']);
          }
          else{
            window.alert("Please Try after some time");
          }  
        });
      }

        //adding to bankStatement
        this.api.addbankstatement(this.payments[i].date,amount,this.payments[i].description,this.email).subscribe((data:any)=>{
          window.alert("Saved Successfully");
          this.removePayment(i);
        });
      
     });
    }
   
   

  //  savePaymentOld(i:number){
  //   this.email=localStorage.getItem("uEmail");
  //    //update in income table
  //   if(this.payments[i].paidin){
  //     this.payments[i].amount=this.payments[i].paidin;
  //     let refund = this.expencecategories.filter(x => x.category.toUpperCase() === this.payments[i].category.toUpperCase())[0];
  //     if(refund){
  //       window.alert("This is Supplier REFUND");
  //       this.payments[i].amount=-1*this.payments[i].paidout;
  //       this.api.getExpenceID(this.email).subscribe((data:any)=>{
  //         var expenceid=parseInt(data.len); 
  //         this.payments[i].id=expenceid;
  //         this.api.updateExpences(this.email,this.payments[i]).subscribe((data:any)=>{
  //           if(data.msg=="Updated"){
  //             window.alert("Saved Successfully");
  //             this.router.navigate(['/report']);
  //           }
  //           else{
  //             window.alert("Please Try after some time");
  //           }  
  //         });
  //       });
  //     } 
  //     else{
  //       this.api.getIncomeID(this.email).subscribe((data:any)=>{
  //         var incomeid=parseInt(data.len); 
  //         this.payments[i].id=incomeid;
  //         this.api.updateIncomes(this.email,this.payments[i]).subscribe((data:any)=>{
  //           if(data.msg=="Updated"){
  //             window.alert("Saved Successfully");
  //             this.router.navigate(['/report']);
  //           }
  //           else{
  //             window.alert("Please Try after some time");
  //           }  
  //         });
  //       });
  //     }

  //   }
  //   //update in expence table
  //   if(this.payments[i].paidout){
  //     this.payments[i].amount=this.payments[i].paidout;
  //     let refund = this.incomecategories.filter(x => x.category.toUpperCase() === this.payments[i].category.toUpperCase())[0];
  //     if(refund){
  //       //window.alert("This is Customer REFUND");
  //       this.payments[i].amount=-1*this.payments[i].paidout;
  //       this.api.getIncomeID(this.email).subscribe((data:any)=>{
  //         var incomeid=parseInt(data.len); 
  //         this.payments[i].id=incomeid;
  //         this.api.updateIncomes(this.email,this.payments[i]).subscribe((data:any)=>{
  //           if(data.msg=="Updated"){
  //             window.alert("Saved Successfully");
  //             this.router.navigate(['/report']);
  //           }
  //           else{
  //             window.alert("Please Try after some time");
  //           }  
  //         });
  //       });
  //     } 
  //     else{
  //       this.api.getExpenceID(this.email).subscribe((data:any)=>{
  //         var expenceid=parseInt(data.len); 
  //         this.payments[i].id=expenceid;
  //         this.api.updateExpences(this.email,this.payments[i]).subscribe((data:any)=>{
  //           if(data.msg=="Updated"){
  //             window.alert("Saved Successfully");
  //             this.router.navigate(['/report']);
  //           }
  //           else{
  //             window.alert("Please Try after some time");
  //           }  
  //         });
  //       });
  //     }     
  //   }   
  //  }


   matchSelected(i){
     var p=0;
     for(p=0;p<this.matchactive.length;p++){
       if(p!=i){
         this.matchactive[p]=false;
       }
     }




    if(this.payments[i].paidin){
      //customer invoice and Supplier negative inoice;
      this.matchactive[i]=true;
      this.outby[i]=this.payments[i].paidin;
      this.customerinvoices=[];
       this.suppliernegativeinvoices=[];
      this.api.getAllCustomerInvoioceUnallocated(this.email).subscribe((data:any)=>{        
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



    else if(this.payments[i].paidout){
      //Supplier invoice and Customer negative invoice
      this.matchactive[i]=true;
      this.customerinvoices=[];
       this.suppliernegativeinvoices=[];

       this.outby[i]=this.payments[i].paidout;
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



   checkValuePositive(k,i){   
    //window.alert("clicked chkpositive"+this.customerinvoices[k].balanceamount)
     var recievedamount=0;
     var totalallocated=0;
     if(this.payments[i].paidin){
      recievedamount=this.payments[i].paidin;
     }
     else if(this.payments[i].paidout){
      recievedamount=this.payments[i].paidout;
     }
       if(this.customerinvoices[k].checked){         
        if(this.outby[i]<0){         
          this.customerinvoices[k].checked=true;  
          return;
        }
        else if(this.customerinvoices[k].balanceamount1<=this.outby[i]){         
          this.customerinvoices[k].allocatedAmount=this.customerinvoices[k].balanceamount1;         
        }   
        else{
          this.customerinvoices[k].allocatedAmount=this.outby[i];         
        }  
        this.outby[i]=this.outby[i]-this.customerinvoices[k].balanceamount1; 
      }
      else{
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
   }

   checkValueNegative(k,i){   
    //window.alert("clicked chknegative"+this.suppliernegativeinvoices[k].balanceamount1)
      var recievedamount=0;
      var totalallocated=0;

      if(this.payments[i].paidin){
        recievedamount=this.payments[i].paidin;
       }
       else if(this.payments[i].paidout){
        recievedamount=this.payments[i].paidout;
       }

       if(this.suppliernegativeinvoices[k].checked){ 
        if(this.outby[i]<0){         
          this.suppliernegativeinvoices[k].checked=true;   
          return         
        }
        else if(this.suppliernegativeinvoices[k].balanceamount1<=this.outby[i]){
          this.suppliernegativeinvoices[k].allocatedAmount=this.suppliernegativeinvoices[k].balanceamount1;          
        }   
        else{
          this.suppliernegativeinvoices[k].allocatedAmount=this.outby[i];
        }  
        this.outby[i]=this.outby[i]-this.suppliernegativeinvoices[k].balanceamount1;                
      }
      else{
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
   }
   
   async allocateAmount(date,desc,i){    
     var whose=localStorage.getItem("uEmail"); 
      var amount=0;
     if(this.payments[i].paidin){ 
       amount=this.payments[i].paidin;
       for(var j=0;j<this.customerinvoices.length;j++) {
          await new Promise<void> (resolve1 => {
            if(this.customerinvoices[j].allocatedAmount>0){ 
             
            // window.alert("allocating"+element.allocatedAmount)  ;       
              this.api.allocateToCustomerInvoice(whose,this.customerinvoices[j].id,date,this.customerinvoices[j].totalamount,-1*this.customerinvoices[j].allocatedAmount).subscribe((data:any)=>{
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
            this.api.allocateToSupplierInvoice(whose,this.suppliernegativeinvoices[k].id,date,-1*this.suppliernegativeinvoices[k].totalamount,-1*this.suppliernegativeinvoices[k].allocatedAmount).subscribe((data:any)=>{
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

     else if(this.payments[i].paidout){
      amount=this.payments[i].paidout;
      for(var j=0;j<this.customerinvoices.length;j++) {
        await new Promise<void> (resolve1 => {
          if(this.customerinvoices[j].allocatedAmount>0){ 
           
          // window.alert("allocating"+element.allocatedAmount)  ;       
            this.api.allocateToSupplierInvoice(whose,this.customerinvoices[j].id,date,this.customerinvoices[j].totalamount,this.customerinvoices[j].allocatedAmount).subscribe((data:any)=>{
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
          this.api.allocateToCustomerInvoice(whose,this.suppliernegativeinvoices[k].id,date,-1*this.suppliernegativeinvoices[k].totalamount,this.suppliernegativeinvoices[k].allocatedAmount).subscribe((data:any)=>{
            // console.log(data)
           
            resolve1();
          });       
        }
        else{
          resolve1();
        }
      });
     }    



    //   this.customerinvoices.forEach(element => {
    //     // console.log("Allocated amount")
    //     // console.log(element.allocatedAmount)
    //    if(element.allocatedAmount>0){          
    //      this.api.allocateToSupplierInvoice(whose,element.id,date,element.totalamount,element.allocatedAmount).subscribe((data:any)=>{
    //          //console.log(data)
    //      });       
    //    }
    //   });
    //   this.suppliernegativeinvoices.forEach(element => {   

    //   if(element.allocatedAmount>0){          
    //     this.api.allocateToCustomerInvoice(whose,element.id,date,-1*element.totalamount,element.allocatedAmount).subscribe((data:any)=>{
    //        // console.log(data)
    //     });       
    //   }
    //  });   
     
     
    }

    //adding to bankStatement
    this.api.addbankstatement(date,amount,desc,whose).subscribe((data:any)=>{
      window.alert("Saved Successfully");
      this.removePayment(i);
    });
   }

   createSelected(i){      
    this.matchactive[i]=false;
   }
  setasCustomer(){   
    this.sharedservice.setCustomerOrSupplier("Customer");
  }
  setasSupplier(){   
    this.sharedservice.setCustomerOrSupplier("Supplier");
  }
  editordelete(i,status){
    // window.alert(status)
     this.sharedservice.setidforcustomeredit(i,status);
     //this.router.navigate(['\editcustomerinvoice']);
      this.router.navigate(['\intermediatedisplay']);    
   }
   customerclicked(i){   
    this.sharedservice.setCustomerOrSupplier("Customer");
     this.sharedservice.setSelectedCustomerID(i);
   }
   supplierclicked(i){   
    this.sharedservice.setCustomerOrSupplier("Supplier");
     this.sharedservice.setSelectedCustomerID(i);
   }

}
