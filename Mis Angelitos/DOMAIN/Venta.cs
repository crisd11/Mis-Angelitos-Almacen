using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mis_Angelitos.DOMAIN
{
    public class Venta
    {
        public int Id { get; set; }
        public List<DetalleVenta> DetalleVenta { get; set; }
        public DateTime FechaVenta { get; set; }
        public float PrecioTotalVenta { get; set; }
    }
}
