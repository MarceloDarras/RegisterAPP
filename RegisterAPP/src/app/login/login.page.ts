import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController, AnimationController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  registroRecupParseado: any;

  nombre: string="";
  nombreValido: boolean=false;
  clave: string="";
  claveValida: boolean=false;
  

  constructor(private navCtrl: NavController, private animationCtrl: AnimationController, private alertController: AlertController, private storage: Storage ) { 

  }

  

  ngOnInit() {
    let registroRecup = localStorage.getItem('Nuevo usuario');


    if (registroRecup) {
      try {
        // Intenta analizar el valor como un arreglo JSON
        this.registroRecupParseado = JSON.parse(registroRecup);
        
        if (Array.isArray(this.registroRecupParseado)) {
          // Verifica que el resultado es un arreglo
          console.log('Es un arreglo:', this.registroRecupParseado);
        } else {
          console.log('No es un arreglo JSON válido:', this.registroRecupParseado);
        }
      } catch (error) {
        console.error('Error al analizar el valor del LocalStorage:', error);
      }
    }
    
  }

  camposValidos(){
    if(this.clave.length<4){
      this.claveValida = true;
    }else{
      this.claveValida = false;
    }

    if(this.nombre.length<6){
      this.nombreValido = true;
    }else{
      this.nombreValido = false;
    }
  }

  async login(){
    if(this.nombre != this.registroRecupParseado[4] || this.clave != this.registroRecupParseado[5]){
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El usuario y contraseña ingresados no están registrados',
        buttons: ['OK']
      })
      await alert.present();
    }else{
      this.navCtrl.navigateForward('/lector-qr')
    }
  }

  registrar(){
    this.navCtrl.navigateForward('/register')
  }

  recuperar(){
    this.navCtrl.navigateForward('/cambio-clave')
  }

}
