import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IFosterHome } from 'src/app/models/foster-home.interface';
import { FosterHomeService } from 'src/app/services/foster-home.service';

@Component({
  selector: 'app-foster-home-detail',
  templateUrl: './foster-home-detail.component.html',
  styleUrls: ['./foster-home-detail.component.scss'],
})
export class FosterHomeDetailComponent implements OnInit, OnDestroy {
  fosterHome: IFosterHome;
  routeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private homeService: FosterHomeService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params
      .pipe(
        switchMap((params: Params) => {
          const id = params['id'];
          return this.homeService.getFosterHome(id);
        })
      )
      .subscribe((home) => {
        this.fosterHome = home;
      });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
