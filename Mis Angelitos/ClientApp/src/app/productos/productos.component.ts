import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductosDataSource, ProductosItem } from './productos-datasource';
import { Producto } from '../data-models/producto';
import { TipoProducto, TipoProductoEnum } from '../data-models/tipoProducto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MarcaService } from '../servicios/marca.service';
import { Marca } from '../data-models/marca';
import { ProductoService } from '../servicios/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit { //AfterViewInit, OnInit
  /*@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<Producto>;
  dataSource: ProductosDataSource;*/

  productos: Producto[];
  productoFilter: string;
  idTipoFilter: number;
  tipoProductos: TipoProducto[];
  tipoProducto: TipoProducto;
  form: FormGroup;
  porUnidad: boolean;
  porUnidadOpciones: string[];
  marcas: Marca[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nombre', 'marca', 'tipoProducto', 'stock', 'porcentajeGanancia', 'porUnidad'];

  constructor(private marcaService: MarcaService, private productoService: ProductoService){
    this.productos = [];
    this.productoFilter = "";
    this.tipoProductos = [];
    this.marcas = [];
    this.porUnidadOpciones = [];
      for(var i=0; i<4 ; i++){
      this.tipoProducto = new TipoProducto();
      this.tipoProducto.Id = i;
      this.tipoProducto.Nombre = TipoProductoEnum[i];
      this.tipoProductos.push(this.tipoProducto)
      }
      this.form = new FormGroup({
        nombre: new FormControl('', Validators.required),
        marca: new FormControl('', Validators.required),
        tipoProducto: new FormControl('', Validators.required),
        stock: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
        porUnidad: new FormControl(),
        porcentajeGanancia: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
      })
    }

  ngOnInit() {
    this.getMarcas();
    this.getProductos();
  }

  /*ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }*/

  getMarcas(): void {
    this.marcaService.getMarcas().subscribe(resp => {
    this.marcas = resp;
    })
  }

  getProductos(): void {
    this.productoService.getProductos().subscribe(resp => {
      this.productos = resp;
    })
  }
}
