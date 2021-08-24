import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from '../shared.service';

@Component({
  selector: 'app-customerawaitingpayment',
  templateUrl: './customerawaitingpayment.component.html',
  styleUrls: ['./customerawaitingpayment.component.css']
})
export class CustomerawaitingpaymentComponent implements OnInit {

  constructor(private router:Router,private sharedapi:SharedService) { }

  ngOnInit(): void {
  }
  displayNewinvoice(){
    this.router.navigate(['\customerinvoice']);
  }
  setasCustomer(){   
    this.sharedapi.setCustomerOrSupplier("Customer");
  }
  setasSupplier(){   
    this.sharedapi.setCustomerOrSupplier("Supplier");
  }
}
