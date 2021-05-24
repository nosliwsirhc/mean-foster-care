import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from 'src/app/app-material.module';
import { AuthInterceptor } from './auth.interceptor';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  declarations: [LoginDialogComponent, RegisterComponent],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    AppMaterialModule,
    HttpClientModule,
  ],
})
export class AuthModule {}
