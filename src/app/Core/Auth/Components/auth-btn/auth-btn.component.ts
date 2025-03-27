import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-auth-btn',
  imports: [
    NgClass
  ],
  templateUrl: './auth-btn.component.html',
  styleUrl: './auth-btn.component.css'
})
export class AuthBtnComponent {
  @Input() formGroup!: FormGroup;
  @Input() isLoading!: boolean;
  @Input() btnTitle!: string;
}
