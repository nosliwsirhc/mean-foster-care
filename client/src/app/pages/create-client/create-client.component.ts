import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { IClient } from 'src/app/models/client.interface';
import { IFosterHome } from 'src/app/models/foster-home.interface';
import { IPlacingAgency } from 'src/app/models/placing-agency.interface';
import { ClientService } from 'src/app/services/client.service';
import { FosterHomeService } from 'src/app/services/foster-home.service';
import { PlacingAgencyService } from 'src/app/services/placing-agency.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss'],
})
export class CreateClientComponent implements OnInit, OnDestroy {
  placingAgenciesSub: Subscription;
  placingAgencies: IPlacingAgency[];
  fosterHomesSub: Subscription;
  fosterHomes: IFosterHome[];
  clientForm: FormGroup;

  constructor(
    private fosterHomeService: FosterHomeService,
    private placingAgencyService: PlacingAgencyService,
    private clientService: ClientService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.placingAgenciesSub = this.placingAgencyService
      .listPlacingAgencies()
      .subscribe((pas) => {
        this.placingAgencies = pas;
      });
    this.fosterHomesSub = this.fosterHomeService
      .getAllFosterHomes()
      .subscribe((homes) => {
        this.fosterHomes = homes;
      });
    this.clientForm = this.fb.group({
      nameGiven: ['Charlie', [Validators.required, Validators.minLength(2)]],
      nameMiddle: [null],
      nameFamily: ['Bucket', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: [new Date('11-22-2016'), [Validators.required]],
      gender: ['male', [Validators.required]],
      religion: ['Catholic'],
      ethnicity: ['Caucasian'],
      language: [null],
      placeOfBirth: [null],
      fnim: [false],
      currentPlacement: this.fb.group({
        placingAgency: [null],
        placingAgencyName: [null],
        fosterHome: [null],
        fosterHomeName: [null],
        dateOfPlacement: [null],
        dateOfDischarge: [null],
      }),
      previousPlacements: [[]],
      careStatus: this.fb.group({
        status: ['TCA'],
        dateStart: [new Date('05-30-2021')],
        dateEnd: [null],
      }),
      previousCareStatus: [[]],
    });
  }

  ngOnDestroy(): void {
    this.placingAgenciesSub.unsubscribe();
    this.fosterHomesSub.unsubscribe();
  }

  get currentPlacement() {
    return this.clientForm.get('currentPlacement');
  }

  insertPaName(event: MatSelectChange) {
    const id = event.value;
    const pa = this.placingAgencies.find((pa) => pa._id === id);
    this.currentPlacement.get('placingAgencyName').setValue(pa.name);
  }

  insertHomeName(event: MatSelectChange) {
    const id = event.value;
    const home = this.fosterHomes.find((home) => home._id === id);
    this.currentPlacement.get('fosterHomeName').setValue(home.name);
  }

  submit() {
    if (!this.clientForm.valid) return;
    const client: IClient = {
      ...this.clientForm.value,
      currentPlacement: this.clientForm.get('currentPlacement').value,
      previousPlacements: this.clientForm.get('previousPlacements').value,
      careStatus: this.clientForm.get('careStatus').value,
      previousCareStatus: this.clientForm.get('previousCareStatus').value,
    };
    this.clientService.createClient(client).subscribe();
  }
}
