import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from 'src/app/models/client.interface';
import { IFosterHome } from 'src/app/models/foster-home.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { FosterHomeService } from 'src/app/services/foster-home.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  clients$: Observable<IClient[]>
  homes$: Observable<IFosterHome[]>

  constructor(private authService: AuthService, private clientService: ClientService, private homeService: FosterHomeService) { }

  ngOnInit(): void {
    this.clients$ = this.clientService.listClients()
    this.homes$ = this.homeService.getAllFosterHomes()
  }

}
