import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.page.html',
  styleUrls: ['./clase.page.scss'],
})
export class ClasePage implements OnInit {
  @ViewChildren(IonCard, { read: ElementRef }) cardElements!: QueryList<ElementRef<HTMLIonCardElement>>;


  

  registroRecupParseado: any;
  registroProfeParseado: any;

  formatedtime: string="";

  nombre: string = ""
  apellido: string = ""
  rut: string = ""

  Profe:  string=""
  hora: string=""
  sala: string=""
  dia: string=""

  private animation!: Animation;

  

  constructor(private route: ActivatedRoute, private animationCtrl: AnimationController) {
    const timestamp = Date.now();
    const fecha = new Date(timestamp);

    this.formatedtime = fecha.toLocaleDateString();
  }

  ngOnInit() {
        let registroProfe = localStorage.getItem('Profesor');
        let registroRecup = localStorage.getItem('Nuevo usuario');

        if(registroProfe){
          try{
            this.registroProfeParseado = JSON.parse(registroProfe);

            if(Array.isArray(this.registroProfeParseado)){
              console.log('Es un arreglo: ', this.registroProfeParseado);
              this.Profe = this.registroProfeParseado[0];
              this.hora = this.registroProfeParseado[1];
              this.sala = this.registroProfeParseado[2];
              this.dia = this.registroProfeParseado[3];
            }else{
              console.log('No es un arreglo JSON válido:', this.registroProfeParseado);
              
            }
          } catch(error){
            console.error('Error al analizar el valor del LocalStorage:', error);
          }
        }


        if (registroRecup) {
          try {
            // Intenta analizar el valor como un arreglo JSON
            this.registroRecupParseado = JSON.parse(registroRecup);
            
            if (Array.isArray(this.registroRecupParseado)) {
              // Verifica que el resultado es un arreglo
              console.log('Es un arreglo:', this.registroRecupParseado);
              this.nombre = this.registroRecupParseado[0];
              this.apellido = this.registroRecupParseado[1];
              this.rut = this.registroRecupParseado[2];
              console.log(this.nombre);
            } else {
              console.log('No es un arreglo JSON válido:', this.registroRecupParseado);
            }
          } catch (error) {
            console.error('Error al analizar el valor del LocalStorage:', error);
          }
        }
    
  }

  ngAfterViewInit() {
    const cardA = this.animationCtrl
      .create()
      .addElement(this.cardElements.first.nativeElement)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.5)', opacity: '0.3' },
        { offset: 1, transform: 'scale(1)', opacity: '1' },
      ]);

    const cardB = this.animationCtrl
      .create()
      .addElement(this.cardElements.last.nativeElement)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.5)', opacity: '0.3' },
        { offset: 1, transform: 'scale(1)', opacity: '1' },
      ]);

    this.animation = this.animationCtrl
      .create()
      .duration(2000)
      .iterations(1)
      .addAnimation([cardA, cardB]);
  }

  play(){
    this.animation.play();
  }

  ionViewDidEnter(){
    this.play()
  }





}
