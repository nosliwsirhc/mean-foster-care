import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/auth/auth.guard';
import { RegisterComponent } from './components/auth/register/register.component';
import { ClientDetailComponent } from './pages/client-detail/client-detail.component';
import { CreateClientComponent } from './pages/create-client/create-client.component';
import { CreateFosterHomeComponent } from './pages/create-foster-home/create-foster-home.component';
import { CreatePlacingAgencyComponent } from './pages/create-placing-agency/create-placing-agency.component';
import { FosterHomeDetailComponent } from './pages/foster-home-detail/foster-home-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { ListClientsComponent } from './pages/list-clients/list-clients.component';
import { ListFosterHomesComponent } from './pages/list-foster-homes/list-foster-homes.component';
import { ListPlacingAgenciesComponent } from './pages/list-placing-agencies/list-placing-agencies.component';
import { PlacingAgencyDetailComponent } from './pages/placing-agency-detail/placing-agency-detail.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  {
    path: 'users',
    component: UserListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'users/profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clients/create',
    component: CreateClientComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clients/profile/:id',
    component: ClientDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clients',
    component: ListClientsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'foster-homes/create',
    component: CreateFosterHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'foster-homes/profile/:id',
    component: FosterHomeDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'foster-homes',
    component: ListFosterHomesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'placing-agencies',
    component: ListPlacingAgenciesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'placing-agencies/create',
    component: CreatePlacingAgencyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'placing-agencies/:id',
    component: PlacingAgencyDetailComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
