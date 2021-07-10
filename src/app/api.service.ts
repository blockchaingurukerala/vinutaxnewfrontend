import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { HttpClient ,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   headers = new HttpHeaders();
  constructor(private http:HttpClient) { 
    this.headers=new HttpHeaders();
  }
  findHash(str:string){   
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, 10);
  }
  insertNewUser(userfullname:string,useremail:string,password:string){      
    return this.http.post("http://localhost:3000/insert",{"userFullName":userfullname,"userEmailId":useremail,"userPassword":this.findHash(password)})
    //return this.http.post("/api/insert",{"userFullName":userfullname,"userEmailId":useremail,"userPassword":this.findHash(password)})
  }
  checkUserNameAvailable(userEmail:String){
    return this.http.post("http://localhost:3000/checkAvailability",{"userEmailId":userEmail}) ;     
   // return this.http.post("http://localhost:3000/checkAvailability",{"userEmailId":userEmail}) ;  
  }
  authenticateUser(userEmail:string,password:string){    
    return this.http.post("http://localhost:3000/authenticate",{"userEmailId":userEmail,"password":this.findHash(password)}) ; 
  }
  checkCategoryAvailable(category:String){
    //return this.http.post("https://exambackend.herokuapp.com/insert",{"user":user})     
    return this.http.post("http://localhost:3000/checkAvailabilityCategory",{"category":category}) ;  
  }
  checkExpenceCategoryAvailable(category:String){
    //return this.http.post("https://exambackend.herokuapp.com/insert",{"user":user})     
    return this.http.post("http://localhost:3000/checkAvailabilityExpenceCategory",{"category":category}) ;  
  }
  insertNewCategory(category:string){      
    return this.http.post("http://localhost:3000/insertNewCategory",{"category":category});
  }
  insertNewExpenceCategory(category:string){      
    return this.http.post("http://localhost:3000/insertNewExpenceCategory",{"category":category});
  }
  getCategories(){
    return this.http.get("http://localhost:3000/getCategories");
  }
  getExpenceCategories(){
    return this.http.get("http://localhost:3000/getExpenceCategories");
  }
  updateIncomes(email:string,incomes:any[]){
     return this.http.post("http://localhost:3000/updateIncomes",{"email":email,"incomes":incomes});
  }
  updateExpences(email:string,expences:any[]){
    return this.http.post("http://localhost:3000/updateExpences",{"email":email,"expences":expences});
 }
 getAllIncomeAndExpences(email:string){
  return this.http.post("http://localhost:3000/getIncomesExpence",{"email":email});
 }
//  tokemcall(){  
//    return  this.http.get("http://localhost:8080/unrestrictedCall");
//   // this.headers.set("Access-Control-Allow-Origin", "*");
//   // this.headers.append("Accept","application/vnd.hmrc.1.0+json");  
//   // return this.http.get("https://test-api.service.hmrc.gov.uk/hello/world",{headers: this.headers});
//  }
 hmrcCall(){   
      return this.http.get("http://localhost:3000/userCall"); 
 }
 checkHmrcDataUploaded(email:string,year:string,quarter:string){
  return this.http.post("http://localhost:3000/checkHmrcUploaded",{"userEmailId":email,"year":year,"quarter":quarter});
}
hmrcDataUploaded(email:string,year:string,quarter:string){
  return this.http.post("http://localhost:3000/hmrcUploaded",{"userEmailId":email,"year":year,"quarter":quarter});
}
getIncomeID(email:string){
  return this.http.post("http://localhost:3000/getIncomeID",{"email":email});
}
getExpenceID(email:string){
  return this.http.post("http://localhost:3000/getExpenceID",{"email":email});
}
modifyIncomes(email:string,originalincomes:any[],modifiedincomes:any[]){
  return this.http.post("http://localhost:3000/modifyIncomes",{"email":email,"originalincomes":originalincomes,"modifiedincomes":modifiedincomes});
}
modifyExpences(email:string,originalexpences:any[],modifiedexpences:any[]){
  return this.http.post("http://localhost:3000/modifyExpences",{"email":email,"originalexpences":originalexpences,"modifiedexpences":modifiedexpences});
}
}
