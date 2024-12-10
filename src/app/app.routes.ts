import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormDiagnosesComponent } from './pages/form-diagnoses/form-diagnoses.component';
import { AboutComponent } from './pages/about/about.component';
import { TransactionComponent } from './pages/transaction/transaction.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'transaction',
    loadComponent: () =>
      import('./pages/transaction/transaction.component').then(
        (m) => m.TransactionComponent
      ),
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'diagnoses',
    loadComponent: () =>
      import('./pages/form-diagnoses/form-diagnoses.component').then(
        (m) => m.FormDiagnosesComponent
      ),
  },
  {
    path: 'select',
    loadComponent: async () =>
      (await import('./pages/select-page/select-page.component'))
        .SelectPageComponent,
  },
  {
    path: 'dynamicform',
    loadComponent: () =>
      import(
        './pages/dynamic-form/dynamic-form-page/dynamic-form-page.component'
      ).then((m) => m.DynamicFormPageComponent),
    // loadComponent: async () =>
    //   (
    //     await import(
    //       './pages/dynamic-form/dynamic-form-page/dynamic-form-page.component'
    //     )
    //   ).DynamicFormPageComponent,
  },
  {
    path: 'about',
    loadComponent: async () =>
      (await import('./pages/about/about.component')).AboutComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
