import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authenticated$ = this.authService.isLoggedIn$;
    this.user = this.authService.getUser();
  }
}
