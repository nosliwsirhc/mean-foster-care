import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Dimensions,
  ImageCroppedEvent,
  ImageCropperComponent,
} from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper-dialog',
  templateUrl: './image-cropper-dialog.component.html',
  styleUrls: ['./image-cropper-dialog.component.scss'],
})
export class ImageCropperDialogComponent {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;

  constructor(
    private dialogRef: MatDialogRef<ImageCropperDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  fileChangeEvent(event: any) {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded(image: HTMLImageElement) {
    this.showCropper = true;
  }

  cropperReady(sourceImageDimensions: Dimensions) {}

  loadImageFailed() {}

  save() {
    this.dialogRef.close(this.croppedImage);
  }
}
