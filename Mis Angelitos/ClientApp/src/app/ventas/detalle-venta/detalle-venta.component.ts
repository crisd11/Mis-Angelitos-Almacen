import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from"@angular/material";
import { DetalleVenta } from '../../data-models/detalleVenta';
import { Producto } from '../../data-models/producto';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ProductoService } from '../../servicios/producto.service';
import { VentaService } from '../../servicios/venta.service';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.css']
})
export class DetalleVentaComponent implements OnInit {

  form: FormGroup;
  newDetalleVenta: DetalleVenta;
  productos: Producto[];
  isValid: boolean;

  @Output()
  onSubmitDetalle: EventEmitter<DetalleVenta> = new EventEmitter<DetalleVenta>();

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<DetalleVentaComponent>,
  private productoService: ProductoService, private ventaService: VentaService)
  { 
    this.newDetalleVenta = new DetalleVenta();
    this.newDetalleVenta.producto = new Producto();
    this.newDetalleVenta.id = 0;

    this.productos = [];

    this.form = new FormGroup({
      producto: new FormControl('', Validators.required),
      precio: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      cantidad: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      total: new FormControl(0)
    })
  }

  ngOnInit() {
    this.GetProductos();
    
    if(this.data.detalleIndex == null){
      this.newDetalleVenta.id = 0;
      this.newDetalleVenta.total = 0;
    }
    else{
      this.newDetalleVenta = this.ventaService.detalleVentas[this.data.detalleIndex];
    }
  }

  GetProductos(): void {
    this.productoService.getProductos().subscribe(resp => {
      this.productos = resp;
    })
  }

  updateTotal(){
    this.newDetalleVenta.total = parseFloat((this.newDetalleVenta.precio * this.newDetalleVenta.cantidadVendida).toFixed(2));
  }

  onSubmit(){
    //if(this.validateForm(this.newDetalleVenta.value))
    this.dialogRef.close(this.newDetalleVenta);
  }

  Create(){
    //if(this.validateForm(this.newDetalleVenta.value))
    this.ventaService.detalleVentas.push(this.newDetalleVenta);
    this.dialogRef.close();
  }

  validateForm(form: DetalleVenta){
    this.isValid = true;
    if(form.producto.id == 0){
      this.isValid = false;
    }
    else if(form.cantidadVendida == 0){
      this.isValid = false;
    }
      return this.isValid;
  }
}
