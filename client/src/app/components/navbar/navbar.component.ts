import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  // styles: [

  // ],
})
export class NavbarComponent implements OnInit {
  @Input()
  isAuthenticated$: Observable<boolean>;
  @Input()
  user: IUser;
  @Output('logout')
  logoutEmitter = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  logout() {
    this.logoutEmitter.emit();
  }
}
