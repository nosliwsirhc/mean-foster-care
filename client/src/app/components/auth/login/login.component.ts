import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'login-button',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  constructor(private dialog: MatDialog) {}

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px',
    });
  }
}
