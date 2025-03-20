import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./Core/Layouts/Components/auth-layout/auth/auth.component').then(c => c.AuthComponent),
    children:[
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signin', loadComponent: () => import('./Core/Auth/Components/sign-in/sign-in.component').then(c => c.SignInComponent), title: 'Sign In'},
      { path: 'signup', loadComponent: () => import('./Core/Auth/Components/sign-up/sign-up.component').then(c => c.SignUpComponent), title: 'Sign Up'},
      { path: 'forget-password', loadComponent: () => import('./Core/Auth/Components/forget-password/forget-password.component').then(c => c.ForgetPasswordComponent), title: 'Forgot Password' },
      { path: 'verify-code', loadComponent: () => import('./Core/Auth/Components/verify-code/verify-code.component').then(c => c.VerifyCodeComponent), title: 'Verify Code' },
      { path: 'set-password', title: 'Set Password', loadComponent: () => import('./Core/Auth/Components/set-password/set-password.component').then(c => c.SetPasswordComponent) },
    ]
  },
];

// ethical.centipede.iwbl@letterhaven.net
// Pa$$w0rd!
