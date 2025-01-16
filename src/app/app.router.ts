import { Routes, RouterModule } from '@angular/router'; 

import { HomeComponent } from './pages/home/home.component';
import { InstructorsComponent } from './pages/instructors/instructors.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';

export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'instructors', component: InstructorsComponent },
    { path: 'contact', component: ContactComponent },
    {path: 'signup', component: SignUpComponent},
    {path: 'login', component: LoginComponent}
];
export const routes = RouterModule.forRoot(router);