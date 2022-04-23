import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import {DataProviderService} from './services/dataProvider.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SymbolPairButtonComponent } from './components/partials/symbolPairButton/symbolPairButton.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ButtonsDirective } from './directives/cryptoButtonsHost.directive';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    SymbolPairButtonComponent,
    ButtonsDirective, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgChartsModule,
    NgbModule,
    NgxSpinnerModule,
    FormsModule,
    ColorPickerModule,
  ],
  providers: [DataProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
