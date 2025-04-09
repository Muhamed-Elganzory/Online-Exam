import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {WelcomeComponent} from './Components/welcome/welcome.component';
import {AuthTabsComponent} from './Components/auth-tabs/auth-tabs.component';

@Component({
  selector: 'app-auth-layout',
  imports: [
    WelcomeComponent,
    RouterOutlet,
    AuthTabsComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
