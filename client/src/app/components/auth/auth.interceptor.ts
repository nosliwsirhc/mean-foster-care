import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('refresh-auth')) {
      return next.handle(req);
    }
    if (
      this.authService.isAccessTokenExpired() &&
      this.authService.isRefreshTokenExpired()
    ) {
      this.authService.logout();
      return next.handle(req);
    }
    if (
      this.authService.isAccessTokenExpired() &&
      !this.authService.isRefreshTokenExpired()
    ) {
      if (!this.refreshTokenInProgress) {
        this.refreshTokenInProgress = true;
        this.refreshTokenSubject.next(null);
        return this.authService.refreshTokens().pipe(
          switchMap((authResponse) => {
            this.refreshTokenInProgress = false;
            this.refreshTokenSubject.next(authResponse.refreshJwt);
            return next.handle(this.addAuthenticationToken(req));
          })
        );
      } else {
        return this.refreshTokenSubject.pipe(
          filter((result) => result !== null),
          take(1),
          switchMap((res) => {
            return next.handle(this.addAuthenticationToken(req));
          })
        );
      }
    }
    if (!this.authService.isAccessTokenExpired()) {
      return next.handle(this.addAuthenticationToken(req));
    }
  }

  addAuthenticationToken(request: HttpRequest<any>) {
    const accessToken = this.authService.retrieveTokens().accessJwt;
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
