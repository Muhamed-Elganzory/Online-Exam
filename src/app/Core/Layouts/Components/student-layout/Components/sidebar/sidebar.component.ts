import {Component, inject} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  private readonly cookieService: CookieService = inject (CookieService);

  logOut(): void {
    if(this.cookieService.get('TOKEN')) {
      this.cookieService.delete('TOKEN');
    }
  }
}
