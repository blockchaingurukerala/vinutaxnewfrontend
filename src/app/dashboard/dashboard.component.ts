import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service'
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username="";
  categoryadded=false;
  public incomes: any[] = [{
    id: '',
    category: '',    
    description: '',
    amount: '',
    date: ''    
  }];  
   options = [];  
  selectedUser: any; 
  email="";
  incomeid=0;
//category drop down ends
  constructor(private router:Router,private api:ApiService,private sharedapi:SharedService) { 
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
    this.username=localStorage.getItem("uName"); 
    this.api.getCategories().subscribe((data:any)=>{   
      data.forEach(element => {
        this.options.push(element.category);
      });
    });  
    
  }

  ngOnInit(): void {
    this.username=localStorage.getItem("uName");
  }
  logout(){
    localStorage.removeItem("uName");
    localStorage.removeItem("loggedIn");
    this.router.navigate(['']);
  }
  updateIncome(){
    //window.alert("Saved Successfully");
    this.email=localStorage.getItem("uEmail");
    if(this.categoryadded==false){
      this.incomes[0].category=this.incomes[0].category.trim();
      if(this.incomes[0].category!=""){
        this.api.checkCategoryAvailable(this.incomes[0].category).subscribe((data:any)=>{
          if(data.msg=="Available"){
            window.alert("New Category Found");   
          // this.api.insertNewCategory(this.incomes[0].category).subscribe((data:any)=>{
          //    console.log(data.msg);
          //    window.alert(data.msg);          
          //   });
            this.options.push(this.incomes[0].category);
          }
          else{       
            //window.alert("Old category");
          }  
        }); 
      }
    }

    this.api.getIncomeID(this.email).subscribe((data:any)=>{
      this.incomeid=parseInt(data.len);      
      this.incomes.forEach(income => {
        income.id=this.incomeid;
        this.incomeid++;
      });
      this.incomeid=0;
      this.api.updateIncomes(this.email,this.incomes).subscribe((data:any)=>{
        if(data.msg=="Updated"){
          window.alert("Saved Successfully");
        }
        else{
          window.alert("Please Try after some time");
        }  
      });
    });
    this.router.navigate(['/expence']);
  }
  addNewIncomeField(i: number){
    this.categoryadded=true;
    this.incomes.push({
      id: '',
      category: '',    
      description: '',
      amount: '',
      date: ''    
    });
    //Add category to database
    
    this.incomes[i].category=this.incomes[i].category.trim();
    if(this.incomes[i].category!=""){
      this.api.checkCategoryAvailable(this.incomes[i].category).subscribe((data:any)=>{
        if(data.msg=="Available"){
          window.alert("New Category Found");   
        // this.api.insertNewCategory(this.incomes[i].category).subscribe((data:any)=>{
        //    console.log(data.msg);
        //    window.alert(data.msg);          
        //   });
          this.options.push(this.incomes[i].category);
        }
        else{       
          //window.alert("Old category");
        }  
      }); 
    }
    
  }


  removeIncomeField(i: number) {
    this.incomes.splice(i, 1);
  }
  setasCustomer(){   
    this.sharedapi.setCustomerOrSupplier("Customer");
  }
  setasSupplier(){   
    this.sharedapi.setCustomerOrSupplier("Supplier");
  }

}
