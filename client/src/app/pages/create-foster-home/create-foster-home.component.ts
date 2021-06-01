import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FosterHome } from 'src/app/models/foster-home.interface';
import { FosterHomeService } from 'src/app/services/foster-home.service';

@Component({
  selector: 'app-create-foster-home',
  templateUrl: './create-foster-home.component.html',
  styleUrls: ['./create-foster-home.component.scss'],
})
export class CreateFosterHomeComponent implements OnInit {
  homeForm: FormGroup;

  constructor(
    private fosterHomeService: FosterHomeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.homeForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(2)]],
    });
  }

  submit() {
    if (!this.homeForm.valid) return;
    console.log('Creating foster home...');
    const home: FosterHome = { ...this.homeForm.value };
    this.fosterHomeService.createFosterHome(home).subscribe();
  }
}
