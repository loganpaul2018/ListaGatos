import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Gato } from '../gato';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  gatoEditando: Gato; 
  idGatoSelec: string;

arrayColeccionGatos: any = [{
  id: "",
  data: {} as Gato
}];

//
document: any = {
  id: "",
  data: {} as Gato
};

constructor(private firestoreService: FirestoreService) {
  /*ojito*/this.gatoEditando = {} as Gato;
  this.obtenerListaGatos();

}

  clicBotonInsertar() {
    this.firestoreService.insertar("gatos", this.gatoEditando).then(() => {
      console.log('Gato creada correctamente!');
      this.gatoEditando= {} as Gato;
    }, (error) => {
      console.error(error);
    });
  }
  
  obtenerListaGatos(){
    this.firestoreService.consultar("gatos").subscribe((resultadoConsultaGatos) => {
      this.arrayColeccionGatos = [];
      resultadoConsultaGatos.forEach((datosGatos: any) => {
        this.arrayColeccionGatos.push({
          id: datosGatos.payload.doc.id,
          data: datosGatos.payload.doc.data()
        });
      })
    });
  }

  selecGato(gatoSelec) {
    console.log("Gato seleccionado: ");
    console.log(gatoSelec);
    this.idGatoSelec = gatoSelec.id;
    this.gatoEditando.nombre = gatoSelec.data.nombre;
    this.gatoEditando.color = gatoSelec.data.color;
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("gatos", this.idGatoSelec).then(() => {
      // Actualizar la lista completa
      this.obtenerListaGatos();
      // Limpiar datos de pantalla
      this.gatoEditando = {} as Gato;
    })
  }

  clicBotonModificar() {
    this.firestoreService.actualizar("gatos", this.idGatoSelec, this.gatoEditando).then(() => {
      // Actualizar la lista completa
      this.obtenerListaGatos();
      // Limpiar datos de pantalla
      this.gatoEditando = {} as Gato;
    })
  }

}