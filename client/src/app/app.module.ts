import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './components/auth/auth.module';
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

@NgModule({
  declarations: [
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    AuthModule,
    ReactiveFormsModule,
    ImageCropperModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
