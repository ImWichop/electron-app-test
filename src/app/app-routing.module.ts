import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'page-one', pathMatch: 'full'
  },
  {
    path: 'page-one',
    loadComponent: () => import('./components/page-one/page-one.component').then((c) => c.PageOneComponent),
    title: 'Page One'
  },
  {
    path: '**',
    redirectTo: 'page-one'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
