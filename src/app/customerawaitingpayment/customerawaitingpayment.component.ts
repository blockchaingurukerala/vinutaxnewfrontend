import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerawaitingpayment',
  templateUrl: './customerawaitingpayment.component.html',
  styleUrls: ['./customerawaitingpayment.component.css']
})
export class CustomerawaitingpaymentComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  displayNewinvoice(){
    this.router.navigate(['\customerinvoice']);
  }
}
