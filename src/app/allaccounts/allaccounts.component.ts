import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-allaccounts',
  templateUrl: './allaccounts.component.html',
  styleUrls: ['./allaccounts.component.css']
})
export class AllaccountsComponent implements OnInit {
  email="";
  today = new Date();  
  selectedYear="";  
  selectedQuarter="";
  incomes=[];
  expences=[];
  result=[];
  totalincome=0;
  totalexpence=0;
  netincome=0;
  lowerdate="";
  higherdate="";
  displayincomes=[];
  originalincomes=[];
  displayexpences=[];
  originalexpences=[];
  incomeclick=false;
  expenceclick=false;
 
  consolidatedincomes = new Map<string, number>();
  consolidatedexpences= new Map<string, number>();
  isReadonly=[];

  constructor(private router:Router,private api:ApiService,private sharedapi:SharedService) { 
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
    
    if((this.today.getTime()> new Date('2020-04-06').getTime())&&(this.today.getTime()< new Date('2021-04-05').getTime())){
      this.selectedYear="20";
    }
    if((this.today.getTime()> new Date('2021-04-06').getTime())&&(this.today.getTime()< new Date('2022-04-05').getTime())){
      this.selectedYear="21";
    }
    if((this.today.getTime()> new Date('2022-04-06').getTime())&&(this.today.getTime()< new Date('2023-04-05').getTime())){
      this.selectedYear="22";
    }
    this.lowerdate="20"+this.selectedYear+"-04-06";
    this.higherdate="20"+(parseInt(this.selectedYear)+1).toString()+"-04-05";
    this.selectedQuarter="0";
    this.email=localStorage.getItem("uEmail"); 
    this.getIncomesAndExpences();
  }

  ngOnInit(): void {
    this.email=localStorage.getItem("uEmail"); 
  }
  yearChange(){
    this.lowerdate="20"+this.selectedYear+"-04-06";
    this.higherdate="20"+(parseInt(this.selectedYear)+1).toString()+"-04-05";    
    this.quarterChange();   
   // this.getIncomesAndExpences(); 
  }

  quarterChange(){
    //this.hmrcbtndisabled=true;
    if(this.selectedQuarter=="0"){
      this.lowerdate="20"+this.selectedYear+"-04-06";
      this.higherdate="20"+(parseInt(this.selectedYear)+1).toString()+"-04-05";
    }
    else if(this.selectedQuarter=="1"){
      this.lowerdate="20"+this.selectedYear+"-04-06";
      this.higherdate="20"+this.selectedYear+"-07-05";
    }
    else if(this.selectedQuarter=="2"){
      this.lowerdate="20"+this.selectedYear+"-07-06";
      this.higherdate="20"+this.selectedYear+"-10-05";
    }
    else if(this.selectedQuarter=="3"){
      this.lowerdate="20"+this.selectedYear+"-10-06";
      this.higherdate="20"+(parseInt(this.selectedYear)+1).toString()+"-01-05";
    }
    else if(this.selectedQuarter=="4"){
      this.lowerdate="20"+(parseInt(this.selectedYear)+1).toString()+"-01-6";
      this.higherdate="20"+(parseInt(this.selectedYear)+1).toString()+"-04-05";
    }
    // this.api.checkHmrcDataUploaded(this.email,this.selectedYear,this.selectedQuarter).subscribe(async (data:any)=>{      
    //   if((data.msg=="Not Uploaded")&&(this.selectedQuarter!="0")){
    //     if((this.today.getTime()> new Date(this.higherdate).getTime())){   
    //       //Enable hmrc Enable button  
    //       // this.hmrcbtndisabled=false;
    //     }
    //   }
    // });    
    this.getIncomesAndExpences();    
  }
 
