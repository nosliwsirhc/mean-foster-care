import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IPlacingAgency } from 'src/app/models/placing-agency.interface';
import { PlacingAgencyService } from 'src/app/services/placing-agency.service';

@Component({
  selector: 'app-placing-agency-detail',
  templateUrl: './placing-agency-detail.component.html',
  styleUrls: ['./placing-agency-detail.component.scss'],
})
export class PlacingAgencyDetailComponent implements OnInit {
  placingAgency: IPlacingAgency;
  placingAgencySub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paService: PlacingAgencyService
  ) {}

  ngOnInit(): void {
    this.placingAgencySub = this.activatedRoute.params
      .pipe(
        switchMap((params: Params) => {
          if (!params['id']) return of(null);
          return this.paService.getPlacingAgency(params['id']);
        })
      )
      .subscribe((pa) => (this.placingAgency = pa));
  }

  ngOnDestroy(): void {
    this.placingAgencySub.unsubscribe();
  }
}
