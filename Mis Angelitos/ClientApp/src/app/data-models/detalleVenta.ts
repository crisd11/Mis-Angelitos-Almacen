import { Producto } from "./producto";

export class DetalleVenta {
    id: number;
    producto: Producto;
    cantidadVendida: number;
    precio: number;
    total: number;
    nombre: string;
}