import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin-add-categories',
  templateUrl: './admin-add-categories.component.html',
  styleUrls: ['./admin-add-categories.component.css']
})
export class AdminAddCategoriesComponent implements OnInit {
  enteredCategory="";
  categorytitle="";
  displaycategorynames=false;
  addnewcategoryenable=false;
  categorynamefront=[]
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {
  }
  onPressKeyboardCategory(searchValue: string){       
    this.categorynamefront=[];
    var flag=false;
    this.displaycategorynames=true;    
    this.addnewcategoryenable=false;
    this.api.getCategories().subscribe( (data:any)=>{  
    
      
      var len=data.length; 

      var op=0;
      for(var o=0;o<len;o++){  
        this.categorynamefront.push({"titlecategory":data[op].titlecategory,"category":[]});
        for(var q=0;q<data[op].category.length;q++) {
          if((data[op].category[q].whose=="All")){
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
          this.addnewcategoryenable=true;      
      } 
    });    
  }
  addNewCategory(i:number){
    if(!this.categorytitle){
      window.alert("Select Category Title");
      return;
    }
    if(!this.enteredCategory){
      window.alert("Category should not be empty");
      return;
    }    
    this.api.insertNewCategory(this.categorytitle,this.enteredCategory,"All").subscribe((data:any)=>{       
      window.alert(data.msg);   
      this.addnewcategoryenable[i]=false;       
     });
  }
  selectedProductCategory(c,i:number){
    //this.invoice.products[i].category=c;   
    this.enteredCategory=c; 
    this.displaycategorynames=false;     
  }

}
