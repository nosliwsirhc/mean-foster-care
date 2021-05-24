import {
  Component,
  AfterViewInit,
  ViewChild,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'active-placements',
  templateUrl: './active-placements.component.html',
  styleUrls: ['./active-placements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivePlacementsComponent implements AfterViewInit {
  @Input() activePlacements: ActivePlacement[];

  displayedColumns = ['nameFamily', 'nameGiven', 'placementDate'];
  dataSource: MatTableDataSource<ActivePlacement>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ActivePlacement>(
      this.activePlacements
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdRef.detectChanges();
  }
}

export interface ActivePlacement {
  nameGiven: string;
  nameFamily: string;
  placementDate: Date;
}
