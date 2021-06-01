import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FosterHome } from 'src/app/models/foster-home.interface';
import { FosterHomeService } from 'src/app/services/foster-home.service';

@Component({
  selector: 'app-list-foster-homes',
  templateUrl: './list-foster-homes.component.html',
  styleUrls: ['./list-foster-homes.component.scss'],
})
export class ListFosterHomesComponent implements OnInit {
  fosterHomes$: Observable<FosterHome[]>;

  constructor(private homeService: FosterHomeService) {}

  ngOnInit(): void {
    this.fosterHomes$ = this.homeService.getAllFosterHomes();
  }
}
