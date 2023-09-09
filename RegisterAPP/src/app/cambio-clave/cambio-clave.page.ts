import { Block } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.page.html',
  styleUrls: ['./cambio-clave.page.scss'],
})
export class CambioClavePage implements OnInit {
  registroRecupParseado: any;

  Usuario: string="";
  ClaveNueva: string="";
  cambioSi: boolean=false;
  constructor(private alertController: AlertController, private cdr: ChangeDetectorRef, private navCtrl: NavController) { }

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

  async usuarioReconocido(){
    const cambioSi = document.getElementsByClassName('nuevaContra');
    if(this.Usuario == this.registroRecupParseado[4]){
        const alert = await this.alertController.create({
          header: "Hola " + this.Usuario,
          message: "Su contraseña anterior es: " + this.registroRecupParseado[5] + " , deseas cambiarla?",
          buttons: [{
            text: "Sí",
            handler: () => {
              // Acción a realizar cuando se presiona "Sí"
              console.log("Botón 'Sí' presionado");
              // Agrega aquí la lógica para cambiar la contraseña
            },
          },
          {
            text: "No",
            role: "cancel",
            handler: () => {
              // Acción a realizar cuando se presiona "No" o se cierra el cuadro de diálogo
              this.navCtrl.navigateForward('/login')
              console.log("Botón 'No' presionado o cuadro de diálogo cerrado");
            },
          },],
        })
        await alert.present();
    }
  }

  cambiarContra(){
    this.registroRecupParseado[5] == this.ClaveNueva;
  }

}
