import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../../../_helpers/validators/must-match.validator';
import { MimeType } from '../../../_helpers/validators/mime-type.validator';
import { AuthService } from '../../../services/auth.service';
import { RegisterUser } from '../../../models/register.interface';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropperDialogComponent } from '../../image-cropper-dialog/image-cropper-dialog.component';
import { dataURLtoFile } from 'src/app/_helpers/dataURLtoFile';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
    'form { display: flex; flex-direction: column; align-items: center; }',
    'form mat-form-field { width: 90% }',
    '.actions button { align-items: centre }',
    '.gender-radio { width: 100% }',
    '.radio-margin { margin-left: 1rem; }',
  ],
})
export class RegisterComponent implements OnInit, AfterViewInit {
  registerForm: FormGroup;
  picturePreview = 'assets/images/blank-avatar.png';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nameGiven: ['Hilda', [Validators.minLength(2), Validators.required]],
      nameMiddle: [null],
      nameFamily: ['Wilson', [Validators.minLength(2), Validators.required]],
      picture: [
        null,
        {
          validators: [Validators.required],
          asyncValidators: [MimeType],
        },
      ],
      dateOfBirth: [null, [Validators.required]],
      gender: ['female', [Validators.required]],
      manager: ['william_id', [Validators.required]],
      jobTitle: ['Placement Coordinator', [Validators.required]],
      email: [
        'hildawilson@annieshavens.ca',
        [Validators.email, Validators.required],
      ],
      password: [null, [Validators.minLength(8), Validators.required]],
      passwordConfirm: [null],
    });
  }

  ngAfterViewInit(): void {
    this.registerForm
      .get('passwordConfirm')
      .setValidators([
        Validators.minLength(8),
        Validators.required,
        MustMatch(this.registerForm.get('password')),
      ]);
  }

  pickImage() {
    const dialogRef = this.dialog.open(ImageCropperDialogComponent, {
      width: '95%',
      maxWidth: '600px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((imageString) => {
      this.picturePreview = imageString;
      const file = dataURLtoFile(imageString, 'avatar');
      this.registerForm.patchValue({ picture: file });
      this.registerForm.get('picture').updateValueAndValidity();
    });
  }

  register() {
    if (this.registerForm.valid) {
      const userProfile: RegisterUser = {
        email: this.registerForm.value.email,
        roles: ['user'],
        isActive: true,
        nameGiven: this.registerForm.value.nameGiven,
        nameMiddle: this.registerForm.value.nameMiddle,
        nameFamily: this.registerForm.value.nameFamily,
        picture: this.registerForm.value.picture,
        dateOfBirth: this.registerForm.value.dateOfBirth,
        jobTitle: this.registerForm.value.jobTitle,
        manager: this.registerForm.value.manager,
        gender: this.registerForm.value.gender,
        password: this.registerForm.value.password,
        passwordConfirm: this.registerForm.value.passwordConfirm,
      };
      console.log('Trying to register...', userProfile);
      this.authService.register(userProfile);
    }
  }
}
