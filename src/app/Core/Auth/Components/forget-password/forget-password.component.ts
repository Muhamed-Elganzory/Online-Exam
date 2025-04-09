import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AuthApiService} from 'auth-api-elev-onl-exa';
import {SocialComponent} from '../../../Layouts/Components/auth-layout/Components/social/social.component';
import {ValidationMessagesComponent} from '../validation-messages/validation-messages.component';
import {AuthBtnComponent} from '../auth-btn/auth-btn.component';
import {SecureAccessService} from '../secure-access-component/Service/secure-access.service';

@Component({
  selector: 'app-forget-password',
  imports: [
    SocialComponent,
    ReactiveFormsModule,
    NgClass,
    ValidationMessagesComponent,
    AuthBtnComponent
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {

  private readonly secureAccessService: SecureAccessService = inject (SecureAccessService);
  private readonly formBuilder: FormBuilder = inject (FormBuilder);
  private readonly authApiService: AuthApiService = inject (AuthApiService);
  private readonly router: Router = inject (Router);
  private readonly toastrService: ToastrService = inject(ToastrService)
  private authSubscription!: Subscription;

  btnTitle: string = '';
  emailValue: string = '';
  isLoading: boolean = false;
  forgetFormGroup!: FormGroup;

  constructor() {
    this.btnTitle = 'Sign in';
  }

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

    this.emailValue = this.forgetFormGroup.get('email')?.value;

    this.authSubscription = this.authApiService.forgetPassword(this.forgetFormGroup.value).subscribe({
      next: (res: any) => {
        this.toastrService.success(res.info, res.message, {
          progressBar: true,
          timeOut: 2000
        });

        this.authApiService.emailSignal.set(this.emailValue);
        this.secureAccessService.signal.set('verify');
        this.router.navigate(['/secure-access'])

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

    this.setEmailToInput();
    this.forgetFormGroup.reset();
    this.router.navigateByUrl('signin');
  }

  setEmailToInput(): void{
    this.emailValue = this.forgetFormGroup.get('email')?.value;
    this.authApiService.emailSignal.set(this.emailValue);
  }

  ngOnDestroy(): void {
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
  }
}
