import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-auth-tabs',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './auth-tabs.component.html',
  styleUrl: './auth-tabs.component.css'
})
export class AuthTabsComponent {
  _isDropdownOpen: boolean = false;

  isDropDownOpen(): void {
    this._isDropdownOpen = !this._isDropdownOpen;
  }
}
