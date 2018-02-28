import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

// => Pages
import { JoinPageComponent } from './pages/join-page/join-page.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';

// => Services
import { ChatService } from './services/chat.service';
import { SocketsService } from './services/sockets.service';
import { DisconnectedComponent } from './pages/disconnected/disconnected.component';

const routes: Routes = [
  { path: '', component: JoinPageComponent },
  { path: 'room/:id', component: ChatPageComponent },
  { path: '**', redirectTo: '/' }
];


@NgModule({
  declarations: [
    AppComponent,
    JoinPageComponent,
    ChatPageComponent,
    DisconnectedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ChatService, SocketsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
