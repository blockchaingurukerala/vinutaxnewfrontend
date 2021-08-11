import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerpaid',
  templateUrl: './customerpaid.component.html',
  styleUrls: ['./customerpaid.component.css']
})
export class CustomerpaidComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  displayNewinvoice(){
    this.router.navigate(['\customerinvoice']);
  }
}
