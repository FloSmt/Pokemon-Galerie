import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/overview-page/overview.page').then(m => m.OverviewPage)
  },
  {
    path: 'pokemon/:name',
    loadComponent: () => import('../pages/detail-page/detail.page').then(m => m.DetailPage)
  },
  {
    path: '**',
    loadComponent: () => import('../pages/overview-page/overview.page').then(m => m.OverviewPage)
  }
];
