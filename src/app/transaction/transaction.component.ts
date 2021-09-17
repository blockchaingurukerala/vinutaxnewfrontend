import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Router} from '@angular/router';
import {SharedService} from '../shared.service';
class Payment{
  id: number;
  date: string;
  paidin: number;
  paidout: number;
  description: string;  
  category:string;
  amount :number; 
};
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})

export class TransactionComponent implements OnInit {
  categorynames=[];
  incomecategories=[];
  expencecategories=[];
  displaycategorynames=[];
  addnewcategoryenable=[];
  payments: Payment[] = [];
  email=localStorage.getItem("uEmail");
  constructor(private api:ApiService,private router:Router,private sharedservice:SharedService) { 
    // var id=this.sharedservice.getidforcustomeredit();
    this.categorynames=[];
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
    this.api.getCategories().subscribe((data:any)=>{        
      data.forEach(element => {
        this.categorynames.push(element);
        this.incomecategories.push(element);
      });  
    }); 
    this.api.getExpenceCategories().subscribe((data:any)=>{        
      data.forEach(element => {
        this.categorynames.push(element);
        this.expencecategories.push(element);
      });  
    }); 
    this.payments.push(new Payment());
    this.displaycategorynames[0]=false;
    this.addnewcategoryenable[0]=false;
  }
  addPayment(){
    this.payments.push(new Payment());
    this.displaycategorynames.push(false);
    this.addnewcategoryenable.push(false);
  }
  removePayment(i: number) {
    this.payments.splice(i, 1);
    this.displaycategorynames.splice(i, 1);
    this.addnewcategoryenable.splice(i, 1);
  }
  ngOnInit(): void {
  }
  selectedProductCategory(c,i:number){
    this.payments[i].category=c;    
    this.displaycategorynames[i]=false;  
    if(this.payments[i].paidin) {
      let refund = this.expencecategories.filter(x => x.category.toUpperCase() === c.toUpperCase())[0];
      if(refund){
        window.alert("This is Supplier REFUND");
      }
    } 
    else if(this.payments[i].paidout) {
      let refund = this.incomecategories.filter(x => x.category.toUpperCase() === c.toUpperCase())[0];
      if(refund){
        window.alert("This is Customer REFUND");
      } 
    } 


  }
  addNewCategory(i:number){
    if(this.sharedservice.getCustomerOrSupplier()=="Customer"){
      this.api.insertNewCategory(this.payments[i].category).subscribe((data:any)=>{       
        window.alert(data.msg);   
        this.addnewcategoryenable[i]=false;       
       });
    }
    else if(this.sharedservice.getCustomerOrSupplier()=="Supplier"){
      this.api.insertNewExpenceCategory(this.payments[i].category).subscribe((data:any)=>{       
        window.alert(data.msg);   
        this.addnewcategoryenable[i]=false;        
       });
    }
    else{
      window.alert("Error try again later..");
      this.router.navigate(['/report']); 
    }
    
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
  onPressKeyboardPaidOut(paidOut: string,j:number){   
   if(this.payments[j].paidin) {
     window.alert("This Payment is Changed to PayOut");
     this.payments[j].paidin=null;     
   } 
  }
  onPressKeyboardPaidIn(paidOut: string,j:number){   
    if(this.payments[j].paidout) {
      window.alert("This Payment is Changed to PayIn");
      this.payments[j].paidout=null;     
    } 
   }
   savePayment(i:number){
    this.email=localStorage.getItem("uEmail");
     //update in income table
    if(this.payments[i].paidin){
      this.payments[i].amount=this.payments[i].paidin;
      let refund = this.expencecategories.filter(x => x.category.toUpperCase() === this.payments[i].category.toUpperCase())[0];
      if(refund){
        window.alert("This is Supplier REFUND");
        this.payments[i].amount=-1*this.payments[i].paidout;
        this.api.getExpenceID(this.email).subscribe((data:any)=>{
          var expenceid=parseInt(data.len); 
          this.payments[i].id=expenceid;
          this.api.updateExpences(this.email,this.payments[i]).subscribe((data:any)=>{
            if(data.msg=="Updated"){
              window.alert("Saved Successfully");
              this.router.navigate(['/report']);
            }
            else{
              window.alert("Please Try after some time");
            }  
          });
        });
      } 
      else{
        this.api.getIncomeID(this.email).subscribe((data:any)=>{
          var incomeid=parseInt(data.len); 
          this.payments[i].id=incomeid;
          this.api.updateIncomes(this.email,this.payments[i]).subscribe((data:any)=>{
            if(data.msg=="Updated"){
              window.alert("Saved Successfully");
              this.router.navigate(['/report']);
            }
            else{
              window.alert("Please Try after some time");
            }  
          });
        });
      }

    }
    //update in expence table
    if(this.payments[i].paidout){
      this.payments[i].amount=this.payments[i].paidout;
      let refund = this.incomecategories.filter(x => x.category.toUpperCase() === this.payments[i].category.toUpperCase())[0];
      if(refund){
        //window.alert("This is Customer REFUND");
        this.payments[i].amount=-1*this.payments[i].paidout;
        this.api.getIncomeID(this.email).subscribe((data:any)=>{
          var incomeid=parseInt(data.len); 
          this.payments[i].id=incomeid;
          this.api.updateIncomes(this.email,this.payments[i]).subscribe((data:any)=>{
            if(data.msg=="Updated"){
              window.alert("Saved Successfully");
              this.router.navigate(['/report']);
            }
            else{
              window.alert("Please Try after some time");
            }  
          });
        });
      } 
      else{
        this.api.getExpenceID(this.email).subscribe((data:any)=>{
          var expenceid=parseInt(data.len); 
          this.payments[i].id=expenceid;
          this.api.updateExpences(this.email,this.payments[i]).subscribe((data:any)=>{
            if(data.msg=="Updated"){
              window.alert("Saved Successfully");
              this.router.navigate(['/report']);
            }
            else{
              window.alert("Please Try after some time");
            }  
          });
        });
      }
     
    }
   
   }
  setasCustomer(){   
    this.sharedservice.setCustomerOrSupplier("Customer");
  }
  setasSupplier(){   
    this.sharedservice.setCustomerOrSupplier("Supplier");
  }

}