  updateIncome(){
    this.email=localStorage.getItem("uEmail"); 
    this.api.modifyIncomes(this.email,this.originalincomes,this.displayincomes).subscribe((data:any)=>{
      if(data.msg=="Updated"){
        window.alert("Updated Successfully");
          // for(var k=0;k<this.isReadonly.length;k++){
          //   this.isReadonly[k]=true;
          // }
          this.getIncomesAndExpences();
      }
      else{
        window.alert("Please Try after some time");
      }  
    });
  }
  updateExpence(){
    this.email=localStorage.getItem("uEmail"); 
    this.api.modifyExpences(this.email,this.originalexpences,this.displayexpences).subscribe((data:any)=>{
      if(data.msg=="Updated"){
        window.alert("Updated Successfully");
        // for(var k=0;k<this.isReadonly.length;k++){
        //   this.isReadonly[k]=true;
        // }
        this.getIncomesAndExpences();
      }
      else{
        window.alert("Please Try after some time");
      }  
    });
  }
  removeIncomeField(i: number) {
    this.displayincomes.splice(i, 1);
    this.isReadonly.splice(i,1);
    this.updateIncome();
  }
  enableIncomeEditing(i:number){
    for(var k=0;k<this.isReadonly.length;k++){
      this.isReadonly[k]=true;
    }
    this.isReadonly[i]=false;
  }
  removeExpenceField(i: number) {
    this.displayexpences.splice(i, 1);
    this.isReadonly.splice(i,1);
    this.updateExpence();
  }
  enableExpenceEditing(i:number){
    for(var k=0;k<this.isReadonly.length;k++){
      this.isReadonly[k]=true;
    }
    this.isReadonly[i]=false;
  }
  onBankClick (event){ 
    this.incomeclick=false;
    this.expenceclick=true;
    this.displayexpences=[];
    this.originalexpences=[];
    this.isReadonly=[]; 
    for(var i=0;i<this.expences.length;i++){
      var category=this.expences[i].category; 
          this.displayexpences.push(this.expences[i]);
          this.isReadonly.push(true);
          this.originalexpences.push(this.expences[i]);
    }
  }
  // onExpenceClick (event, data){ 
  //   this.incomeclick=false;
  //   this.expenceclick=true;
  //   this.displayexpences=[];
  //   this.originalexpences=[];
  //   this.isReadonly=[]; 
  //   for(var i=0;i<this.expences.length;i++){
  //     var category=this.expences[i].category;     
  //       if(category==data){
  //         this.displayexpences.push(this.expences[i]);
  //         this.isReadonly.push(true);
  //         this.originalexpences.push(this.expences[i]);
  //       }  
  //   }
  // }
  onIncomeClick (event, data){ 
    this.incomeclick=true;
    this.expenceclick=false;
    this.displayincomes=[];
    this.originalincomes=[];
     this.isReadonly=[];
    for(var i=0;i<this.incomes.length;i++){
      var category=this.incomes[i].category;     
        if(category==data){
          this.displayincomes.push(this.incomes[i]);
          this.isReadonly.push(true);
          this.originalincomes.push(this.incomes[i]);
        }  
    }
  }
  getIncomesAndExpences(){ 
    this.incomes=[]   ;
    this.expences=[];
    this.displayincomes=[];
    this.displayexpences=[];
    this.consolidatedincomes.clear();
    this.consolidatedexpences.clear();
    this.totalincome=0;
    this.totalexpence=0;
    this.netincome=0;
    this.email=localStorage.getItem("uEmail");   
    this.api.getAllCashAccounts(this.email).subscribe(async (data:any)=>{   
      console.log(data);
      this.incomes=data;
      this.expences=data;
      for(var i=0;i<this.incomes.length;i++){
        var dateString=this.incomes[i].date;
        let incomeDate = new Date(dateString); 
          if((incomeDate.getTime()< new Date(this.lowerdate).getTime())||(incomeDate.getTime()> new Date(this.higherdate).getTime())){
            this.incomes.splice(i,1);
            this.expences.splice(i,1);
            i--;
          }  
      }
      this.incomes.forEach(element => {        
        this.totalincome=this.totalincome+element.amount;
      });
      //for display categorywise in front end
      for(const {category, amount} of this.incomes) {       
              await new Promise<void>(resolve => {                
                  this.consolidatedincomes.set(category, (Number(this.consolidatedincomes.get(category)) || 0) + Number(amount));                  
                  resolve();                
            }); 
      }  
    }); 
  }
  // getIncomesAndExpencesOld(){ 
  //   this.incomes=[]   ;
  //   this.expences=[];
  //   this.displayincomes=[];
  //   this.displayexpences=[];
  //   this.consolidatedincomes.clear();
  //   this.consolidatedexpences.clear();
  //   this.totalincome=0;
  //   this.totalexpence=0;
  //   this.netincome=0;
  //   this.email=localStorage.getItem("uEmail");   
  //   this.api.getAllIncomeAndExpences(this.email).subscribe(async (data:any)=>{     
  //     this.incomes=data[0].incomes;
  //     this.expences=data[0].expences; 
  //     for(var i=0;i<this.incomes.length;i++){
  //       var dateString=this.incomes[i].date;
  //       let incomeDate = new Date(dateString); 
  //         if((incomeDate.getTime()< new Date(this.lowerdate).getTime())||(incomeDate.getTime()> new Date(this.higherdate).getTime())){
  //           this.incomes.splice(i,1);
  //           i--;
  //         }  
  //     }
      
  //     //yearwise expence fetching
  //     for(var i=0;i<this.expences.length;i++){
  //       var dateString=this.expences[i].date;
  //       let expenceDate = new Date(dateString); 
  //           if((expenceDate.getTime()< new Date(this.lowerdate).getTime())||(expenceDate.getTime()> new Date(this.higherdate).getTime())){
  //           this.expences.splice(i,1);
  //           i--;
  //         }
  //     }
  //     this.incomes.forEach(element => {        
  //       this.totalincome=this.totalincome+element.amount;
  //     });
  //     //for display categorywise in front end
  //     for(const {category, amount} of this.incomes) {       
  //             await new Promise<void>(resolve => {                
  //                 this.consolidatedincomes.set(category, (Number(this.consolidatedincomes.get(category)) || 0) + Number(amount));                  
  //                 resolve();                
  //           }); 
  //     }      
  //     //cumiative expence category wise
  //     for(const {category, amount} of this.expences) {
  //           await new Promise<void>(resolve => {                
  //               this.consolidatedexpences.set(category, (Number(this.consolidatedexpences.get(category)) || 0) + Number(amount));                  
  //               resolve();                
  //            }); 
  //     }    
    
  //   }); 
  // }
  setasCustomer(){   
    this.sharedapi.setCustomerOrSupplier("Customer");
  }
  setasSupplier(){   
    this.sharedapi.setCustomerOrSupplier("Supplier");
  }

}
