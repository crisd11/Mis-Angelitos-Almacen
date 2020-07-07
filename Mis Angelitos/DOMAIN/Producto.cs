using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mis_Angelitos.DOMAIN
{
    public class Producto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public Marca Marca { get; set; }
        public TipoProductoC TipoProducto { get; set; }
        public float Stock { get; set; }
        public float PorcentajeGanancia { get; set; }
        public bool PorUnidad { get; set; }
        public float HistoricoVendido { get; set; }
    }
}
