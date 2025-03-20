import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass} from '@angular/common';
import {Subscription} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthApiService } from 'auth-api-elev-onl-exa';
import {SocialComponent} from '../../../Layouts/Components/auth-layout/social/social.component';
import {ValidationMessagesComponent} from '../validation-messages/validation-messages.component';
import {Store} from '@ngrx/store';
import {setToken} from '../../../../Store/Actions/token.action';

@Component({
  selector: 'app-sign-in',
  imports: [
    RouterLink,
    SocialComponent,
    ReactiveFormsModule,
    NgClass,
    ValidationMessagesComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit, OnDestroy {

  private authSubscription!: Subscription;
  private store: Store <any> = inject (Store);
  private readonly formBuilder: FormBuilder = inject (FormBuilder);
  private readonly toastrService: ToastrService = inject (ToastrService);
  private readonly authApiService: AuthApiService = inject ( AuthApiService);

  emailValue: string = '';
  passwordValue: string = '';
  isLoading: boolean = false;
  signInFormGroup!: FormGroup;
  isShowPassword: boolean = false;

  ngOnInit(): void {
    this.loginForm();
    this.checkEmail();
  }

  loginForm(): void {
    this.signInFormGroup = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')])
    })
  }

  checkEmail(): void {
    if (this.authApiService.emailSignal() || this.authApiService.passwordSignal()){
      this.emailValue = this.authApiService.emailSignal();
      this.passwordValue = this.authApiService.passwordSignal();

      this.signInFormGroup.get('email')?.setValue(this.emailValue);
      this.signInFormGroup.get('password')?.setValue(this.passwordValue);
    }
  }

  signIn(): void {
    this.isLoading = true;

    if(this.signInFormGroup.invalid) {
      this.signInFormGroup.markAllAsTouched();
      return;
    }
    this.authSubscription = this.authApiService.sigIn(this.signInFormGroup.value).subscribe({
      next: (res: any) => {
        this.toastrService.success(res.message, '', {
          progressBar: true,
          timeOut: 2000
        });

        this.store.dispatch(setToken({value: res.token}));

      }, error: (err: any): void => {
        this.toastrService.error(err.message, '', {
          progressBar: true,
          timeOut: 2000
        });
      }
    });

    this.isLoading = false;
    this.signInFormGroup.reset();
  }

  showPassword(): void {
    this.isShowPassword = !this.isShowPassword
  }

  ngOnDestroy(): void {
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
  }
}
