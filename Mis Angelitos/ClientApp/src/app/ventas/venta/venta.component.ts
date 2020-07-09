import { Component, OnInit, ViewChild } from '@angular/core';
import { VentaService } from '../../servicios/venta.service';
import { NgForm } from '@angular/forms';
import { Venta } from '../../data-models/venta';
import { DetalleVenta } from '../../data-models/detalleVenta';
import { Producto } from '../../data-models/producto';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DetalleVentaComponent } from '../detalle-venta/detalle-venta.component';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  ventaForm: Venta;
  detallesVenta: DetalleVenta[];
  cantidadItems: number;
  totalVenta:number;
  fecha: string;
  //@ViewChild(DetalleVentaComponent)
  //private detalleVentaComponent: DetalleVentaComponent;
  
  constructor(private ventaService: VentaService, private dialog: MatDialog) { 
    this.ventaForm = new Venta();
    this.fecha = new Date().toDateString();
    //this.ventaForm.fechaVenta =  new Date();
    this.ventaForm.precioTotalVenta = 0;
    this.detallesVenta = [];
    this.cantidadItems = 0;
    this.totalVenta = 0;
  }

  ngOnInit() {
  }

  agregarEditarDetalle(detalleIndex: number, ventaId: number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { detalleIndex, ventaId }
    this.dialog.open(DetalleVentaComponent, dialogConfig).afterClosed().subscribe(data => {
      this.detallesVenta.push(data);
      this.cantidadItems++;
      this.actualizarTotalVenta();
    })
  }

  abrirComponente(){
    this.detalleVentaComponent.show()
  }
  agregarDetalle(event){
    this.detallesVenta.push(event);
  }
  /*resetssForm(form?: NgForm){
    if(form == null){
      form.reset();
      this.ventaService.formData = {
        id: null,
        detalleVenta: [],
        fechaVenta: null,
        precioTotalVenta:0
      }
    }
  }*/
  actualizarTotalVenta(){
    
    this.ventaForm.precioTotalVenta = this.detallesVenta.reduce((prev, curr) => {
      return prev + curr.total;
    },0);
    this.ventaForm.precioTotalVenta = parseFloat(this.ventaForm.precioTotalVenta.toFixed(2));
  }

}
