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
    //return this.http.post("http://localhost:3000/insert",{"userFullName":userfullname,"userEmailId":useremail,"userPassword":this.findHash(password)})
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
//    return  this.http.get("http://localhost:8080/unrestrictedCall");window.alert("Contact Added Successfully..");
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
addSupplierDetils(name:string,email:string,contactno:string,address:string,whose:string){
  return this.http.post("http://localhost:3000/addSupplierDetils",{"name":name,"email":email,"contactno":contactno,"address":address,"whose":whose});
}     
addCustomerInvoice(date:string,duedate:string,invoiceid:string,reference:string,products:any [],totalamount:number,additionaldetails:string,whose:string,customerid:string,customername:string){
 
  return this.http.post("http://localhost:3000/addCustomerInvoice",{"date":date,"duedate":duedate,"invoiceid":invoiceid,"reference":reference,"products":products,"totalamount":totalamount,"additionaldetails":additionaldetails,"whose":whose,"customerid":customerid,"customername":customername});
}
addSupplierInvoice(date:string,duedate:string,invoiceid:string,reference:string,products:any [],totalamount:number,additionaldetails:string,whose:string,customerid:string,customername:string){
  return this.http.post("http://localhost:3000/addSupplierInvoice",{"date":date,"duedate":duedate,"invoiceid":invoiceid,"reference":reference,"products":products,"totalamount":totalamount,"additionaldetails":additionaldetails,"whose":whose,"customerid":customerid,"customername":customername});
}
addCustomerInvoiceDraft(date:string,duedate:string,invoiceid:string,reference:string,products:any [],totalamount:number,additionaldetails:string,whose:string,customerid:string,customername:string){
  return this.http.post("http://localhost:3000/addCustomerInvoiceDraft",{"date":date,"duedate":duedate,"invoiceid":invoiceid,"reference":reference,"products":products,"totalamount":totalamount,"additionaldetails":additionaldetails,"whose":whose,"customerid":customerid,"customername":customername});
}
addSupplierInvoiceDraft(date:string,duedate:string,invoiceid:string,reference:string,products:any [],totalamount:number,additionaldetails:string,whose:string,customerid:string,customername:string){
  return this.http.post("http://localhost:3000/addSupplierInvoiceDraft",{"date":date,"duedate":duedate,"invoiceid":invoiceid,"reference":reference,"products":products,"totalamount":totalamount,"additionaldetails":additionaldetails,"whose":whose,"customerid":customerid,"customername":customername});
}
createNextCustomerInvoiceNumber(whose:string){
  return this.http.post("http://localhost:3000/createNextCustomerInvoiceNumber",{"whose":whose});
}
getAllCustomers(whose:string){
  return this.http.post("http://localhost:3000/getAllCustomers",{"whose":whose});
}
getAllSuppliers(whose:string){
  return this.http.post("http://localhost:3000/getAllSuppliers",{"whose":whose});
}
getAllCustomerInvoioce(whose:string){
  return this.http.post("http://localhost:3000/getAllCustomerInvoioce",{"whose":whose});
}
getAllSupplierInvoioce(whose:string){
  return this.http.post("http://localhost:3000/getAllSupplierInvoioce",{"whose":whose});
}
getAllCustomerDraftInvoioce(whose:string){
  return this.http.post("http://localhost:3000/getAllCustomerDraftInvoioce",{"whose":whose});
}

getAllSupplierDraftInvoioce(whose:string){
  return this.http.post("http://localhost:3000/getAllSupplierDraftInvoioce",{"whose":whose});
}

getCustomerNameFromId(id:string){
  return this.http.post("http://localhost:3000/getCustomerNameFromId",{"id":id});
}

getSupplierNameFromId(id:string){
  return this.http.post("http://localhost:3000/getSupplierNameFromId",{"id":id});
}
getCustomerInvoioceFromId(id:string){
  return this.http.post("http://localhost:3000/getCustomerInvoioceFromId",{"id":id});
}
getSupplierInvoioceFromId(id:string){
  return this.http.post("http://localhost:3000/getSupplierInvoioceFromId",{"id":id});
}
getDraftCustomerInvoioceFromId(id:string){
  return this.http.post("http://localhost:3000/getDraftCustomerInvoioceFromId",{"id":id});
}
getDraftSupplierInvoioceFromId(id:string){
  return this.http.post("http://localhost:3000/getDraftSupplierInvoioceFromId",{"id":id});
}
updteCustomerInvoice(id:string,date:string,duedate:string,invoiceid:string,reference:string,products:any [],totalamount:number,additionaldetails:string){
  return this.http.post("http://localhost:3000/updteCustomerInvoice",{"id":id,"date":date,"duedate":duedate,"invoiceid":invoiceid,"reference":reference,"products":products,"totalamount":totalamount,"additionaldetails":additionaldetails});
}
updteSupplierInvoice(id:string,date:string,duedate:string,invoiceid:string,reference:string,products:any [],totalamount:number,additionaldetails:string){
  return this.http.post("http://localhost:3000/updteSupplierInvoice",{"id":id,"date":date,"duedate":duedate,"invoiceid":invoiceid,"reference":reference,"products":products,"totalamount":totalamount,"additionaldetails":additionaldetails});
}
updteCustomerInvoiceDraft(id:string,date:string,duedate:string,invoiceid:string,reference:string,products:any [],totalamount:number,additionaldetails:string){
  return this.http.post("http://localhost:3000/updteCustomerInvoiceDraft",{"id":id,"date":date,"duedate":duedate,"invoiceid":invoiceid,"reference":reference,"products":products,"totalamount":totalamount,"additionaldetails":additionaldetails});
}
updteSupplierInvoiceDraft(id:string,date:string,duedate:string,invoiceid:string,reference:string,products:any [],totalamount:number,additionaldetails:string){
  return this.http.post("http://localhost:3000/updteSupplierInvoiceDraft",{"id":id,"date":date,"duedate":duedate,"invoiceid":invoiceid,"reference":reference,"products":products,"totalamount":totalamount,"additionaldetails":additionaldetails});
}
deleteCustomerInvoice(id:string){
  return this.http.post("http://localhost:3000/deleteCustomerInvoice",{"id":id});
}
deleteSupplierInvoice(id:string){
  return this.http.post("http://localhost:3000/deleteSupplierInvoice",{"id":id});
}
deleteCustomerInvoiceFromDraft(id:string){
  return this.http.post("http://localhost:3000/deleteCustomerInvoiceFromDraft",{"id":id});
}
deleteSupplierInvoiceFromDraft(id:string){
  return this.http.post("http://localhost:3000/deleteSupplierInvoiceFromDraft",{"id":id});
}
aprovedraftinvoice(id:string){
  return this.http.post("http://localhost:3000/aprovedraftinvoice",{"id":id});
}
aprovedraftinvoiceSupplier(id:string){
  return this.http.post("http://localhost:3000/aprovedraftinvoiceSupplier",{"id":id});
}
getCustomerDetails(id:string){
  return this.http.post("http://localhost:3000/getCustomerDetails",{"id":id});
}
getSupplierDetails(id:string){
  return this.http.post("http://localhost:3000/getSupplierDetails",{"id":id});
}
getAllInvoioceOfACustomer(whose:string,customerid:string){
  return this.http.post("http://localhost:3000/getAllInvoioceOfACustomer",{"whose":whose,"customerid":customerid});
}
getAllInvoioceOfASupplier(whose:string,customerid:string){
  return this.http.post("http://localhost:3000/getAllInvoioceOfASupplier",{"whose":whose,"customerid":customerid});
}
getAllInvoioceOfACustomerDraft(whose:string,customerid:string){
  return this.http.post("http://localhost:3000/getAllInvoioceOfACustomerDraft",{"whose":whose,"customerid":customerid});
}
getAllInvoioceOfASupplierDraft(whose:string,customerid:string){
  return this.http.post("http://localhost:3000/getAllInvoioceOfASupplierDraft",{"whose":whose,"customerid":customerid});
}
updateCustomer(id:string,userFullName:string,userEmailId:string,userContactNo:string,userAddress:string){
  return this.http.post("http://localhost:3000/updateCustomer",{"id":id,"userFullName":userFullName,"userEmailId":userEmailId,"userContactNo":userContactNo,"userAddress":userAddress});
}
updateSupplier(id:string,userFullName:string,userEmailId:string,userContactNo:string,userAddress:string){
  return this.http.post("http://localhost:3000/updateSupplier",{"id":id,"userFullName":userFullName,"userEmailId":userEmailId,"userContactNo":userContactNo,"userAddress":userAddress});
}
deleteCustomer(id:string){
  return this.http.post("http://localhost:3000/deleteCustomer",{"id":id});
}
deleteSupplier(id:string){
  return this.http.post("http://localhost:3000/deleteSupplier",{"id":id});
}
}
