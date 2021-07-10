import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-display-from-hmrc',
  templateUrl: './display-from-hmrc.component.html',
  styleUrls: ['./display-from-hmrc.component.css']
})
export class DisplayFromHMRCComponent implements OnInit {

  constructor(private router:Router,private activatedRoute: ActivatedRoute) {
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
   }

  ngOnInit(): void {
     // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
     this.activatedRoute.queryParams.subscribe(params => {
     const obj = params['str'];      
      let jsonobj = JSON.parse(obj);
      console.log(jsonobj);
    });

  }

}
