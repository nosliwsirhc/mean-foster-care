import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ImageCropperDialogComponent } from 'src/app/components/image-cropper-dialog/image-cropper-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { dataURLtoFile } from 'src/app/_helpers/dataURLtoFile';
import { User } from '../../models/user.interface';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user: User;
  authenticationSub: Subscription;
  isPictureLoading = true;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authenticationSub = this.authService.isLoggedIn$.subscribe(
      (status) => {
        if (!status) return;
        this.user = this.authService.getUser();
      }
    );
  }

  ngOnDestroy(): void {
    this.authenticationSub.unsubscribe();
  }

  get roles() {
    if (this.user) {
      let roleList = '';
      this.user.roles.map((r, i) => {
        if (!r) return;
        if (i === 0) {
          roleList += r;
        } else {
          roleList += `, ${r}`;
        }
      });
      return roleList;
    } else {
      return '';
    }
  }

  updatePassword() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '400px',
    });
  }

  updateProfilePicture() {
    const dialogRef = this.dialog.open(ImageCropperDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((imageString) => {
          const file = dataURLtoFile(imageString, 'avatar');
          const userId = this.authService.retrieveTokens().user._id;
          return this.userService.changeProfilePic(userId, file);
        })
      )
      .subscribe((updatedUser) => {
        this.user = updatedUser;
      });
  }
}
