import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { MiddlePanelComponent } from './components/middle-panel/middle-panel.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './components/notification/notification.component';

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
  { path: 'profile', component: ProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'notification', component: NotificationComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
