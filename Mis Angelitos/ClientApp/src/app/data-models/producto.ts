import { Marca } from "./marca"
import { TipoProducto } from "./tipoProducto";

export class Producto {
    id : number;
    nombre: string;
    marca : Marca;
    tipoProducto: TipoProducto;
    stock: number;
    porcentajeGanancia: number;
    porUnidad: boolean;
    historicoVendido: number;
}