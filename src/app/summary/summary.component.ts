import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  username="";
  email="";
  today = new Date();  
  selectedYear=""; 
  incomes=[];
  expences=[];
  consolidatedincomes = new Map<string, number>();
  consolidatedexpences= new Map<string, number>();
  public pieChartColors: Array < any > = [{
    backgroundColor: [ 'rgba(255,5,5,0.2)','rgba(0,255,8,0.2)','rgba(2,0,255,0.2)','rgba(148,215,42,0.2)','rgba(209,31,42,0.2)','rgba(49,67,82,0.2)'],
    borderColor: ['rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)','rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)']
 }];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public pieChartOptions = {
    responsive: true,
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [], label: 'Incomes'}   
  ];
  public barChartLabelsexpences = [];
  public barChartTypeexpences = 'bar';
  public barChartLegendexpences = true;
  public barChartDataexpences = [
    {data: [], label: 'Expences'}   
  ];  

  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType = 'pie';
  public pieChartLegend =true;
  
  public pieChartLabelsExpence = [];
  public pieChartDataExpence = [];
  public pieChartTypeExpence = 'pie';
  
  constructor(private router:Router,private api:ApiService,private sharedapi:SharedService) { 
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
    this.username=localStorage.getItem("uName"); 
    if((this.today.getTime()> new Date('2020-04-06').getTime())&&(this.today.getTime()< new Date('2021-04-05').getTime())){
      this.selectedYear="20";
    }
    if((this.today.getTime()> new Date('2021-04-06').getTime())&&(this.today.getTime()< new Date('2022-04-05').getTime())){
      this.selectedYear="21";
    }
    if((this.today.getTime()> new Date('2022-04-06').getTime())&&(this.today.getTime()< new Date('2023-04-05').getTime())){
      this.selectedYear="22";
    }
    this.getIncomesAndExpences();
  }
  getIncomesAndExpences(){
    this.email=localStorage.getItem("uEmail");
    this.incomes=[]   ;
    this.expences=[];
    this.consolidatedincomes.clear();
    this.consolidatedexpences.clear();    
    this.api.getAllIncomeAndExpences(this.email).subscribe(async (data:any)=>{     
      this.incomes=data[0].incomes;
      this.expences=data[0].expences; 
          //year wise income fetching
          for(var i=0;i<this.incomes.length;i++){
            var dateString=this.incomes[i].date;
            let incomeDate = new Date(dateString);  
            if(this.selectedYear=="19"){
              if((incomeDate.getTime()< new Date('2019-04-06').getTime())||(incomeDate.getTime()> new Date('2020-04-05').getTime())){
                this.incomes.splice(i,1);
                i--;
              }
            } 
            else if(this.selectedYear=="20"){
              if((incomeDate.getTime()< new Date('2020-04-06').getTime())||(incomeDate.getTime()> new Date('2021-04-05').getTime())){
                this.incomes.splice(i,1);
                i--;
              }
            }   
            else if(this.selectedYear=="21"){
              if((incomeDate.getTime()< new Date('2021-04-06').getTime())||(incomeDate.getTime()> new Date('2022-04-05').getTime())){
                this.incomes.splice(i,1);
                i--;
              }
            }   
            else if(this.selectedYear=="22"){
              if((incomeDate.getTime()< new Date('2022-04-06').getTime())||(incomeDate.getTime()> new Date('2023-04-05').getTime())){
                this.incomes.splice(i,1);
                i--;
              }
            }  
            else if(this.selectedYear=="23"){
              if((incomeDate.getTime()< new Date('2023-04-06').getTime())||(incomeDate.getTime()> new Date('2024-04-05').getTime())){
                this.incomes.splice(i,1);
                i--;
              }
            } 
            else if(this.selectedYear=="24"){                 
              if((incomeDate.getTime()< new Date('2024-04-06').getTime())||(incomeDate.getTime()> new Date('2025-04-05').getTime())){
                this.incomes.splice(i,1);
                i--;           
              }
            } 
            if(this.selectedYear=="25"){
              if((incomeDate.getTime()< new Date('2025-04-06').getTime())||(incomeDate.getTime()> new Date('2026-04-05').getTime())){
                this.incomes.splice(i,1);
                i--;
              }
            } 
          }
          //yearwise expence fetching
          for(var i=0;i<this.expences.length;i++){
            var dateString=this.expences[i].date;
            let expenceDate = new Date(dateString);  
            if(this.selectedYear=="19"){
              if((expenceDate.getTime()< new Date('2019-04-06').getTime())||(expenceDate.getTime()> new Date('2020-04-05').getTime())){
                this.expences.splice(i,1);
                i--;
              }
            } 
            else if(this.selectedYear=="20"){
              if((expenceDate.getTime()< new Date('2020-04-06').getTime())||(expenceDate.getTime()> new Date('2021-04-05').getTime())){
                this.expences.splice(i,1);
                i--;
              }
            }   
            else if(this.selectedYear=="21"){
              if((expenceDate.getTime()< new Date('2021-04-06').getTime())||(expenceDate.getTime()> new Date('2022-04-05').getTime())){
                this.expences.splice(i,1);
                i--;
              }
            }   
            else if(this.selectedYear=="22"){
              if((expenceDate.getTime()< new Date('2022-04-06').getTime())||(expenceDate.getTime()> new Date('2023-04-05').getTime())){
                this.expences.splice(i,1);
                i--;
              }
            }  
            else if(this.selectedYear=="23"){
              if((expenceDate.getTime()< new Date('2023-04-06').getTime())||(expenceDate.getTime()> new Date('2024-04-05').getTime())){
                this.expences.splice(i,1);
                i--;
              }
            } 
            else if(this.selectedYear=="24"){                 
              if((expenceDate.getTime()< new Date('2024-04-06').getTime())||(expenceDate.getTime()> new Date('2025-04-05').getTime())){
                this.expences.splice(i,1);
                i--;           
              }
            } 
            if(this.selectedYear=="25"){
              if((expenceDate.getTime()< new Date('2025-04-06').getTime())||(expenceDate.getTime()> new Date('2026-04-05').getTime())){
                this.expences.splice(i,1);
                i--;
              }
            } 
          }
      //cumiative income category wise
      for(const {category, amount} of this.incomes) {
              await new Promise<void>(resolve => {                
                  this.consolidatedincomes.set(category, (this.consolidatedincomes.get(category) || 0) + amount);                  
                  resolve();                
            }); 
      }
      //cumiative expence category wise
      for(const {category, amount} of this.expences) {
            await new Promise<void>(resolve => {                
                this.consolidatedexpences.set(category, (this.consolidatedexpences.get(category) || 0) + amount);                  
                resolve();                
             }); 
      }  
      this.barChartLabels = Array.from(this.consolidatedincomes.keys() );
      this.barChartData[0].data = Array.from(this.consolidatedincomes.values() );
      this.pieChartLabels = Array.from(this.consolidatedincomes.keys() );
      this.pieChartData = Array.from(this.consolidatedincomes.values() );

      this.barChartLabelsexpences = Array.from(this.consolidatedexpences.keys() );
      this.barChartDataexpences[0].data = Array.from(this.consolidatedexpences.values() );
      this.pieChartLabelsExpence = Array.from(this.consolidatedexpences.keys() );
      this.pieChartDataExpence = Array.from(this.consolidatedexpences.values() );
    }); 
  }
  yearChange(){
    this.getIncomesAndExpences();    
  }
  ngOnInit(): void {
    this.username=localStorage.getItem("uName");
  }
  logout(){
    localStorage.removeItem("uName");
    localStorage.removeItem("loggedIn");
    this.router.navigate(['']);
  }
  setasCustomer(){   
    this.sharedapi.setCustomerOrSupplier("Customer");
  }
  setasSupplier(){   
    this.sharedapi.setCustomerOrSupplier("Supplier");
  }

}
