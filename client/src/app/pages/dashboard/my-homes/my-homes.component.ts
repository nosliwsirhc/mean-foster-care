import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IFosterHome } from 'src/app/models/foster-home.interface';

@Component({
  selector: 'app-my-homes',
  templateUrl: './my-homes.component.html',
  styleUrls: ['./my-homes.component.scss']
})
export class MyHomesComponent {

  @Input()
  homes$: Observable<IFosterHome[]>

}
