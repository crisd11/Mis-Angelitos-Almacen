import { DetalleVenta } from "./detalleVenta";

export class Venta {
    id: number;
    detalleVenta: DetalleVenta[];
    fechaVenta: Date;
    precioTotalVenta: number;
}