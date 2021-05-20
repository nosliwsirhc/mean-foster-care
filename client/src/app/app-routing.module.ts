import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/auth/auth.guard';
import { RegisterComponent } from './components/auth/register/register.component';
import { CreatePlacingAgencyComponent } from './pages/create-placing-agency/create-placing-agency.component';
import { HomeComponent } from './pages/home/home.component';
import { ListPlacingAgenciesComponent } from './pages/list-placing-agencies/list-placing-agencies.component';
import { PlacingAgencyDetailComponent } from './pages/placing-agency-detail/placing-agency-detail.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  {
    path: 'user-profile',
    component: UserProfileComponent,
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
