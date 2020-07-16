import { DetalleVenta } from "../detalleVenta";
import { Venta } from "../venta";

export class Venta_RegistrarRequest {
    detalleVentas: DetalleVenta[];
    venta: Venta;
}