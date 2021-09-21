import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { MessagesComponent } from './messages/messages.component';

import { AppRoutingModule } from './app-routing.module';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NotesComponent } from './notes/notes.component';
import { NoteSearchComponent } from './note-search/note-search.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )

  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    NotesComponent,
    NoteDetailComponent,
    MessagesComponent,
    NoteSearchComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
