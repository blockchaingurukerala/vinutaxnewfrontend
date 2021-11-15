import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {

  public journalvalues: any[] = [{
    id: '',
    description: '', 
    account: '',
    taxrate: '',
    region: '' ,
    debitgbp: '' ,
    creditgbp: ''    
  },
  {
    id: '',
    description: '', 
    account: '',
    taxrate: '',
    region: '' ,
    debitgbp: '' ,
    creditgbp: ''    
  },
  {
    id: '',
    description: '', 
    account: '',
    taxrate: '',
    region: '' ,
    debitgbp: '' ,
    creditgbp: ''    
  },
  {
    id: '',
    description: '', 
    account: '',
    taxrate: '',
    region: '' ,
    debitgbp: '' ,
    creditgbp: ''    
  },
  {
    id: '',
    description: '', 
    account: '',
    taxrate: '',
    region: '' ,
    debitgbp: '' ,
    creditgbp: ''    
  }
];
  email=localStorage.getItem("uEmail");

  constructor(private api:ApiService,private router:Router,private sharedservice:SharedService) { 
    
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
  
  }

  ngOnInit(): void {
  }
 
  
  setasCustomer(){   
    this.sharedservice.setCustomerOrSupplier("Customer");
  }
  setasSupplier(){   
    this.sharedservice.setCustomerOrSupplier("Supplier");
  }
  
   customerclicked(i){   
    this.sharedservice.setCustomerOrSupplier("Customer");
     this.sharedservice.setSelectedCustomerID(i);
   }
   supplierclicked(i){   
    this.sharedservice.setCustomerOrSupplier("Supplier");
     this.sharedservice.setSelectedCustomerID(i);
   }
   addNewLine(){
     this.journalvalues.push( {
      id: '',
      description: '', 
      account: '',
      taxrate: '',
      region: '' ,
      debitgbp: '' ,
      creditgbp: ''    
    });
   }
   removeNewLine(i: number) {
    this.journalvalues.splice(i, 1);
  }

}
