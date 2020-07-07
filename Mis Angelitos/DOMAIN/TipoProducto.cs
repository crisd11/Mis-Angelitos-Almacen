using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mis_Angelitos.DOMAIN
{
    public enum TipoProductoE
    {
        Fiambreria,
        Almacen,
        Bebidas,
        Snacks
    }

    public class TipoProductoC
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
    }
}
