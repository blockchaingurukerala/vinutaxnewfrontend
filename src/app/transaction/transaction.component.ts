import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Router} from '@angular/router';
import {SharedService} from '../shared.service';
class Payment{
  date: string;
  amount: number;
  description: string;
  inorout:string;
  category:string;
};
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})

export class TransactionComponent implements OnInit {
  displaycategorynames=[];
  addnewcategoryenable=[];
  payments: Payment[] = [];
  constructor(private api:ApiService,private router:Router,private sharedservice:SharedService) { 
    // var id=this.sharedservice.getidforcustomeredit();
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
    this.payments.push(new Payment());
  }
  addPayment(){
    this.payments.push(new Payment());
    this.displaycategorynames.push(false);
    this.addnewcategoryenable.push(false);
  }
  removePayment(i: number) {
    this.payments.splice(i, 1);
    this.displaycategorynames.splice(i, 1);
    this.addnewcategoryenable.splice(i, 1);
  }
  ngOnInit(): void {
  }
  setasCustomer(){   
    this.sharedservice.setCustomerOrSupplier("Customer");
  }
  setasSupplier(){   
    this.sharedservice.setCustomerOrSupplier("Supplier");
  }

}
