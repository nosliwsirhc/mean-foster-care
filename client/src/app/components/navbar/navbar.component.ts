import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
    'a {margin-left: 2rem;}',
    '.active {background: rgba(255,255,255,0.2)}',
  ],
})
export class NavbarComponent implements OnInit {
  @Input()
  isAuthenticated$: Observable<boolean>;

  constructor() {}

  ngOnInit(): void {}
}
