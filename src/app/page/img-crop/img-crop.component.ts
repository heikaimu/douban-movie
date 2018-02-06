import { Component, OnInit } from '@angular/core';
import { CropperSettings } from 'ng2-img-cropper';

@Component({
  selector: 'app-img-crop',
  providers: [ CropperSettings ],
  templateUrl: './img-crop.component.html',
  styleUrls: ['./img-crop.component.scss']
})
export class ImgCropComponent implements OnInit {
  data: any;
  constructor(
    private cropperSettings: CropperSettings
  ) {
    this.cropperSettings = new CropperSettings();
    // 画布大小
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    // 选取大小
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    // 裁剪出来的大小
    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 200;

    this.data = {};

  }
  getImgData() {
    console.log(this.data);
  }
  ngOnInit() {
  }

}
