import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-search-icon',
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './search-icon.component.html',
  styleUrl: './search-icon.component.css'
})
export class SearchIconComponent {

  @Output() search: EventEmitter <string> = new EventEmitter <string> ();

  isOpen: boolean = false;
  searchControl: FormControl <string> = new FormControl();

  onSearch (): void {
    const searchValue: string = this.searchControl.value;
    this.search.emit(searchValue);
  }

  openInput(): void{
    this.isOpen = !this.isOpen;
  }
}
