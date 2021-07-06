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
import { IActivePlacement } from '../../../models/active-placement.interface';

@Component({
  selector: 'active-placements',
  templateUrl: './active-placements.component.html',
  styleUrls: ['./active-placements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivePlacementsComponent implements AfterViewInit {
  @Input() activePlacements: IActivePlacement[];

  displayedColumns = ['nameFamily', 'nameGiven', 'dateOfPlacement'];
  dataSource: MatTableDataSource<IActivePlacement>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<IActivePlacement>(
      this.activePlacements
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'nameFamily':
          return item.client.nameFamily;
        case 'nameGiven':
          return item.client.nameGiven;
        case 'dateOfPlacement':
          return item.dateOfPlacement;
        default:
          return item[property];
      }
    };
    this.dataSource.sort = this.sort;
    this.cdRef.detectChanges();
  }
}
