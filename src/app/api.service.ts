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
addCustomerDetils(name:string,email:string,contactno:string,address:string,whose:string){
  return this.http.post("http://localhost:3000/addCustomerDetils",{"name":name,"email":email,"contactno":contactno,"address":address,"whose":whose});
}
       
addCustomerInvoice(date:string,duedate:string,invoiceid:string,reference:string,products:any [],totalamount:number,additionaldetails:string,whose:string,customerid:string){
  return this.http.post("http://localhost:3000/addCustomerInvoice",{"date":date,"duedate":duedate,"invoiceid":invoiceid,"reference":reference,"products":products,"totalamount":totalamount,"additionaldetails":additionaldetails,"whose":whose,"customerid":customerid});
}
addCustomerInvoiceDraft(date:string,duedate:string,invoiceid:string,reference:string,products:any [],totalamount:number,additionaldetails:string,whose:string,customerid:string){
  return this.http.post("http://localhost:3000/addCustomerInvoiceDraft",{"date":date,"duedate":duedate,"invoiceid":invoiceid,"reference":reference,"products":products,"totalamount":totalamount,"additionaldetails":additionaldetails,"whose":whose,"customerid":customerid});
}
createNextCustomerInvoiceNumber(whose:string){
  return this.http.post("http://localhost:3000/createNextCustomerInvoiceNumber",{"whose":whose});
}
getAllCustomers(whose:string){
  return this.http.post("http://localhost:3000/getAllCustomers",{"whose":whose});
}
getAllCustomerInvoioce(whose:string){
  return this.http.post("http://localhost:3000/getAllCustomerInvoioce",{"whose":whose});
}
getAllCustomerDraftInvoioce(whose:string){
  return this.http.post("http://localhost:3000/getAllCustomerDraftInvoioce",{"whose":whose});
}

getCustomerNameFromId(id:string){
  return this.http.post("http://localhost:3000/getCustomerNameFromId",{"id":id});
}
getCustomerInvoioceFromId(id:string){
  return this.http.post("http://localhost:3000/getCustomerInvoioceFromId",{"id":id});
}
getDraftCustomerInvoioceFromId(id:string){
  return this.http.post("http://localhost:3000/getDraftCustomerInvoioceFromId",{"id":id});
}
}
