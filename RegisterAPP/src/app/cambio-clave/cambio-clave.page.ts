import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.page.html',
  styleUrls: ['./cambio-clave.page.scss'],
})
export class CambioClavePage implements OnInit {
  registroRecupParseado: any;

  Usuario: string="";
  constructor() { }

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

  usuarioReconocido(){
    if(this.Usuario == this.registroRecupParseado[4]){
        
    }
  }

}
