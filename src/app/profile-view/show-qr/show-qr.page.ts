import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-show-qr',
  templateUrl: './show-qr.page.html',
  styleUrls: ['./show-qr.page.scss'],
})
export class ShowQrPage implements OnInit {
  @Input() url: string = window.location.href;
  @Input() theme: any;
  @Input() imageUrl: string;
  @Input() Username: string;
  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  @ViewChild('download') download: ElementRef;
  margin: number = 4;
  background: string = '';

  backgroundColors = [
    'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(223,18,157,1) 51%, rgba(0,212,255,1) 100%)',
    'linear-gradient(90deg,rgba(2, 0, 36, 1) 0%,rgba(9, 9, 121, 1) 35%,rgba(0, 212, 255, 1) 100%)',
    'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(18,223,72,1) 51%, rgba(0,212,255,1) 100%)',
    'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,0,233,1) 100%)',
    'linear-gradient(90deg, rgba(50,40,223,1) 0%, rgba(255,0,233,1) 100%)',
    'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
    'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
    'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
    'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
    'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,45,45,1) 100%)',
  ];
  constructor(private modal: ModalController) {}

  ngOnInit() {
    this.background = this.returnBackground();
  }

  dissmiss() {
    this.modal.dismiss();
  }

  returnBackground() {
    return this.backgroundColors[
      Math.floor(Math.random() * this.backgroundColors.length)
    ];
  }

  downloadImage() {
    html2canvas(this.screen.nativeElement, { useCORS: true , allowTaint: true }).then(
      (canvas) => {
        this.canvas.nativeElement.src = canvas.toDataURL();
        this.canvas.nativeElement.crossOrigin = "Anonymous";
        this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
        this.downloadLink.nativeElement.download = `${this.Username}.png`;
        this.downloadLink.nativeElement.click();
        this.download.nativeElement.style.display = 'none';
      }
    );
  }
}
