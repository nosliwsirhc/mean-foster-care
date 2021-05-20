import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'signup-button',
  templateUrl: './signup.component.html',
  styles: [],
})
export class SignupComponent {
  constructor(public authService: AuthService) {}
}
