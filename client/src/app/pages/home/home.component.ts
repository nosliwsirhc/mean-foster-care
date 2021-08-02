import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  authenticated$: Observable<boolean>;
  user: IUser;

  loginForm: FormGroup;
  isLoggingIn = false;
  loginError = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authenticated$ = this.authService.isLoggedIn$;
    this.user = this.authService.getUser();
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  login(): void {
    if(!this.loginForm.valid) return;
    this.isLoggingIn = true
    const { email, password } = this.loginForm.value
    this.authService.login(email, password).subscribe(
      (authResponse) => {
        if (authResponse) {
          this.isLoggingIn = false;
          this.loginError = false;
        }
      },
      (error) => {
        if (error) {
          this.isLoggingIn = false;
          this.loginError = true;
          this.loginForm.get('password').reset();
        }
      }
    );
  }
}
