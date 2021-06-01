import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client.interface';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss'],
})
export class ListClientsComponent implements OnInit {
  clients$: Observable<Client[]>;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clients$ = this.clientService.listClients();
  }
}
