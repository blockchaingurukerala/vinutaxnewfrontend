import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-displayjournals',
  templateUrl: './displayjournals.component.html',
  styleUrls: ['./displayjournals.component.css']
})
export class DisplayjournalsComponent implements OnInit {

  whose=localStorage.getItem("uEmail");
  totalamout=0;
  journaldetails=[];

  constructor(private router:Router,private api:ApiService,private sharedapi:SharedService) {
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
    else{
      this.whose=localStorage.getItem("uEmail");
      this.api.getAllJournals(this.whose).subscribe((data:any)=>{        
        for(var j=0;j<data.length;j++){
          this.totalamout=0;          
          for(var i=0;i<data[j].journals.length;i++){   
                this.totalamout=Number(this.totalamout)+Number(data[j].journals[i].debitgbp);
          }
          this.journaldetails.push({
            "id":data[j]._id,
            "jno":data[j].journalid,
            "narration":data[j].narration,          
            "date":data[j].date,
            "totalamout":this.totalamout});
            this.totalamout=0;
        }        
      })
    }
         
   }

  ngOnInit(): void {
  }
  displayNewJournal(){
    this.router.navigate(['/journal']);

  }
  editordeleteJournal(id){
   // window.alert(status)
    // this.sharedapi.setidforcustomeredit(i,status);
    //this.router.navigate(['\editcustomerinvoice']);
     this.router.navigate(['/intermediatedisplay']);    
  }
  customerclicked(i){   
    this.sharedapi.setSelectedCustomerID(i);
  }
  setasCustomer(){   
    this.sharedapi.setCustomerOrSupplier("Customer");
  }
  setasSupplier(){   
    this.sharedapi.setCustomerOrSupplier("Supplier");
  }

}
