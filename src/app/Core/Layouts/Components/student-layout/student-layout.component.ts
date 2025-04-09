import { Component } from '@angular/core';
import {SidebarComponent} from './Components/sidebar/sidebar.component';
import {SearchComponent} from './Components/search/search.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-student-layout',
  imports: [
    SidebarComponent,
    SearchComponent,
    RouterOutlet,
  ],
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.css'
})
export class StudentLayoutComponent {

}
