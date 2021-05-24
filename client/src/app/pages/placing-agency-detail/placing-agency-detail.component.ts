import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IPlacingAgency } from 'src/app/models/placing-agency.interface';
import { PlacingAgencyService } from 'src/app/services/placing-agency.service';
import { ActivePlacement } from './active-placements/active-placements.component';

@Component({
  selector: 'app-placing-agency-detail',
  templateUrl: './placing-agency-detail.component.html',
  styleUrls: ['./placing-agency-detail.component.scss'],
})
export class PlacingAgencyDetailComponent implements OnInit {
  placingAgency$: Observable<IPlacingAgency>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paService: PlacingAgencyService
  ) {}

  ngOnInit(): void {
    this.placingAgency$ = this.activatedRoute.params.pipe(
      switchMap((params: Params) => {
        if (!params['id']) return of(null);
        return this.paService.getPlacingAgency(params['id']);
      })
    );
  }

  activePlacements: ActivePlacement[] = [
    { nameGiven: 'James', nameFamily: 'Jones', placementDate: new Date() },
    { nameGiven: 'Donna', nameFamily: 'Fields', placementDate: new Date() },
    { nameGiven: 'Mohammed', nameFamily: 'Talib', placementDate: new Date() },
    { nameGiven: 'Andrea', nameFamily: 'Adams', placementDate: new Date() },
    { nameGiven: 'William', nameFamily: 'Harkins', placementDate: new Date() },
    { nameGiven: 'Celina', nameFamily: 'Gomez', placementDate: new Date() },
    { nameGiven: 'Abdi', nameFamily: 'Hassan', placementDate: new Date() },
    { nameGiven: 'Ibrahim', nameFamily: 'Ahmed', placementDate: new Date() },
    { nameGiven: 'Tyrell', nameFamily: 'Williams', placementDate: new Date() },
    { nameGiven: 'Tina', nameFamily: 'Chen', placementDate: new Date() },
  ];
}
