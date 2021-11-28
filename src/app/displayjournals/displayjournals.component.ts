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

  

  constructor(private router:Router,private api:ApiService,private sharedapi:SharedService) {
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
         
   }

  ngOnInit(): void {
  }
  displayNewJournal(){
    this.router.navigate(['/journal']);

  }
  editordelete(i,status){
   // window.alert(status)
    this.sharedapi.setidforcustomeredit(i,status);
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
