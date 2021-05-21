import { Component, Input } from '@angular/core';

@Component({
  selector: 'address-block',
  templateUrl: './address-block.component.html',
  styleUrls: ['./address-block.component.scss'],
})
export class AddressBlockComponent {
  @Input() address: {
    street1: string;
    street2: string;
    city: string;
    province: string;
    postalCode: string;
  };
}
