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
  isValid: boolean;
  
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

    //Detalle
    this.newDetalleVenta = new DetalleVenta();
    this.newDetalleVenta.producto = new Producto();
    this.newDetalleVenta.id = 0;

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
    this.detallesVenta.push(this.newDetalleVenta);
    this.cantidadItems++;
    this.actualizarTotalVenta();
    this.newDetalleVenta = new DetalleVenta();
    this.newDetalleVenta.producto = new Producto();
    this.newDetalleVenta.id = 0;
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

  cerrarVenta(){
    this.request.venta.precioTotalVenta = this.ventaForm.precioTotalVenta;
    this.ventaService.create(this.request).subscribe(id => {
      this.ventaForm.id = id;
      //msj cuando se ingresa correctamente, pasarle los detallesventa y armar ese metodo
    })
  }

}
