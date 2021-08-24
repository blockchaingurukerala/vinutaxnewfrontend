import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-customerpaid',
  templateUrl: './customerpaid.component.html',
  styleUrls: ['./customerpaid.component.css']
})
export class CustomerpaidComponent implements OnInit {

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
