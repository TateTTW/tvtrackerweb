import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { DashboardLayoutModule } from "@syncfusion/ej2-angular-layouts";
import { MainPageComponent } from './main-page/main-page.component';
import { BrowsePageComponent } from './browse-page/browse-page.component';
import { SavedPageComponent } from './saved-page/saved-page.component';
import {TextBoxModule} from "@syncfusion/ej2-angular-inputs";
import {ButtonModule, RadioButtonModule} from "@syncfusion/ej2-angular-buttons";

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    BrowsePageComponent,
    SavedPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TabModule,
    DashboardLayoutModule,
    TextBoxModule,
    ButtonModule,
    RadioButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
