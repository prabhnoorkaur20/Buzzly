import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { MiddlePanelComponent } from './components/middle-panel/middle-panel.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './components/notification/notification.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { AuthGuard } from './services/auth-guard';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'middle', component: MiddlePanelComponent },
      { path: 'right', component: RightPanelComponent },
    ], canActivate: [AuthGuard],
  },
  { path: 'addPost', component: AddPostComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard]  },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard]  },
  { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard]  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
