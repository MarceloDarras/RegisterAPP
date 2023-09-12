import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BrowserMultiFormatReader, Result, BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-lector-qr',
  templateUrl: './lector-qr.page.html',
  styleUrls: ['./lector-qr.page.scss'],
})
export class LectorQRPage implements OnInit {
  qrResult: string = ''; 
  codeReader!: BrowserMultiFormatReader;
  isScanning: boolean = false;
  nombre: string = ""

  @ViewChild('videoElement', { static: true }) videoElement: ElementRef | undefined;
  constructor(private route: ActivatedRoute, private navCtrl: NavController) { 
    this.codeReader = new BrowserMultiFormatReader();
    this.route.queryParams.subscribe(params => {
      this.nombre = params['username'];
    }) 
    
  }

  ngOnInit() {
    console.log(this.nombre);
  }

  openScanner() {
    if (this.videoElement) {
      const hints = new Map<BarcodeFormat, any>();
      hints.set(BarcodeFormat.QR_CODE, {});

      this.codeReader
        .decodeFromInputVideoDevice(undefined, this.videoElement.nativeElement)
        .then((result: Result) => {
          this.qrResult = result.getText(); 

          const datosEscaneados = this.qrResult.split(',');

          localStorage.setItem('Profesor', JSON.stringify(datosEscaneados));

          this.closeScanner();

          this.navCtrl.navigateForward('/clase');

          this.isScanning = false; 
        })
        .catch((error: any) => {
          console.error(error);
          this.isScanning = false; 
        });

      this.isScanning = true; 
    }
  }

  closeScanner() {
    
    this.codeReader.reset();
    this.qrResult = ''; 
  }
}
