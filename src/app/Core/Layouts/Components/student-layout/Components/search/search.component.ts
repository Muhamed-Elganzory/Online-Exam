import {Component, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchSignalService} from '../../Services/search-signal.service';
import {SearchIconComponent} from '../search-icon/search-icon.component';

@Component({
  selector: 'app-search',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SearchIconComponent,
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

  handelSearch(searchValue: string): void{
    this.searchSignalService.searchSignal.set(searchValue);
  }
}
