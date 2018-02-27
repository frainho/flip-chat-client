import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

// => Pages
import { JoinPageComponent } from './pages/join-page/join-page.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';

// => Services
import { ChatService } from './services/chat.service';


@NgModule({
  declarations: [
    AppComponent,
    JoinPageComponent,
    ChatPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
