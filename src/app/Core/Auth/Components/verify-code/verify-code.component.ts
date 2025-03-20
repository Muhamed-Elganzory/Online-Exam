import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgClass} from '@angular/common';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AuthApiService} from 'auth-api-elev-onl-exa';
import {SocialComponent} from "../../../Layouts/Components/auth-layout/social/social.component";
import {ValidationMessagesComponent} from '../validation-messages/validation-messages.component';

@Component({
  selector: 'app-verify-code',
  imports: [
    SocialComponent,
    ReactiveFormsModule,
    ValidationMessagesComponent,
    NgClass
  ],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css'
})
export class VerifyCodeComponent implements OnInit, OnDestroy {

  private readonly formBuilder: FormBuilder = inject (FormBuilder);
  private readonly authApiService: AuthApiService = inject (AuthApiService);
  private readonly router: Router = inject (Router);
  private readonly toastrService: ToastrService = inject(ToastrService)
  private authSubscription!: Subscription;

  verifyFormGroup!: FormGroup;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.verifyForm();
  }

  verifyForm(): void {
    this.verifyFormGroup = this.formBuilder.group({
      resetCode: new FormControl('', [Validators.required])
    });
  }

  verify(): void {
    this.isLoading = true;

    if(this.verifyFormGroup.invalid){
      this.verifyFormGroup.markAllAsTouched();
    }

    this.authSubscription = this.authApiService.resetCode(this.verifyFormGroup.value).subscribe({
      next: (res: any): void => {
        this.toastrService.success('Success', '', {
          progressBar: true,
          timeOut: 2000
        });

        this.router.navigate(['/set-password']);

      }, error: (err: any): void => {
        this.toastrService.error('Http failure response', '', {
          progressBar: true,
          timeOut: 2000
        });
      }
    });

    this.isLoading = false;
    this.verifyFormGroup.reset();
  }

  resend(): void {
    const payLoad = {
      email: this.authApiService.emailSignal()
    }

    this.authApiService.forgetPassword(payLoad).subscribe({
      next: (res: any): void => {
        this.toastrService.success(res.message, res.info + payLoad.email, {
          progressBar: true,
          timeOut: 2000
        });
      },
      error: (err: any): void => {
        this.toastrService.error(err.message, '', {
          progressBar: true,
          timeOut: 2000
        });
      }
    })
  }

  ngOnDestroy(): void {
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
  }
}
