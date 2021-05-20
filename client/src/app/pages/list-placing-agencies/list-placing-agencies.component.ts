import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlacingAgency } from 'src/app/models/placing-agency.interface';
import { PlacingAgencyService } from 'src/app/services/placing-agency.service';

@Component({
  selector: 'app-list-placing-agencies',
  templateUrl: './list-placing-agencies.component.html',
  styleUrls: ['./list-placing-agencies.component.scss'],
})
export class ListPlacingAgenciesComponent implements OnInit {
  placingAgencies$: Observable<IPlacingAgency[]>;

  constructor(private paService: PlacingAgencyService) {}

  ngOnInit(): void {
    this.placingAgencies$ = this.paService.listPlacingAgencies();
  }
}
