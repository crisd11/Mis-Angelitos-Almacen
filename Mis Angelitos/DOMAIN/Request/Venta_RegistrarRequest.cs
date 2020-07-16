using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mis_Angelitos.DOMAIN.Request
{
    [Serializable]
    public class Venta_RegistrarRequest
    {
        public List<DetalleVenta> DetalleVentas { get; set; }
        public Venta Venta { get; set; }
    }
}
