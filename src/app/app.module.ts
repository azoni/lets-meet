
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { ChairComponent } from './chair/chair.component';
import { ChairsComponent } from './chairs/chairs.component';



@NgModule({
    declarations: [
        AppComponent,
        ChairComponent,
        ChairsComponent,
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase, 'fcc-book-trading'),
        AngularFireDatabaseModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }