import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';
import {AuthApiService} from 'auth-api-elev-onl-exa';
import {ValidationMessagesComponent} from '../validation-messages/validation-messages.component';
import {SocialComponent} from '../../../Layouts/Components/auth-layout/social/social.component';


@Component({
  selector: 'app-sign-up',
  imports: [
    RouterLink,
    SocialComponent,
    ReactiveFormsModule,
    NgClass,
    ValidationMessagesComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit, OnDestroy {

  private readonly formBuilder: FormBuilder = inject (FormBuilder);
  private readonly authApiService: AuthApiService = inject( AuthApiService );
  private readonly cookieService: CookieService = inject (CookieService);
  private readonly toastrService: ToastrService = inject(ToastrService)
  private authSubscription!: Subscription;

  isLoading: boolean = false;
  signUpFormGroup!: FormGroup;
  isShowPassword: boolean = false;
  isShow_rePassword: boolean = false;
  password: string = '';
  rePassword: string = '';
  username: string = '';

  ngOnInit(): void {
    this.signUpForm();
  }

  signUpForm(): void {
    this.signUpFormGroup = this.formBuilder.group({
      firstName: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      lastName: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      username: new FormControl (''),
      phone: new FormControl ('', [Validators.required]),
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl ('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      rePassword: new FormControl ('', [Validators.required])
    }, {validators: this.passwordMatch});
  };

  passwordMatch(control: AbstractControl): {mismatch: boolean} | null {
    this.password = control.get('password')?.value;
    this.rePassword  = control.get('rePassword')?.value;

    if(this.password === this.rePassword){
      return null;
    } else {
      return {
        mismatch: true
      }
    }
  }

  signUp(): void {
    this.isLoading = true;

    if(this.signUpFormGroup.invalid){
      this.signUpFormGroup.markAllAsTouched();
      return;
    }

    this.username = this.signUpFormGroup.get('firstName')?.value + this.signUpFormGroup.get('lastName')?.value;
    this.signUpFormGroup.get('username')?.setValue(this.username)

    this.authSubscription = this.authApiService.signUp(this.signUpFormGroup.value).subscribe({
      next: (res: any) => {
        this.toastrService.success(res.message, '', {
          progressBar: true,
          timeOut: 2000
        });

        this.cookieService.set('token', res.token);

      }, error: (err: any) => {
        this.toastrService.error(err.message, '', {
          progressBar: true,
          timeOut: 2000
        });
      }
    });
    this.signUpFormGroup.reset();
    this.isLoading = false;
  }

  showPassword(): void{
    this.isShowPassword = !this.isShowPassword;
  }

  show_rePassword(): void{
    this.isShow_rePassword = !this.isShow_rePassword;
  }

  ngOnDestroy(){
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
  }
}
