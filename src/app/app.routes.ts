import { Routes } from '@angular/router';
import {loggedGuard} from './Core/Guards/logged.guard';
import {generalGuard} from './Core/Guards/general.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./Core/Layouts/Components/auth-layout/auth.component').then(c => c.AuthComponent), canActivate: [loggedGuard],
    children:[
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signin', loadComponent: () => import('./Core/Auth/Components/sign-in/sign-in.component').then(c => c.SignInComponent), title: 'Sign In'},
      { path: 'signup', loadComponent: () => import('./Core/Auth/Components/sign-up/sign-up.component').then(c => c.SignUpComponent), title: 'Sign Up'},
      { path: 'forget-password', loadComponent: () => import('./Core/Auth/Components/forget-password/forget-password.component').then(c => c.ForgetPasswordComponent), title: 'Forget Password' },
      { path: 'secure-access', loadComponent: () => import('./Core/Auth/Components/secure-access-component/secure-access-component.component').then(c => c.SecureAccessComponentComponent)},
    ]
  },
  { path: 'home', loadComponent: () => import('./Core/Layouts/Components/student-layout/student-layout.component').then(c => c.StudentLayoutComponent), canActivate: [generalGuard],
    children:[
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
      { path: 'Dashboard', loadComponent: () => import('./Features/Dashboard/dashboard.component').then(c => c.DashboardComponent), title: 'Dashboard'},
      { path: 'exam-list/:subjectId', loadComponent: () => import('./Features/Exams/Component/exam-list/exam-list.component').then(c => c.ExamListComponent)},
      // { path: 'questions/:examId', loadComponent: () => import('./Features/questions/questions.component').then(c => c.QuestionsComponent)},
      { path: '**', loadComponent: () => import('./Shared/Components/not-found/not-found.component').then(c => c.NotFoundComponent) },
    ]
  },
  { path: '**', loadComponent: () => import('./Shared/Components/not-found/not-found.component').then(c => c.NotFoundComponent) },
];
