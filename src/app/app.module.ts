import { BrowserModule } from '@angular/platform-browser';
// https://angular.io/guide/ngmodules
import { NgModule } from '@angular/core';
// https://angular.io/api/forms/FormsModule
import { FormsModule } from '@angular/forms';
// https://angular.io/api/common/http/HttpClientModule
import { HttpClientModule } from '@angular/common/http';
// https://material.angular.io/components/dialog/api
import { MatDialogModule } from '@angular/material/dialog';
// https://angular.io/api/router/RouterModule
import { RouterModule } from '@angular/router';
// nessaire au bon fonctionnent de material
import 'hammerjs';
// importation de composant
import { AppComponent } from './app.component';
import { RulesDialogComponent } from './components/rules/rules-dialog/rules-dialog.component';

// importation de pages
import { HomePage } from './pages/home';
import { ContactPage } from './pages/contact';
import { RulesPage } from './pages/rules';
import { LoginPage } from './pages/login';
import { LogintestPage } from './pages/logintest';
import { HometestPage } from './pages/hometest';
import { MotusPage } from './pages/motus';
import { MotustestPage } from './pages/motustest';
// Services

// importation du composant routes
import { routes } from './app.routes';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

// importations des modules pour angular material
// https://angular.io/api/platform-browser/animations/BrowserAnimationsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';


// importations de  firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
// necessaire pour les promises
import { AngularFireAuthModule } from 'angularfire2/auth';
// variable environnement contenenant la localisation pour firebase
import { environment } from '../environments/environment';
// necessaire pour les promise et observable
import { Observable } from 'rxjs/Observable';
import { TestComponent } from './components/test/test.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    HometestPage,
    ContactPage,
    RulesPage,
    RulesDialogComponent,
    LoginPage,
    LogintestPage,
    MotusPage,
    TestComponent,
    MotustestPage,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatSelectModule,
    MatSliderModule,
    MatInputModule,
    MatCardModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatSidenavModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    routes,


  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [RulesDialogComponent],
})
export class AppModule { }
