import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormDiagnosesComponent } from './pages/form-diagnoses/form-diagnoses.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
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
    path: 'about',
    loadComponent: async () =>
      (await import('./pages/about/about.component')).AboutComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
