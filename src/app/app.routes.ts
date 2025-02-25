import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { MiddlePanelComponent } from './components/middle-panel/middle-panel.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'left', component: LeftPanelComponent },
      { path: 'middle', component: MiddlePanelComponent },
      { path: 'right', component: RightPanelComponent },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
