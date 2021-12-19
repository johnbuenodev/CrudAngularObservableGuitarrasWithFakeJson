import { Component } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { IGuitarra } from './models/guitarras';
import { GuitarrasService } from './services/guitarras.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'consumindoApiApp';
  guitarrasArray: IGuitarra[] = [];
  arrayId: any[] = [];
  newGuitar: IGuitarra | undefined;
  putGuitar: IGuitarra | undefined;
  cont: number = 1;
  contPut: number = 1;

  constructor(
    private guitarrasService: GuitarrasService
  ) { }

  async getGuitars() {
    await this.guitarrasService.getGuitarras().subscribe(res => {
      this.guitarrasArray = res;
      console.log("Get guitarras");
      console.log(res);
    });
  }

  async getGuitarById(id: number) {
    await this.guitarrasService.getGuitarById(id).subscribe(res => {
      console.log("Guitarra obtida: ", res);
    });
  }

  async postNewGuitar() {

    this.newGuitar = {
      nome: `Guitarra Teste-${this.cont}`,
      marca: `Guitarra Teste-${this.cont}`,
      lancamento: "01/09/2011",
      quantidade: 18 + this.cont
    }

    this.cont = this.cont + 1;

    await this.guitarrasService.postGuitar(this.newGuitar).subscribe(res => {
      console.log("Guitarra criada: ", res);
    });

    await this.getGuitars();

  }

  async putGuitarFunc(idSelected: number) {

    this.putGuitar = {
      id: idSelected,
      nome: `Guitarra Alterada nºvezes: ${this.contPut}`,
      marca: "Marca Alterada",
      lancamento: "01/09/2011",
      quantidade: this.contPut
    }

    this.contPut = this.contPut + 1;

    await this.guitarrasService.putGuitar(this.putGuitar).subscribe(res => {
      console.log("Guitarra criada: ", res);
    });

    await this.getGuitars();

  }

  async deleteGuitarFunc() {

    this.arrayId = [];

    //Pegando todos os Ids
    this.guitarrasArray.map(res => { this.arrayId.push(res.id); });

    //Filtrando para pegar o maior valor
    let idSelected = this.arrayId.reduce((a, b) => {
      return Math.max(a, b);
    });

    console.log(idSelected);

    if (idSelected > 4) {
      await this.guitarrasService.deleteGuitarById(idSelected).subscribe(
        () => { console.log("Deletado nivel componente!")}
      );
    } else {
      console.log("Registro até o nº4 não podem ser apagados!");
      console.log("Cadastre novos valores para realizar Exclusão!")
    }

    await this.getGuitars();
    
  }



}


// npm install -g json server  
// Criar pasta dbfake ou db-server
// json-server --watch db.json