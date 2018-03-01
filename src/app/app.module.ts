import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

// => Pages
import { JoinPageComponent } from './pages/join-page/join-page.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';

// => Services
import { ChatService } from './services/chat.service';
import { SocketsService } from './services/sockets.service';
import { DisconnectedComponent } from './pages/disconnected/disconnected.component';

// => Guards
import { RequireHandleGuardService } from './guards/require-handle-guard.service';

const routes: Routes = [
  { path: '', component: JoinPageComponent },
  {
    path: 'room/:id',
    component: ChatPageComponent,
    canActivate: [RequireHandleGuardService]
  },
  { path: 'disconnect', component: DisconnectedComponent },
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
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [ChatService, SocketsService, RequireHandleGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
