import { ModuleWithProviders } from '@angular/core'; // https://angular.io/api/core/ModuleWithProviders
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { TestComponent } from './components/test/test.component';
import { HomeComponent } from './home/home.component';
import { RulesComponent } from './rules/rules.component';
import { LoginComponent } from './login/login.component';
import { MotusComponent } from './motus/motus.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';


export const router: Routes = [
    { path: '', redirectTo: 'app', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'rules', component: RulesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'motus', component: MotusComponent },

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
