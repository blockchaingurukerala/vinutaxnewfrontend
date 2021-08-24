import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { SharedService } from '../shared.service';
import {ApiService} from '../api.service'

@Component({
  selector: 'app-expence',
  templateUrl: './expence.component.html',
  styleUrls: ['./expence.component.css']
})
export class ExpenceComponent implements OnInit {
  public expences: any[] = [{
    id: '',
    category: '', 
    description: '',
    amount: '',
    date: ''    
  }];
  options = [];  
  selectedUser: any; 
  email="";
  categoryadded=false;
  expenceid=0;
  constructor(private router:Router,private api:ApiService,private sharedapi:SharedService) {
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
    this.api.getExpenceCategories().subscribe((data:any)=>{
      console.log(data);
      // data.forEach(myFunction);
      // function myFunction(value) {
      //  this.options.push(value.category);
      // }
      data.forEach(element => {
        this.options.push(element.category);
      });

    }); 
   }

  ngOnInit(): void {
  }
  updateExpence(){
    //window.alert("Saved Successfully");
    this.email=localStorage.getItem("uEmail");
    if(this.categoryadded==false){
      
      this.expences[0].category=this.expences[0].category.trim();
      if(this.expences[0].category!=""){
        this.api.checkExpenceCategoryAvailable(this.expences[0].category).subscribe((data:any)=>{
          if(data.msg=="Available"){
            window.alert("New Category Found");   
          this.api.insertNewExpenceCategory(this.expences[0].category).subscribe((data:any)=>{
             console.log(data.msg);
             window.alert(data.msg);          
            });
            this.options.push(this.expences[0].category);
          }
          else{       
            //window.alert("Old category");
          }  
        });
      }  
    }
    this.api.getExpenceID(this.email).subscribe((data:any)=>{
      this.expenceid=parseInt(data.len);      
      this.expences.forEach(expence => {
        expence.id=this.expenceid;
        this.expenceid++;
      });
      this.expenceid=0;
      this.api.updateExpences(this.email,this.expences).subscribe((data:any)=>{
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
  addNewExpenceField(i: number){
    this.categoryadded=true;
    this.expences.push({
      id: '',
      category: '', 
      description: '',
      amount: '',
      date: ''   
    });
      //Add category to database
    
      this.expences[i].category=this.expences[i].category.trim();
      if(this.expences[i].category!=""){
        this.api.checkExpenceCategoryAvailable(this.expences[i].category).subscribe((data:any)=>{
          if(data.msg=="Available"){
            window.alert("New Category Found");   
          this.api.insertNewExpenceCategory(this.expences[i].category).subscribe((data:any)=>{
             console.log(data.msg);
             window.alert(data.msg);          
            });
            this.options.push(this.expences[i].category);
          }
          else{       
            //window.alert("Old category");
          }  
        });
      }    
  }
  removeExpenceField(i: number) {
    this.expences.splice(i, 1);
  }
  setasCustomer(){   
    this.sharedapi.setCustomerOrSupplier("Customer");
  }
  setasSupplier(){   
    this.sharedapi.setCustomerOrSupplier("Supplier");
  }
}
