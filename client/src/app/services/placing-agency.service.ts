import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { IPlacingAgency } from '../models/placing-agency.interface';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface IPlacingAgencyResponse extends IPlacingAgency {
  _id: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlacingAgencyService {
  constructor(private http: HttpClient, private router: Router) {}

  listPlacingAgencies() {
    return this.http.get<IPlacingAgency[]>(`${env.serverUrl}/placing-agencies`);
  }

  createPlacingAgency(placingAgency: IPlacingAgency) {
    return this.http
      .post<IPlacingAgencyResponse>(
        `${env.serverUrl}/placing-agencies`,
        placingAgency
      )
      .pipe(
        tap((response) => {
          this.router.navigate(['/', 'placing-agencies', response._id]);
        })
      );
  }

  getPlacingAgency(id: string) {
    return this.http.get<IPlacingAgency>(
      `${env.serverUrl}/placing-agencies/${id}`
    );
  }
}
