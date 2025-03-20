import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AuthApiService} from 'auth-api-elev-onl-exa';
import {SocialComponent} from "../../../Layouts/Components/auth-layout/social/social.component";
import {ValidationMessagesComponent} from '../validation-messages/validation-messages.component';

@Component({
  selector: 'app-set-password',
  imports: [
    SocialComponent,
    ReactiveFormsModule,
    NgClass,
    ValidationMessagesComponent
  ],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.css'
})
export class SetPasswordComponent implements OnInit, OnDestroy {

  private readonly formBuilder: FormBuilder = inject (FormBuilder);
  private authApiService: AuthApiService = inject (AuthApiService);
  // private readonly router: Router = inject (Router);
  private readonly toastrService: ToastrService = inject(ToastrService)
  private authSubscription!: Subscription;

  isLoading: boolean = false;
  isShowPassword: boolean = false;
  isShowConfirmPassword: boolean = false;
  setPasswordFormGroup!: FormGroup;

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

  checkEmail(): void {
    if (this.authApiService.resetEmail()){
      const emailValue: string = this.authApiService.resetEmail();
      this.setPasswordFormGroup.get('email')?.setValue(emailValue);
    }
  }

  login(): void {
    this.isLoading = true;

    if(this.setPasswordFormGroup.invalid) {
      this.setPasswordFormGroup.markAllAsTouched();
      return;
    }

    const payLoad = {
      email: this.authApiService.resetEmail(),
      newPassword: this.setPasswordFormGroup.get('password')?.value
    }

    this.authSubscription = this.authApiService.resetPassword(payLoad).subscribe({
      next: (res: any) => {
        this.toastrService.success(res.message, '', {
          progressBar: true,
          timeOut: 2000
        });
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

  ngOnDestroy(): void {
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
  }

}
