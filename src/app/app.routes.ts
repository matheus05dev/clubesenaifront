import { Login } from './pages/login/login';
import { Routes } from "@angular/router";
import { authGuard } from "./core/guard/auth-guard";
import { Navegacao } from './layout/navegacao/navegacao';
import { Home } from './pages/home/home';
import { CriarSocios } from './pages/criar-socios/criar-socios';

export const routes: Routes = [
    {
        path: 'login',
        component: Login,
    },
    {
        path: '',
        component: Navegacao,
        canActivate: [authGuard],
        children: [
            {
                path: 'home',
                component: Home,
            },
            {
              path: 'criar-socios',
              component: CriarSocios,
            }
        ]
    }
];
