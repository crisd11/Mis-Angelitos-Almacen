using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mis_Angelitos.DOMAIN
{
    public class DetalleVenta
    {
        public int Id { get; set; }
        public Producto Producto { get; set; }
        public float CantidadVendida { get; set; }
        public float Precio { get; set; }
    }
}
