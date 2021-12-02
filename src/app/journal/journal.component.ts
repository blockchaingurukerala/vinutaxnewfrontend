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
    id:'',
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
  jno="";
  date="";
  narration="";
  tax="";
  sumdebitgbp=0;
  sumcreditgbp=0;
  postdisabe=true;
  whose=localStorage.getItem("uEmail");
  constructor(private api:ApiService,private router:Router,private sharedservice:SharedService) { 
    
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
    else{
      this.whose=localStorage.getItem("uEmail");
      this.api.createNextJournalNumber(this.email).subscribe((data:any)=>{
          this.jno=data.msg;         
      })
    }
  
  }
  onPressKeyboarddebitgbp(val,j){    
    this.sumdebitgbp=0;
    // this.journalvalues.forEach(element => {
    //   this.sumdebitgbp=this.sumdebitgbp+Number(element.debitgbp);
    // });  
    for(var i=0;i<this.journalvalues.length;i++)  {
      this.sumdebitgbp=this.sumdebitgbp+Number(this.journalvalues[i].debitgbp);
    }
    if(this.sumdebitgbp==this.sumcreditgbp){
      this.postdisabe=false;
    }
    else{
      this.postdisabe=true;
    }
  }
  onPressKeyboardcredittgbp(val,j){    
    this.sumcreditgbp=0;
    // this.journalvalues.forEach(element => {
    //   this.sumcreditgbp=this.sumcreditgbp+Number(element.debitgbp);
    // });  
    for(var i=0;i<this.journalvalues.length;i++)  {
      this.sumcreditgbp=this.sumcreditgbp+Number(this.journalvalues[i].creditgbp);
    }  
    if(this.sumdebitgbp==this.sumcreditgbp){
      this.postdisabe=false;
    }
    else{
      this.postdisabe=true;
    }
  }

  ngOnInit(): void {
  }
  postJournal(){
    for(var i=0;i<this.journalvalues.length;i++){    
      if((this.journalvalues[i].debitgbp=='')&&(this.journalvalues[i].creditgbp=='')){
        this.journalvalues.splice(i,1);
        i--;
      }
    }
    // console.log(this.narration)
    // console.log(this.date);
    // console.log(this.jno);
    // console.log(this.tax);
    // console.log(this.journalvalues);
    this.api.addNewJournal(this.whose,this.narration,this.date,this.jno,this.tax,this.journalvalues).subscribe((data:any)=>{
      window.alert(data.msg);
      this.router.navigate(['/displayjournals']);
    });
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
