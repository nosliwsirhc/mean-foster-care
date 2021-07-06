import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IUser } from './models/user.interface';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user: IUser;
  authStatus: Observable<boolean>;
  authStatusSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.initializeAuth();
    this.authStatusSub = this.authService.isLoggedIn$.subscribe((status) => {
      if (status) {
        this.user = this.authService.getUser();
      } else {
        this.user = null;
      }
    });
  }

  ngOnDestroy(): void {
    // This is probably not necessary since the app component is the root of the entire client
    this.authStatusSub.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }
}
