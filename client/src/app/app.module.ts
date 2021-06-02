import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AuthModule } from './components/auth/auth.module';
import { ImageCropperModule } from 'ngx-image-cropper';

import { environment as env } from '../environments/environment';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordDialogComponent } from './pages/user-profile/change-password-dialog/change-password-dialog.component';
import { AuthImagePipe } from './_helpers/pipes/auth-image.pipe';
import { ImageCropperDialogComponent } from './components/image-cropper-dialog/image-cropper-dialog.component';
import { CreatePlacingAgencyComponent } from './pages/create-placing-agency/create-placing-agency.component';
import { PlacingAgencyDetailComponent } from './pages/placing-agency-detail/placing-agency-detail.component';
import { ListPlacingAgenciesComponent } from './pages/list-placing-agencies/list-placing-agencies.component';
import { AddressBlockComponent } from './components/address-block/address-block.component';
import { ContactBlockComponent } from './components/contact-block/contact-block.component';
import { ActivePlacementsComponent } from './pages/placing-agency-detail/active-placements/active-placements.component';
import { DischargedPlacementsComponent } from './pages/placing-agency-detail/discharged-placements/discharged-placements.component';
import { ListClientsComponent } from './pages/list-clients/list-clients.component';
import { ClientDetailComponent } from './pages/client-detail/client-detail.component';
import { CreateClientComponent } from './pages/create-client/create-client.component';
import { DischargeClientComponent } from './pages/discharge-client/discharge-client.component';
import { CreateCaseNoteComponent } from './pages/create-case-note/create-case-note.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AutofocusDirective } from './_helpers/directives/autofocus.directive';
import { CreateFosterHomeComponent } from './pages/create-foster-home/create-foster-home.component';
import { ListFosterHomesComponent } from './pages/list-foster-homes/list-foster-homes.component';
import { FosterHomeDetailComponent } from './pages/foster-home-detail/foster-home-detail.component';
import { BackButtonDirective } from './_helpers/directives/back-navigation.directive';
import { LoginDialogComponent } from './components/auth/login-dialog/login-dialog.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthInterceptor } from './components/auth/auth.interceptor';

@NgModule({
  declarations: [
    // AutofocusDirective,
    BackButtonDirective,
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent,
    NavbarComponent,
    UserProfileComponent,
    ChangePasswordDialogComponent,
    AuthImagePipe,
    ImageCropperDialogComponent,
    CreatePlacingAgencyComponent,
    PlacingAgencyDetailComponent,
    ListPlacingAgenciesComponent,
    AddressBlockComponent,
    ContactBlockComponent,
    ActivePlacementsComponent,
    DischargedPlacementsComponent,
    ListClientsComponent,
    ClientDetailComponent,
    CreateClientComponent,
    DischargeClientComponent,
    CreateCaseNoteComponent,
    UserListComponent,
    CreateFosterHomeComponent,
    ListFosterHomesComponent,
    FosterHomeDetailComponent,
    LoginDialogComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    ImageCropperModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
