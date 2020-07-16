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

  newProducto: Producto;
  productos: Producto[];
  productoFilter: string;
  idTipoFilter: number;
  tipoProductos: TipoProducto[];
  tipoProducto: TipoProducto;
  form: FormGroup;
  porUnidad: boolean;
  porUnidadOpciones: string[];
  marcas: Marca[];
  editarActivo: boolean;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nombre', 'marca', 'tipoProducto', 'stock', 'porcentajeGanancia', 'historicoVendido','editar','eliminar'];

  constructor(private marcaService: MarcaService, private productoService: ProductoService){
    this.newProducto = new Producto();
    this.newProducto.marca = new Marca();
    this.newProducto.tipoProducto = new TipoProducto();
    this.productos = [];
    this.productoFilter = "";
    this.tipoProductos = [];
    this.marcas = [];
    this.porUnidadOpciones = [];
    this.editarActivo = false;
      for(var i=0; i<4 ; i++){
      this.tipoProducto = new TipoProducto();
      this.tipoProducto.id = i;
      this.tipoProducto.nombre = TipoProductoEnum[i];
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
    this.GetMarcas();
    this.GetProductos();
  }

  /*ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }*/

  GetMarcas(): void {
    this.marcaService.getMarcas().subscribe(resp => {
    this.marcas = resp;
    })
  }

  GetProductos(): void {
    this.productoService.getProductos().subscribe(resp => {
      this.productos = resp;
    })
  }

  create(){
    let data = '?nombre=' + this.newProducto.nombre + '&idMarca=' + this.newProducto.marca.id + '&tipoProducto=' 
    + this.newProducto.tipoProducto.id + '&stock=' + this.newProducto.stock + '&porcentaje=' + this.newProducto.porcentajeGanancia;
      
    this.productoService.create(data).subscribe(resp => {  
      this.GetProductos();
      this.form.reset();
    })
  }

  editar(producto: Producto){
    this.newProducto.nombre = producto.nombre;
    this.newProducto.id = producto.id;
    this.newProducto.marca.id = producto.marca.id;
    this.newProducto.stock = producto.stock;
    this.newProducto.porcentajeGanancia = producto.porcentajeGanancia;
    this.newProducto.tipoProducto.id = producto.tipoProducto.id;
    this.editarActivo = true;
  }

  editarProducto(){
    let data = '?id=' + this.newProducto.id + '&nombre=' + this.newProducto.nombre + '&idMarca=' + this.newProducto.marca.id +
    '&tipoProducto=' + this.newProducto.tipoProducto.id + '&stock=' + this.newProducto.stock + '&porcentaje=' + this.newProducto.porcentajeGanancia;
    if(this.editarActivo){
      this.productoService.edit(data).subscribe(resp => {  
        this.GetProductos();
        this.editarActivo = false;
        this.form.reset();
      })
    }
  }

  eliminar(id: number){
    let data = '?id=' + id;
    this.productoService.delete(data).subscribe(resp => {  
      this.GetProductos();
    })
  }
}
