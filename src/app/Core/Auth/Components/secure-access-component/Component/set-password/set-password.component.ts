import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AuthApiService} from 'auth-api-elev-onl-exa';
import {SocialComponent} from "../../../../../Layouts/Components/auth-layout/social/social.component";
import {ValidationMessagesComponent} from '../../../validation-messages/validation-messages.component';
import {AuthBtnComponent} from '../../../auth-btn/auth-btn.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-set-password',
  imports: [
    SocialComponent,
    ReactiveFormsModule,
    ValidationMessagesComponent,
    AuthBtnComponent
  ],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.css'
})
export class SetPasswordComponent implements OnInit, OnDestroy {

  private readonly formBuilder: FormBuilder = inject (FormBuilder);
  private authApiService: AuthApiService = inject (AuthApiService);
  private readonly router: Router = inject (Router);
  private readonly toastrService: ToastrService = inject(ToastrService)
  private authSubscription!: Subscription;

  btnTitle: string = '';
  isLoading: boolean = false;
  isShowPassword: boolean = false;
  isShowConfirmPassword: boolean = false;
  setPasswordFormGroup!: FormGroup;

  constructor() {
    this.btnTitle = 'Sign in';
  }

  ngOnInit() {
    this.setPasswordForm();
  }

  setPasswordForm(): void{
    this.setPasswordFormGroup = this.formBuilder.group({
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, {validators: this.isPasswordMatch});
  }

  isPasswordMatch(control: AbstractControl): {mismatch: boolean}| null{
    const password: string = control.get('password')?.value
    const confirmPassword : string = control.get('confirmPassword')?.value;

    if (password === confirmPassword){
      return null;
    }else {
      return {
        mismatch: true
      }
    }
  }

  login(): void {
    this.isLoading = true;

    if(this.setPasswordFormGroup.invalid) {
      this.setPasswordFormGroup.markAllAsTouched();
      return;
    }

    const payLoad = {
      email: this.authApiService.emailSignal(),
      newPassword: this.setPasswordFormGroup.get('password')?.value
    }
    this.setPasswordToInput();

    this.authSubscription = this.authApiService.resetPassword(payLoad).subscribe({
      next: (res: any) => {
        this.toastrService.success(res.message, '', {
          progressBar: true,
          timeOut: 2000
        });

        this.goToSignin();
      },
      error: (err: any) => {
        this.toastrService.error(err.message, '', {
          progressBar: true,
          timeOut: 2000
        });
      }
    })
    this.isLoading = false;
    this.setPasswordFormGroup.reset();
  }

  showPassword(): void{
    this.isShowPassword = !this.isShowPassword;
  }

  showConfirmPassword(): void{
    this.isShowConfirmPassword = !this.isShowConfirmPassword;
  }

  setPasswordToInput(): void{
    this.authApiService.passwordSignal.set(this.setPasswordFormGroup.get('password')?.value);
    console.log('password', this.setPasswordFormGroup.get('password')?.value);
  }

  goToSignin (): void{
    this.router.navigate(['/signin']);
  }

  ngOnDestroy(): void {
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
  }
}
