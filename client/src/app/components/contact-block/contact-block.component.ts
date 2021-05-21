import { Component, Input } from '@angular/core';

@Component({
  selector: 'contact-block',
  templateUrl: './contact-block.component.html',
  styleUrls: ['./contact-block.component.scss'],
})
export class ContactBlockComponent {
  @Input() contact: {
    phone: string;
    fax: string;
  };
}
