import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from 'src/app/models/client.interface';

@Component({
  selector: 'app-my-clients',
  templateUrl: './my-clients.component.html',
  styleUrls: ['./my-clients.component.scss']
})
export class MyClientsComponent {

  @Input()
  clients$: Observable<IClient[]>

}
