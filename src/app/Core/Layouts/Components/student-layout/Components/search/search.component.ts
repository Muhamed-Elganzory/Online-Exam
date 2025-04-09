import {Component, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchSignalService} from '../../Services/search-signal.service';

@Component({
  selector: 'app-search',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  private searchSignalService: SearchSignalService = inject (SearchSignalService);

  searchFormControl: FormControl= new FormControl('');

  input(): void{
    this.searchSignalService.searchSignal.set(this.searchFormControl.value);
  }

  startQuiz(): void{}
}
