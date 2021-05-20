import { Component, Inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'logout-button',
  templateUrl: './logout.component.html',
  styles: [],
})
export class LogoutComponent {
  constructor(public authService: AuthService) {}
}
