import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import {DashboardComponent} from './dashboard/dashboard.component'
import {ExpenceComponent} from './expence/expence.component'
import { ReportComponent } from './report/report.component';
import {SummaryComponent} from './summary/summary.component';
import { AllaccountsComponent } from './allaccounts/allaccounts.component';
import { DisplayFromHMRCComponent } from './display-from-hmrc/display-from-hmrc.component';
import { CustomerInvoiceComponent } from './customer-invoice/customer-invoice.component';
import { SupplierInvoiceComponent } from './supplier-invoice/supplier-invoice.component';
import { DisplayAllCustomerInvoiceComponent } from './display-all-customer-invoice/display-all-customer-invoice.component';
import { DisplayAllSupplierInvoiceComponent } from './display-all-supplier-invoice/display-all-supplier-invoice.component';


const routes: Routes = [{path:'login',component:LoginComponent},
                        {path:'home',component:HomeComponent},
                        {path:'signup',component:SignupComponent},
                        {path:'dashboard',component:DashboardComponent},                       
                        {path:'expence',component:ExpenceComponent},
                        {path:'report',component:ReportComponent},                     
                         {path:'',component:LoginComponent},
                        {path:'summary',component:SummaryComponent},
                        {path:'allaccount',component:AllaccountsComponent},
                        {path:'displayfromhmrc',component:DisplayFromHMRCComponent},
                        {path:'customerinvoice',component:CustomerInvoiceComponent},
                        {path:'supplierinvoice',component:SupplierInvoiceComponent},
                        {path:'displaycustomerinvoices',component:DisplayAllCustomerInvoiceComponent},
                        {path:'displaysupplierinvoices',component:DisplayAllSupplierInvoiceComponent}
                        
                      ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
