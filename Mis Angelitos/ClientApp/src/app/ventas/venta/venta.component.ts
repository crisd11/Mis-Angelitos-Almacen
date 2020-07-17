import { Component, OnInit, ViewChild } from '@angular/core';
import { VentaService } from '../../servicios/venta.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Venta } from '../../data-models/venta';
import { DetalleVenta } from '../../data-models/detalleVenta';
import { Producto } from '../../data-models/producto';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DetalleVentaComponent } from '../detalle-venta/detalle-venta.component';
import { ProductoService } from '../../servicios/producto.service';
import { Venta_RegistrarRequest } from '../../data-models/request/Venta_RegistrarRequest';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  //Venta
  ventaForm: Venta;
  detallesVenta: DetalleVenta[];
  cantidadItems: number;
  totalVenta:number;
  fecha: string;
  request: Venta_RegistrarRequest;

  // DETALLE
  detalleForm: FormGroup;
  newDetalleVenta: DetalleVenta;
  productos: Producto[];
  editarActivo: boolean;
  editIndex: number;

  constructor(private ventaService: VentaService, private dialog: MatDialog, private productoService: ProductoService) { 
    //Venta
    this.ventaForm = new Venta();
    this.fecha = new Date().toDateString();
    this.ventaForm.precioTotalVenta = 0;
    this.detallesVenta = [];
    this.cantidadItems = 0;
    this.totalVenta = 0;
    this.request = new Venta_RegistrarRequest();
    this.request.venta = new Venta();
    this.request.detalleVentas = [];

    //Detalle
    this.newDetalleVenta = new DetalleVenta();
    this.newDetalleVenta.producto = new Producto();
    this.newDetalleVenta.id = 0;
    this.editarActivo = false;
    this.editIndex = 99;
    this.productos = [];

    this.detalleForm = new FormGroup({
      producto: new FormControl('', Validators.required),
      precio: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      cantidad: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      total: new FormControl(0)
    })
  }

  ngOnInit() {
    this.GetProductos();
  }

  GetProductos(): void {
    this.productoService.getProductos().subscribe(resp => {
      this.productos = resp;
    })
  }

  agregarDetalle(){
    if(this.newDetalleVenta.producto.stock >= this.newDetalleVenta.cantidadVendida){
      this.detallesVenta.push(this.newDetalleVenta);
      this.cantidadItems++;
      this.actualizarTotalVenta();
      this.newDetalleVenta = new DetalleVenta();
      this.newDetalleVenta.producto = new Producto();
      this.newDetalleVenta.id = 0;
    }
    else{
      let stock = this.newDetalleVenta.producto.stock;
      alert("Solo quedan " + stock + " unidades de ese producto disponibles");
    }
    
  }
  
  actualizarTotalVenta(){
    this.ventaForm.precioTotalVenta = this.detallesVenta.reduce((prev, curr) => {
      return prev + curr.total;
    },0);
    this.ventaForm.precioTotalVenta = parseFloat(this.ventaForm.precioTotalVenta.toFixed(2));
  }

  updateTotal(){
    this.newDetalleVenta.total = parseFloat((this.newDetalleVenta.precio * this.newDetalleVenta.cantidadVendida).toFixed(2));
  }

  editar(detalle: DetalleVenta, index: number){
    this.newDetalleVenta.cantidadVendida = detalle.cantidadVendida;
    this.newDetalleVenta.nombre = detalle.nombre;
    this.newDetalleVenta.precio = detalle.precio;
    this.newDetalleVenta.producto = detalle.producto;
    this.newDetalleVenta.total = detalle.total;
    this.editarActivo = true;
    this.editIndex = index;
  }

  editarDetalle(){
    this.detallesVenta[this.editIndex].cantidadVendida = this.newDetalleVenta.cantidadVendida;
    this.detallesVenta[this.editIndex].precio = this.newDetalleVenta.precio;
    this.detallesVenta[this.editIndex].total = this.newDetalleVenta.total;
    this.detallesVenta[this.editIndex].producto = this.newDetalleVenta.producto;
    this.actualizarTotalVenta();
    this.editIndex = 99;
    this.detalleForm.reset();
    this.editarActivo = false;
  }

  eliminar(index: number){
    this.detallesVenta.splice(index,1);
    this.detalleForm.reset();
    this.editarActivo = false;
    this.cantidadItems = this.cantidadItems - 1;
    this.actualizarTotalVenta();
  }

  cerrarVenta(){
    let data = '?precioTotalVenta=' + this.ventaForm.precioTotalVenta;

    this.ventaService.createVenta(data).subscribe(id => {
      this.ventaForm.id = id;
      for(let i in this.detallesVenta){
        var detalle = this.detallesVenta[i];
        let datos = '?idVenta=' + this.ventaForm.id + '&idProducto=' + detalle.producto.id + 
                  '&cantidadVendida=' + detalle.cantidadVendida + '&precio=' + detalle.precio;

        this.ventaService.createDetalle(datos).subscribe(resp => {
          alert("Venta registrada con exito");
          this.detallesVenta = [];
          this.ventaForm.id = 0;
          this.ventaForm.precioTotalVenta = 0;
          this.cantidadItems = 0;
          this.GetProductos();
        });
      }
    })
  }

}
