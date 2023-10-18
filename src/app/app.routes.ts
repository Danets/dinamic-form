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
    path: 'about',
    component: AboutComponent,
  },
];
