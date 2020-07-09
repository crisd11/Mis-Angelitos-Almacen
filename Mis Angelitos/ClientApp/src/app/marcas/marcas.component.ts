import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marca } from '../data-models/marca';
import { MarcaService } from '../servicios/marca.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {

  marcaToInsert: string;
  marcas: Marca[];
  displayedColumns = ['nombre'];

  constructor(private marcaService: MarcaService) { 
    this.marcaToInsert = "";
    this.marcas = [];
  }

  ngOnInit(){
    this.getMarcas();
  }

  getMarcas(): void {
    this.marcaService.getMarcas().subscribe(resp => {
    this.marcas = resp;
    })
  }

  create(){
    if(this.marcaToInsert != ""){
      console.log(this.marcaToInsert);
      this.marcaService.create(this.marcaToInsert).subscribe(resp => {  
        this.getMarcas();
      })
    }
  }
}
