import {Component, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MatProgressBar} from '@angular/material/progress-bar';
import {LoadingService} from './Core/Interceptors/Service/loading.service';
import {loadingSelector} from './Store/Selectors/loading.selector';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatProgressBar,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private readonly loadingService: LoadingService = inject (LoadingService);

  loading$!: Observable <boolean>;

  constructor() {
    this.loading$ = this.loadingService._store.select(loadingSelector)
  }
}
