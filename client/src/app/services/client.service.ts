import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { Client } from '../models/client.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient, private router: Router) {}

  createClient(client: Client) {
    return this.http.post<Client>(`${env.serverUrl}/clients/`, client).pipe(
      tap((client) => {
        if (client) {
          this.router.navigate(['/', 'clients', 'profile', client._id]);
        }
      })
    );
  }

  listClients() {
    return this.http.get<Client[]>(`${env.serverUrl}/clients/`);
  }

  getClient(id: string) {
    return this.http.get<Client>(`${env.serverUrl}/clients/profile/${id}`);
  }
}
