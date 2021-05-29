import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MimeType } from '../../../_helpers/validators/mime-type.validator';
import { AuthService } from '../../../services/auth.service';
import { RegisterUser } from '../../../models/register.interface';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropperDialogComponent } from '../../image-cropper-dialog/image-cropper-dialog.component';
import { dataURLtoFile } from 'src/app/_helpers/dataURLtoFile';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
    'mat-form-field { width: 100%; }',
    '.cancel-button { margin-right: 1rem !important; }',
    '.checkbox-section { display: flex; align-content: center; align-items: center; margin-bottom: 1rem;}',
    '.checkbox-margin { margin: 0 10px; }',
  ],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  picturePreview = 'assets/images/blank-avatar.png';
  managers: { _id: string; fullName: string }[];
  managerSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.managerSub = this.userService.getManagers().subscribe((managers) => {
      this.managers = managers;
    });
    this.registerForm = this.formBuilder.group({
      nameGiven: [null, [Validators.minLength(2), Validators.required]],
      nameMiddle: [null],
      nameFamily: [null, [Validators.minLength(2), Validators.required]],
      picture: [
        null,
        {
          validators: [Validators.required],
          asyncValidators: [MimeType],
        },
      ],
      dateOfBirth: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      manager: [null, [Validators.required]],
      jobTitle: [null, [Validators.required]],
      isManager: [false, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.minLength(8), Validators.required]],
      sendPasswordToUser: [true, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.managerSub.unsubscribe();
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
        isManager: this.registerForm.value.isManager,
        nameGiven: this.registerForm.value.nameGiven,
        nameMiddle: this.registerForm.value.nameMiddle,
        nameFamily: this.registerForm.value.nameFamily,
        picture: this.registerForm.value.picture,
        dateOfBirth: this.registerForm.value.dateOfBirth,
        jobTitle: this.registerForm.value.jobTitle,
        manager: this.registerForm.value.manager,
        gender: this.registerForm.value.gender,
        password: this.registerForm.value.password,
      };
      this.authService.register(userProfile);
    }
  }

  get fullName() {
    const firstName = this.registerForm.get('nameGiven').value;
    const middleName = this.registerForm.get('nameMiddle').value;
    const familyName = this.registerForm.get('nameFamily').value;
    if (firstName && !middleName && !familyName) return firstName;
    if (firstName && !middleName && familyName)
      return firstName + ' ' + familyName;
    if (firstName && middleName && familyName)
      return firstName + ' ' + middleName + ' ' + familyName;
    if (firstName && middleName) return firstName + ' ' + middleName;
    if (!firstName && !middleName && familyName) return familyName;
    return 'Jane Doe';
  }
}
