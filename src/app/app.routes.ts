import { ModuleWithProviders } from '@angular/core'; // https://angular.io/api/core/ModuleWithProviders
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePage } from './pages/home';
import { ContactPage } from './pages/contact';
import { RulesPage } from './pages/rules';
import { LoginPage } from './pages/login';
import { MotusPage } from './pages/motus';
import { TestComponent } from './components/test/test.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LogintestPage } from './pages/logintest';

export const router: Routes = [
    { path: '', redirectTo: 'app', pathMatch: 'full' },
    { path: 'home', component: HomePage },
    { path: 'contact', component: ContactPage },
    { path: 'rules', component: RulesPage },
    { path: 'login', component: LoginPage },
    { path: 'motus', component: MotusPage },
    { path: 'logintest', component: LogintestPage }
    

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);