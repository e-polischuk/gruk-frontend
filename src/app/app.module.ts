import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing }        from './app.routing';

import { CitizenComponent } from './citizen/citizen.component';
import { CommunityComponent } from './community/community.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core'
import { NotFoundComponent } from './not-found/not-found.component';
import { LogupService } from './appservice/logup.service';
import { DialogComponent } from './dialog/dialog.component';
import { MessageComponent } from './message/message.component';
import { StompService } from 'ng2-stomp-service';

@NgModule({
  declarations: [
    AppComponent,
    CitizenComponent,
    CommunityComponent,
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    MapComponent,
    HeaderComponent,
    NotFoundComponent,
    DialogComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC4_vqUuV5u6VKXeQiVxp-SYuP-qZZ_iTw',
      libraries: ["places"]
    })
  ],
  providers: [LogupService, StompService],
  bootstrap: [AppComponent],
  exports: [MapComponent]
})
export class AppModule { }
