import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
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
  hmrcbtndisabled=true;
     
  consolidatedincomes = new Map<string, number>();
  consolidatedexpences= new Map<string, number>();
  constructor(private router:Router,private api:ApiService) { 
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
    this.hmrcbtndisabled=true;
    this.getIncomesAndExpences();
  }
  ngOnInit(): void {
  }
  yearChange(){
    this.lowerdate="20"+this.selectedYear+"-04-06";
    this.higherdate="20"+(parseInt(this.selectedYear)+1).toString()+"-04-05";    
    this.quarterChange();   
   // this.getIncomesAndExpences(); 
  }
  quarterChange(){
    this.hmrcbtndisabled=true;
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
    this.api.checkHmrcDataUploaded(this.email,this.selectedYear,this.selectedQuarter).subscribe(async (data:any)=>{
      
      if((data.msg=="Not Uploaded")&&(this.selectedQuarter!="0")){
        if((this.today.getTime()> new Date(this.higherdate).getTime())){   
          //Enable hmrc Enable button  
          this.hmrcbtndisabled=false;
        }
      }
    });    
    this.getIncomesAndExpences();    
  }
  getIncomesAndExpences(){ 
    this.incomes=[]   ;
    this.expences=[];
    this.consolidatedincomes.clear();
    this.consolidatedexpences.clear();
    this.totalincome=0;
    this.totalexpence=0;
    this.netincome=0;
    this.email=localStorage.getItem("uEmail");   
    this.api.getAllIncomeAndExpences(this.email).subscribe(async (data:any)=>{     
      this.incomes=data[0].incomes;
      this.expences=data[0].expences;
      //year wise income 
      
      // var lowerdate="20"+this.selectedYear+"-04-06";
      // var higherdate="20"+(parseInt(this.selectedYear)+1).toString()+"-04-05";
     
      for(var i=0;i<this.incomes.length;i++){
        var dateString=this.incomes[i].date;
        let incomeDate = new Date(dateString); 
          if((incomeDate.getTime()< new Date(this.lowerdate).getTime())||(incomeDate.getTime()> new Date(this.higherdate).getTime())){
            this.incomes.splice(i,1);
            i--;
          }  
      }
      //yearwise expence fetching
      for(var i=0;i<this.expences.length;i++){
        var dateString=this.expences[i].date;
        let expenceDate = new Date(dateString); 
            if((expenceDate.getTime()< new Date(this.lowerdate).getTime())||(expenceDate.getTime()> new Date(this.higherdate).getTime())){
            this.expences.splice(i,1);
            i--;
          }
      }
      this.incomes.forEach(element => {        
        this.totalincome=this.totalincome+Number(element.amount);
      });
      //for display categorywise in front end
      for(const {category, amount} of this.incomes) {       
              await new Promise<void>(resolve => {                
                  this.consolidatedincomes.set(category, (Number(this.consolidatedincomes.get(category)) || 0) + Number(amount));                  
                  resolve();                
            }); 
      }      
      //cumiative expence category wise
      for(const {category, amount} of this.expences) {
            await new Promise<void>(resolve => {                
                this.consolidatedexpences.set(category, (Number(this.consolidatedexpences.get(category)) || 0) + Number(amount));                  
                resolve();                
             }); 
      }    
     // let jsonString = JSON.stringify(jsonObject);
      
      //finding total expence      
      this.expences.forEach(element => {        
        this.totalexpence=this.totalexpence+Number(element.amount);
      });
      this.netincome=this.totalincome-this.totalexpence;
    }); 
  }
  hmrcCall(){
    this.api.hmrcCall().subscribe((data:any)=>{
      console.log(data);
      window.alert(data.message);
      this.api.hmrcDataUploaded(this.email,this.selectedYear,this.selectedQuarter).subscribe(async (data:any)=>{
        if((data.msg=="Successfully Inserted")){
          window.alert("successfully Inserted");
          this.quarterChange();
        }
      });  
   });
    
   
  }
}
