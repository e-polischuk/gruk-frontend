import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CitizenComponent } from './citizen/citizen.component';
import { CommunityComponent } from './community/community.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
//    { path: ':me', component: CitizenComponent },
    { path: 'user/:me/:id', component: CitizenComponent },
    { path: 'community/:id', component: CommunityComponent },
    { path: 'not-found', component: NotFoundComponent },
    // otherwise redirect to not-found
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'not-found' }
];

export const routing = RouterModule.forRoot(appRoutes);