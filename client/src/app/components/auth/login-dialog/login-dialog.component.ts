import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styles: [
    'mat-dialog-content { display: flex; flex-direction: column }',
    'h3 { background: yellow; padding: 0.8rem; }',
  ],
})
export class LoginDialogComponent implements OnInit {
  public loginForm: FormGroup;
  public isLoggingIn = false;
  public loginError = false;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginDialogComponent>
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.minLength(8),
        Validators.required,
      ]),
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoggingIn = true;
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (authResponse) => {
          if (authResponse) {
            this.isLoggingIn = false;
            this.loginError = false;
            this.dialogRef.close();
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
}
