import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-individualjournal',
  templateUrl: './individualjournal.component.html',
  styleUrls: ['./individualjournal.component.css']
})
export class IndividualjournalComponent implements OnInit {
  jid="";
  jno="";
  date="";
  narration="";
  tax="";
  categorytitle="";
  sumdebitgbp=0;
  sumcreditgbp=0;
  edit=false;
  public journalvalues: any[] =[];
  constructor(private api:ApiService,private router:Router,private sharedservice:SharedService) { 
    
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
    else if(this.sharedservice.selectedjournal){
      this.jid=this.sharedservice.selectedjournal;
      this.sumcreditgbp=0
      this.sumdebitgbp=0
      this.api.getJournalFromID(this.jid).subscribe((data:any)=>{
         console.log(data)    ;
         this.date=data[0].date;
         this.narration=data[0].narration;
         this.jno=data[0].journalid;
         data[0].journals.forEach(element => {
           if(element.debitgbp){
            this.sumdebitgbp=this.sumdebitgbp+Number(element.debitgbp);
           }
           if(element.creditgbp){
            this.sumcreditgbp=this.sumcreditgbp+Number(element.creditgbp);
           }
          this.journalvalues.push(element)
         });
        
      })
    }
    else{
      window.alert("Do not Refresh the page")
      this.router.navigate(['/displayjournals']);
    }  
  }
  deleteJournal(){
    var id=this.sharedservice.selectedjournal;
    this.api.deleteJournal(id).subscribe((data:any)=>{
      window.alert(data.msg)
      this.router.navigate(['/displayjournals']);
    });
  }
  editJournal(){
    var id=this.sharedservice.selectedjournal;
    this.edit=true;
    // this.api.deleteJournal(id).subscribe((data:any)=>{
    //   window.alert(data.msg)
    //   this.router.navigate(['/displayjournals']);
    // });
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

}
