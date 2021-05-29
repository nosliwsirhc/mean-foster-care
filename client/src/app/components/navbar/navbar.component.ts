import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.interface';

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
  user: User;
  @Output('logout')
  logoutEmitter = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  logout() {
    this.logoutEmitter.emit();
  }
}
