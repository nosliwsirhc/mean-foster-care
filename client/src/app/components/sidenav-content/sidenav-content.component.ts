import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

interface SideNavNode {
  name: string;
  link?: string;
  children?: SideNavNode[];
}

const TREE_DATA: SideNavNode[] = [
  {
    name: 'Children in Care',
    children: [
      { name: 'List', link: 'clients' },
      { name: 'Intake', link: 'clients/create' },
      { name: 'Discharge', link: 'clients/discharge' },
    ],
  },
  {
    name: 'Foster Homes',
    children: [
      {
        name: 'List',
        link: 'foster-homes',
      },
      {
        name: 'Recruit',
        link: 'foster-homes/create',
      },
    ],
  },
  {
    name: 'Placing Agencies',
    children: [
      { name: 'List', link: 'placing-agencies' },
      { name: 'Register', link: 'placing-agencies/create' },
    ],
  },
];

/** Flat node with expandable and level information */
interface SideNavFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss'],
})
export class SidenavContentComponent implements OnInit {
  private _transformer = (node: SideNavNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      link: node.link,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<SideNavFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {}

  hasChild = (_: number, node: SideNavFlatNode) => node.expandable;
}
