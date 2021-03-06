import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFosterHome } from '../models/foster-home.interface';
import { environment as env } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FosterHomeService {
  constructor(private http: HttpClient, private router: Router) {}

  createFosterHome(home: IFosterHome) {
    return this.http
      .post<IFosterHome>(`${env.serverUrl}/foster-homes/`, home)
      .pipe(
        tap((home) => {
          if (home) {
            this.router.navigate(['/', 'foster-homes', 'profile', home._id]);
          }
        })
      );
  }

  getFosterHome(id: string) {
    return this.http.get<IFosterHome>(
      `${env.serverUrl}/foster-homes/profile/${id}`
    );
  }

  getAllFosterHomes() {
    return this.http.get<IFosterHome[]>(`${env.serverUrl}/foster-homes`);
  }
}
