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
  idMarcaToEdit: number;
  marcas: Marca[];
  displayedColumns = ['id','nombre','editar','eliminar'];
  filtroBuscar: string;

  constructor(private marcaService: MarcaService) { 
    this.marcaToInsert = "";
    this.marcas = [];
    this.idMarcaToEdit = 0;
    this.filtroBuscar = '';
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
        this.marcaToInsert = "";
      })
    }
  }

  editar(marca: Marca){
    this.marcaToInsert = marca.nombre;
    this.idMarcaToEdit = marca.id;
  }

  editarMarca(){
    let data = '?nombre=' + this.marcaToInsert + '&id=' + this.idMarcaToEdit;
    if(this.idMarcaToEdit != 0){
      this.marcaService.edit(data).subscribe(resp => {  
        this.getMarcas();
        this.idMarcaToEdit = 0;
        this.marcaToInsert = "";
      })
    }
  }

  eliminar(id: number){
    let data = '?id=' + id;
    this.marcaService.delete(data).subscribe(resp => {  
      this.getMarcas();
    })
  }

  getByNombre(){
    let data = '?nombre=' + this.filtroBuscar;
    this.marcaService.getByNombre(data).subscribe(marcas => {
      this.marcas = marcas;
    })
  }
}
