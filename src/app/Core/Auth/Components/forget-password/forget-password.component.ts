import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SocialComponent} from '../../../Layouts/Components/auth-layout/social/social.component';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {
  ValidationMessagesComponent
} from '../validation-messages/validation-messages.component';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {AuthApiService} from 'auth-api-elev-onl-exa';

@Component({
  selector: 'app-forget-password',
  imports: [
    SocialComponent,
    ReactiveFormsModule,
    NgClass,
    ValidationMessagesComponent
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {

  private readonly formBuilder: FormBuilder = inject (FormBuilder);
  private readonly authApiService: AuthApiService = inject (AuthApiService);
  private readonly router: Router = inject (Router);
  private readonly toastrService: ToastrService = inject(ToastrService)
  private authSubscription!: Subscription;

  isLoading: boolean = false;
  forgetFormGroup!: FormGroup;

  ngOnInit(): void {
    this.forgetForm();
  }

  forgetForm(): void {
    this.forgetFormGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  forgetPassword(): void {
    if(this.forgetFormGroup.invalid){
      this.forgetFormGroup.markAllAsTouched();
      return;
    }

    const emailValue: string = this.forgetFormGroup.get('email')?.value;

    this.authSubscription = this.authApiService.forgetPassword(this.forgetFormGroup.value).subscribe({
      next: (res: any) => {
        this.toastrService.success(res.info, res.message, {
          progressBar: true,
          timeOut: 2000
        });
        this.authApiService.resetEmail.set(emailValue);
        this.router.navigateByUrl('/verify-code');
      },error: (err: any) => {
        this.toastrService.error(err.message, '', {
          progressBar: true,
          timeOut: 2000
        });
      }
    })
  }

  signIn(): void {
    this.isLoading = true;

    if(this.forgetFormGroup.invalid) {
      this.forgetFormGroup.markAllAsTouched();
      return;
    }

    const emailValue: string = this.forgetFormGroup.get('email')?.value;
    this.authApiService.resetEmail.set(emailValue);

    this.router.navigateByUrl('signin');
    this.forgetFormGroup.reset();
  }

  ngOnDestroy(): void {
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
  }
}
