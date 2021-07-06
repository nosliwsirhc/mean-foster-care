import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { IRegisterUser } from '../models/register.interface';
import { IUser } from '../models/user.interface';

interface AuthResponse {
  user: IUser;
  accessJwt: string;
  accessExp: number;
  refreshJwt: string;
  refreshExp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER = 'user';
  private readonly ACCESS_TOKEN = 'access-token';
  private readonly ACCESS_EXP = 'access-exp';
  private readonly REFRESH_TOKEN = 'refresh-token';
  private readonly REFRESH_EXP = 'refresh-exp';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${env.serverUrl}/auth/authenticate`, {
        email,
        password,
      })
      .pipe(
        tap((authResponse) => {
          const { user, accessJwt, accessExp, refreshJwt, refreshExp } =
            authResponse;
          if (accessJwt && refreshJwt) {
            this.storeTokens(
              user,
              accessJwt,
              accessExp,
              refreshJwt,
              refreshExp
            );
            this.isLoggedInSubject.next(true);
            this.router.navigate(['/', 'users', 'profile', user._id]);
          }
        })
      );
  }

  logout() {
    const headers = new HttpHeaders().set(
      'X-REFRESH-TOKEN',
      this.retrieveTokens().refreshJwt
    );
    this.router.navigate(['/']);
    this.http
      .delete(`${env.serverUrl}/auth/logout`, { headers })
      .subscribe(() => {
        this.removeTokens();
        this.isLoggedInSubject.next(false);
      });
  }

  register(user: IRegisterUser) {
    console.log(user);
    const postData = new FormData();
    Object.keys(user).forEach((key) => {
      if (key === 'picture') {
        postData.append(
          'picture',
          user.picture,
          user.nameGiven + ' ' + user.nameFamily
        );
      } else if (Array.isArray(user[key])) {
        user[key].forEach((value, i) => {
          postData.append(`${key}[${i}]`, value);
        });
      } else {
        postData.append(key, user[key]);
      }
    });
    this.http
      .post<{ userId: string }>(`${env.serverUrl}/auth/register`, postData)
      .subscribe((authResponse) => {
        this.router.navigate(['/', 'users', 'profile', authResponse.userId]);
      });
  }

  refreshTokens() {
    return this.http
      .post<AuthResponse>(`${env.serverUrl}/auth/refresh-auth`, {
        refreshToken: this.retrieveTokens().refreshJwt,
      })
      .pipe(
        tap((authResponse) => {
          const { user, accessJwt, accessExp, refreshJwt, refreshExp } =
            authResponse;
          if (!accessJwt) {
            this.logout();
          }
          if (accessJwt && refreshJwt) {
            this.storeTokens(
              user,
              accessJwt,
              accessExp,
              refreshJwt,
              refreshExp
            );
            this.isLoggedInSubject.next(true);
          } else {
            this.logout();
          }
        })
      );
  }

  getUser() {
    const user = <IUser>JSON.parse(localStorage.getItem(this.USER));
    return user;
  }

  private storeTokens(
    user: IUser,
    accessJwt: string,
    accessExp: number,
    refreshJwt: string,
    refreshExp: number
  ) {
    localStorage.setItem(this.USER, JSON.stringify(user));
    localStorage.setItem(this.ACCESS_TOKEN, accessJwt);
    localStorage.setItem(this.ACCESS_EXP, accessExp.toString());
    localStorage.setItem(this.REFRESH_TOKEN, refreshJwt);
    localStorage.setItem(this.REFRESH_EXP, refreshExp.toString());
  }

  private removeTokens() {
    localStorage.removeItem(this.USER);
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.ACCESS_EXP);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.REFRESH_EXP);
  }

  initializeAuth() {
    const tokens = this.retrieveTokens();
    if (!tokens.refreshJwt || !this.isRefreshTokenExpired) {
      this.removeTokens();
    } else {
      const user = <IUser>JSON.parse(localStorage.getItem(this.USER));
      const userId = user._id;
      this.http
        .get(`${env.serverUrl}/users/profile/${userId}`)
        .subscribe((user) => {
          if (user) {
            this.isLoggedInSubject.next(true);
          } else {
            this.isLoggedInSubject.next(false);
          }
        });
    }
  }

  retrieveTokens(): {
    user: IUser;
    accessJwt: string;
    accessExp: number;
    refreshJwt: string;
    refreshExp: number;
  } {
    return {
      user: JSON.parse(localStorage.getItem(this.USER)),
      accessJwt: localStorage.getItem(this.ACCESS_TOKEN),
      accessExp: parseInt(localStorage.getItem(this.ACCESS_EXP)),
      refreshJwt: localStorage.getItem(this.REFRESH_TOKEN),
      refreshExp: parseInt(localStorage.getItem(this.REFRESH_EXP)),
    };
  }

  updateUserInLocalStorage(user: IUser) {
    localStorage.setItem(this.USER, JSON.stringify(user));
  }

  isAccessTokenExpired(): boolean {
    const accessExp = parseInt(localStorage.getItem(this.ACCESS_EXP));
    return Date.now() >= accessExp;
  }

  isRefreshTokenExpired(): boolean {
    const refreshExp = parseInt(localStorage.getItem(this.REFRESH_EXP));
    return Date.now() >= refreshExp;
  }
}
