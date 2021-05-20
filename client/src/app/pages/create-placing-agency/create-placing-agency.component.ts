import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IPlacingAgency } from 'src/app/models/placing-agency.interface';
import { PlacingAgencyService } from 'src/app/services/placing-agency.service';

@Component({
  selector: 'app-create-placing-agency',
  templateUrl: './create-placing-agency.component.html',
  styleUrls: ['./create-placing-agency.component.scss'],
})
export class CreatePlacingAgencyComponent implements OnInit, OnDestroy {
  paForm: FormGroup;
  placingAgencySub: Subscription;

  constructor(
    private fb: FormBuilder,
    private placingAgencyService: PlacingAgencyService
  ) {}

  ngOnInit(): void {
    this.paForm = this.fb.group({
      name: [null, [Validators.required]],
      logo: [null],
      street1: [null],
      street2: [null],
      city: [null],
      province: ['ON'],
      postalCode: [null],
      phone: [null],
      fax: [null],
      mileageRate: [null, [Validators.min(0), Validators.max(1)]],
      mileageCostShare: [null, [Validators.min(0)]],
      mileageExclusionPolicy: [null],
      emailPolicy: [null],
    });
  }

  ngOnDestroy(): void {
    if (this.placingAgencySub) {
      this.placingAgencySub.unsubscribe();
    }
  }

  save() {
    if (!this.paForm.valid) return;
    const placingAgency: IPlacingAgency = this.paForm.value;
    placingAgency.activePlacements = [];
    placingAgency.dischargedPlacements = [];
    this.placingAgencySub = this.placingAgencyService
      .createPlacingAgency(this.paForm.value)
      .subscribe();
  }
}
