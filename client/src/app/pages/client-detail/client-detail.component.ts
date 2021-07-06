import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ClientService } from 'src/app/services/client.service';
import { fullName } from 'src/app/_helpers/fullName';
import { IClient } from '../../models/client.interface';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent implements OnInit, OnDestroy {
  client: IClient;
  private routeSub: Subscription;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params
      .pipe(
        switchMap((params: Params) => {
          const id = params['id'];
          return this.clientService.getClient(id);
        })
      )
      .subscribe((client) => {
        this.client = client;
      });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  get getFullName() {
    return fullName(
      this.client.nameGiven,
      this.client.nameMiddle,
      this.client.nameFamily
    );
  }
}
