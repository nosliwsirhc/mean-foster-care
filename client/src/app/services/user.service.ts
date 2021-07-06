import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment as env } from '../../environments/environment';
import { IUser } from '../models/user.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  changePassword(payload: {
    userId: string;
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
  }) {
    return this.http.patch(
      `${env.serverUrl}/users/change-password/${payload.userId}`,
      payload
    );
  }

  changeProfilePic(userId: string, picture: File) {
    const formData = new FormData();
    formData.append('picture', picture);
    return this.http
      .patch<IUser>(
        `${env.serverUrl}/users/change-profile-picture/${userId}`,
        formData
      )
      .pipe(
        tap((result) => {
          this.authService.updateUserInLocalStorage(result);
        })
      );
  }

  getUsers() {
    return this.http.get<IUser[]>(`${env.serverUrl}/users`);
  }

  getUser(id: string) {
    return this.http.get<IUser>(`${env.serverUrl}/users/profile/${id}`);
  }

  getManagers() {
    return this.http.get<{ _id: string; fullName: string }[]>(
      `${env.serverUrl}/users/managers`
    );
  }
}
