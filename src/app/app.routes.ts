import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home',    loadComponent: () => import('./pages/home/home').then(m => m.Home) },
    { path: 'auth',    loadComponent: () => import('./pages/auth/auth').then(m => m.Auth) },
    { path: 'search',  loadComponent: () => import('./pages/search/search').then(m => m.Search), canActivate: [authGuard] },
    { path: 'video/:id',loadComponent: () => import('./pages/video/video').then(m => m.Video), canActivate: [authGuard] }
    
]