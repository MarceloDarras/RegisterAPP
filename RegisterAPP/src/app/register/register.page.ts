import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  
  nombre: string=""
  nombreValido: boolean=true;
  apellido: string=""
  apellidoValido: boolean=true;
  rut: string=""
  rutValido: boolean=true;
  carrera: string=""
  carreraValida: boolean=true;
  usuario: string=""
  clave: string=""
  constructor(private navctrl: NavController, private alertController: AlertController) { }

  ngOnInit() {
  }

  registroValido(){
    if(this.nombre.length<3){
      this.nombreValido=false;
    }else{
      this.nombreValido=true;
    }
    if(this.apellido.length<3){
      this.apellidoValido=false;
    }else{
      this.apellidoValido=true;
    }
    if(this.rut.length<3){
      this.rutValido=false;
    }else{
      this.rutValido=true;
    }
  }

  async registrar(){
    if(this.nombre!= "" && this.apellido!= "" && this.rut!= "" && this.carrera!= ""){
      let registro = [];
      this.clave = this.rut.slice(0, 4)
      this.usuario = this.nombre.slice(0, 3) + this.apellido.slice(-3);
      const alert = await this.alertController.create({
        header: 'Bienvenido',
        message: 'Su usuario es: ' + this.usuario + ' y su contraseña es: ' + this.clave,
        buttons: ['OK']
      })
      await alert.present();
      registro.push(this.nombre, this.apellido, this.rut, this.carrera, this.usuario, this.clave)
      let registroJSON = JSON.stringify(registro);
      localStorage.setItem('Nuevo usuario', registroJSON);

      const actualizacionEvento = new Event('datosActualizados');
      window.dispatchEvent(actualizacionEvento);

      this.navctrl.navigateForward('/login')
    }
  }


}
