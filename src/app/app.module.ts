import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BtcComponent } from './components/btc/btc.component';
import {DataProviderService} from './services/dataProvider.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SymbolPairButtonComponent } from './components/partials/symbolPairButton/symbolPairButton.component';


@NgModule({
  declarations: [
    AppComponent,
    BtcComponent,
    SymbolPairButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    NgChartsModule,
    NgbModule

  ],
  providers: [DataProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
