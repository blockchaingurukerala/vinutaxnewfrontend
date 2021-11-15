import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {  GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenceComponent } from './expence/expence.component';
import { ReportComponent } from './report/report.component';
import { SummaryComponent } from './summary/summary.component';
import {ChartsModule} from 'ng2-charts';
import { AllaccountsComponent } from './allaccounts/allaccounts.component';
import { DisplayFromHMRCComponent } from './display-from-hmrc/display-from-hmrc.component';
import { CustomerInvoiceComponent } from './customer-invoice/customer-invoice.component';
import { SupplierInvoiceComponent } from './supplier-invoice/supplier-invoice.component';
import { DisplayAllCustomerInvoiceComponent } from './display-all-customer-invoice/display-all-customer-invoice.component';
import { DisplayAllSupplierInvoiceComponent } from './display-all-supplier-invoice/display-all-supplier-invoice.component';
import { DisplayCustomerDraftInvoiceComponent } from './display-customer-draft-invoice/display-customer-draft-invoice.component';
import { CustomerawaitingpaymentComponent } from './customerawaitingpayment/customerawaitingpayment.component';
import { CustomerpaidComponent } from './customerpaid/customerpaid.component';
import { EditinvoicecustomerComponent } from './editinvoicecustomer/editinvoicecustomer.component';
import { CustomerinvoiceintermediatedisplayComponent } from './customerinvoiceintermediatedisplay/customerinvoiceintermediatedisplay.component';
import { IndividualcustomerComponent } from './individualcustomer/individualcustomer.component';
import { DisplayallcustomersComponent } from './displayallcustomers/displayallcustomers.component';
import { DisplayallsuppliersComponent } from './displayallsuppliers/displayallsuppliers.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TransactionComponent } from './transaction/transaction.component';
import { JournalComponent } from './journal/journal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    DashboardComponent,    
    ExpenceComponent,
    ReportComponent,
    SummaryComponent,
    AllaccountsComponent,
    DisplayFromHMRCComponent,
    CustomerInvoiceComponent,
    SupplierInvoiceComponent,
    DisplayAllCustomerInvoiceComponent,
    DisplayAllSupplierInvoiceComponent,
    DisplayCustomerDraftInvoiceComponent,
    CustomerawaitingpaymentComponent,
    CustomerpaidComponent,
    EditinvoicecustomerComponent,
    CustomerinvoiceintermediatedisplayComponent,
    IndividualcustomerComponent,
    DisplayallcustomersComponent,
    DisplayallsuppliersComponent,
    TransactionComponent,
    JournalComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    Ng2SearchPipeModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '806724690189-r3aa052o5oqog6g6lmv54slq1c9riadj.apps.googleusercontent.com')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
