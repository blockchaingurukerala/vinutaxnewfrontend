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
import { DisplayCustomerDraftInvoiceComponent } from './display-customer-draft-invoice/display-customer-draft-invoice.component';
import { CustomerawaitingpaymentComponent } from './customerawaitingpayment/customerawaitingpayment.component';
import { CustomerpaidComponent } from './customerpaid/customerpaid.component';
import { DisplayAllSupplierInvoiceComponent } from './display-all-supplier-invoice/display-all-supplier-invoice.component';
import { EditinvoicecustomerComponent } from './editinvoicecustomer/editinvoicecustomer.component';
import { CustomerinvoiceintermediatedisplayComponent } from './customerinvoiceintermediatedisplay/customerinvoiceintermediatedisplay.component';
import { IndividualcustomerComponent } from './individualcustomer/individualcustomer.component';
import { DisplayallcustomersComponent } from './displayallcustomers/displayallcustomers.component';
import { DisplayallsuppliersComponent } from './displayallsuppliers/displayallsuppliers.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UnallocatedMatchingComponent } from './unallocated-matching/unallocated-matching.component';
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
                        {path:'displaycustomerdraftinvoices',component:DisplayCustomerDraftInvoiceComponent},
                        {path:'customerawaitingpayment',component:CustomerawaitingpaymentComponent},
                        {path:'customerpaid',component:CustomerpaidComponent},
                        {path:'displaysupplierinvoices',component:DisplayAllSupplierInvoiceComponent},
                        {path:'editcustomerinvoice',component:EditinvoicecustomerComponent},  
                        {path:'intermediatedisplay',component:CustomerinvoiceintermediatedisplayComponent},   
                        {path:'individualcustomer',component:IndividualcustomerComponent}, 
                        {path:'allcustomers',component:DisplayallcustomersComponent},     
                        {path:'allsuppliers',component:DisplayallsuppliersComponent},  
                        {path:'transactions',component:TransactionComponent}, 
                        {path:'match',component:UnallocatedMatchingComponent}, 
                      ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
