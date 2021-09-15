import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Router} from '@angular/router';
import {SharedService} from '../shared.service';
@Component({
  selector: 'app-unallocated-matching',
  templateUrl: './unallocated-matching.component.html',
  styleUrls: ['./unallocated-matching.component.css']
})
export class UnallocatedMatchingComponent implements OnInit {

  constructor(private api:ApiService,private router:Router,private sharedservice:SharedService) { 
    // var id=this.sharedservice.getidforcustomeredit();
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

}
