import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';
import { Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {ToastrService} from 'ngx-toastr';
import {AuthApiService} from 'auth-api-elev-onl-exa';
import {setToken} from '../../../../Store/Actions/token.action';
import {ValidationMessagesComponent} from '../validation-messages/validation-messages.component';
import {SocialComponent} from '../../../Layouts/Components/auth-layout/social/social.component';
import {AuthBtnComponent} from '../auth-btn/auth-btn.component';

@Component({
  selector: 'app-sign-up',
  imports: [
    RouterLink,
    SocialComponent,
    ReactiveFormsModule,
    NgClass,
    ValidationMessagesComponent,
    AuthBtnComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit, OnDestroy {

  private authSubscription!: Subscription;
  private readonly store: Store = inject (Store);
  private readonly router: Router = inject (Router);
  private readonly formBuilder: FormBuilder = inject (FormBuilder);
  private readonly toastrService: ToastrService = inject(ToastrService);
  private readonly authApiService: AuthApiService = inject( AuthApiService );

  btnTitle: string = '';
  username: string = '';
  isLoading: boolean = false;
  signUpFormGroup!: FormGroup;
  emailFromInput: string = '';
  passwordFromInput: string = '';
  isShowPassword: boolean = false;
  isShow_rePassword: boolean = false;

  constructor() {
    this.btnTitle = 'Create Account';
  }

  ngOnInit(): void {
    this.signUpForm();
  }

  signUpForm(): void {
    this.signUpFormGroup = this.formBuilder.group({
      firstName: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      lastName: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      username: new FormControl (''),
      phone: new FormControl ('', [Validators.required]).value?.toString(),
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl ('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      rePassword: new FormControl ('', [Validators.required])
    }, {validators: this.passwordMatch});
  };

  passwordMatch(control: AbstractControl): {mismatch: boolean} | null {
    const _password: string = control.get('password')?.value;
    const _rePassword: string  = control.get('rePassword')?.value;

    if(_password === _rePassword){
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

    this.injectUserNameToForm();
    this.setEmailAndPasswordToInput();

    this.authSubscription = this.authApiService.signUp(this.signUpFormGroup.value).subscribe({
      next: (res: any): void => {
        this.toastrService.success(res.message, '', {
          progressBar: true,
          timeOut: 2000
        });

        this.store.dispatch(setToken({value: res.token}));
        this.signUpFormGroup.reset();
        this.goToSignin();

      }, error: (err: any): void => {
        this.toastrService.error(err.message, '', {
          progressBar: true,
          timeOut: 2000
        });
      }
    });

    this.isLoading = false;
  }

  showPassword(): void{
    this.isShowPassword = !this.isShowPassword;
  }

  show_rePassword(): void{
    this.isShow_rePassword = !this.isShow_rePassword;
  }

  injectUserNameToForm(): void{
    this.username = this.signUpFormGroup.get('firstName')?.value + this.signUpFormGroup.get('lastName')?.value;
    this.signUpFormGroup.get('username')?.setValue(this.username);
  }

  setEmailAndPasswordToInput(): void {
    this.emailFromInput = this.signUpFormGroup.get('email')?.value;
    this.passwordFromInput = this.signUpFormGroup.get('password')?.value;

    this.authApiService.emailSignal.set(this.emailFromInput);
    this.authApiService.passwordSignal.set(this.passwordFromInput);
  }

  goToSignin (): void {
    this.router.navigate(['/signin']);
  }

  ngOnDestroy(){
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
  }
}
