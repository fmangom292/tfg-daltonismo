import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TestTiempoReaccionComponent } from './pages/test-tiempo-reaccion/test-tiempo-reaccion.component';
import { TestMullerLyerComponent } from './pages/test-muller-lyer/test-muller-lyer.component';
import { TestLineasVHComponent } from './pages/test-lineas-vh/test-lineas-vh.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'test-tiempo-reaccion',
        component: TestTiempoReaccionComponent
    },
    {
        path: 'muller-lyer',
        component:TestMullerLyerComponent
    },
    {
        path: 'lineas-vh',
        component: TestLineasVHComponent
    }   
];
