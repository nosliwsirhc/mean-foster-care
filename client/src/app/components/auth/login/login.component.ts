import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoggingIn = false;
  loginError = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
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
