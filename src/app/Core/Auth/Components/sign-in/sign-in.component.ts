import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {SocialComponent} from '../../../Layouts/Components/auth-layout/social/social.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {ValidationMessagesComponent} from '../validation-messages/validation-messages.component';
import { AuthApiService } from 'auth-api-elev-onl-exa';
import {CookieService} from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import {Subscription} from 'rxjs';

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

  private readonly formBuilder: FormBuilder = inject (FormBuilder);
  private readonly authApiService: AuthApiService = inject( AuthApiService);
  private readonly cookieService: CookieService = inject (CookieService);
  private readonly toastrService: ToastrService = inject(ToastrService)
  private authSubscription!: Subscription;

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
    if (this.authApiService.resetEmail()){
      const emailValue: string = this.authApiService.resetEmail();
      this.signInFormGroup.get('email')?.setValue(emailValue);
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
        this.cookieService.set('token', res.token);
      }, error: (err: any): void => {
        this.toastrService.error(err.message, '', {
          progressBar: true,
          timeOut: 2000
        });
      }
    });
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
