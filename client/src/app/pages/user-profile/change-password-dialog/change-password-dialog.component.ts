import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from '../../../_helpers/validators/must-match.validator';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styles: [
    'mat-form-field { width: 100%; }',
    'mat-divider { margin-bottom: 1rem; }',
  ],
})
export class ChangePasswordDialogComponent implements OnInit, AfterViewInit {
  public changePasswordError = false;
  public isChangingPassword = false;

  public changePasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null, [Validators.required, Validators.minLength(8)]],
      newPassword: [null, [Validators.required, Validators.minLength(8)]],
      newPasswordConfirm: [null],
    });
  }

  ngAfterViewInit(): void {
    this.changePasswordForm
      .get('newPasswordConfirm')
      .setValidators([
        Validators.required,
        Validators.minLength(8),
        MustMatch(this.changePasswordForm.get('newPassword')),
      ]);
  }

  submit() {
    if (this.changePasswordForm.invalid) return;
    this.isChangingPassword = true;
    const { oldPassword, newPassword, newPasswordConfirm } =
      this.changePasswordForm.value;
    const payload = {
      userId: this.authService.getUser()._id,
      oldPassword: oldPassword,
      newPassword: newPassword,
      newPasswordConfirm: newPasswordConfirm,
    };
    this.userService
      .changePassword(payload)
      .pipe(
        catchError((error) => {
          console.error(error);
          this.isChangingPassword = false;
          this.changePasswordError = true;
          return throwError(error);
        })
      )
      .subscribe((result) => {
        if (result) {
          this.dialogRef.close();
        }
      });
  }
}
