import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { MarcasComponent } from './marcas/marcas.component';
import { ProductosComponent } from './productos/productos.component';
import { VentasComponent } from './ventas/ventas.component';
import { VentaComponent } from './ventas/venta/venta.component';
import { DetalleVentaComponent } from './ventas/detalle-venta/detalle-venta.component';

import { MarcaService } from './servicios/marca.service';
import { VentaService } from './servicios/venta.service';

import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    MarcasComponent,
    ProductosComponent,
    VentasComponent,
    VentaComponent,
    DetalleVentaComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: VentaComponent, pathMatch: 'full' },
      { path: 'marcas', component: MarcasComponent },
      { path: 'productos', component: ProductosComponent},
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'ventas', component: VentasComponent },
      {path: 'venta', children:[
        { path:'', component: VentaComponent },
        { path:'editar/:id', component: VentaComponent }
      ]}
    ]),
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
  ],
  entryComponents: [DetalleVentaComponent],
  providers: [MarcaService, VentaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
