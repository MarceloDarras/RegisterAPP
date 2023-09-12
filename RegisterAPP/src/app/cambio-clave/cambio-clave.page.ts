import { Block } from '@angular/compiler';
import { ViewChild } from '@angular/core';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, IonInput, NavController } from '@ionic/angular';

@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.page.html',
  styleUrls: ['./cambio-clave.page.scss'],
})
export class CambioClavePage implements OnInit {
  @ViewChild('nuevaContraseña', { static: false }) nuevaContraseña!: IonInput;
  
  registroRecupParseado: any;

  Usuario: string="";
  ClaveNueva: string="";
  cambioSi: boolean=false;
  isVisible: boolean=true;
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

  ionViewDidEnter() {
    this.isVisible = false;
    this.nuevaContraseña.disabled = true;
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
              this.nuevaContraseña.disabled = false;
              this.isVisible = true;
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

  async cambiarContra(){
    if(this.registroRecupParseado[5] != this.ClaveNueva){
      this.registroRecupParseado[5] = this.ClaveNueva;
      localStorage.setItem('Nuevo usuario', JSON.stringify(this.registroRecupParseado));

      const alert = await this.alertController.create({
        header: "Cambio exitoso",
        message: "Tu contraseña se ha cambiado exitosamente",
        buttons: [{
          text:"OK",
          handler: () =>{
            const actualizacionEvento = new Event('datosActualizados');
            window.dispatchEvent(actualizacionEvento);
            this.navCtrl.navigateForward("/login");
          }
        }]
      })
      await alert.present();

    }else{
      const alert = await this.alertController.create({
        header: "Error",
        message: "No se pueden utilizar contraseñas usadas anteriormente",
        buttons: ["OK"],
      })
      await alert.present();
    }
    

  }

}
