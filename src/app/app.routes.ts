import { ModuleWithProviders } from '@angular/core'; // https://angular.io/api/core/ModuleWithProviders
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { RulesComponent } from './rules/rules.component';
import { LoginComponent } from './login/login.component';
import { MotusComponent } from './motus/motus.component';
import { MatchmakingComponent } from './matchmaking/matchmaking.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';


export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'login', component: LoginComponent },
    { path: 'rules', component: RulesComponent },
    { path: 'matchmaking', component: MatchmakingComponent },
    { path: 'motus/:id', component: MotusComponent },

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
