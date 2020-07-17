using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mis_Angelitos.BUSINESS;
using Mis_Angelitos.DOMAIN;
using Mis_Angelitos.DOMAIN.Request;

namespace Mis_Angelitos.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class VentasController : ControllerBase
    {
        private VentaBusiness _ventasBusiness;

        public VentasController()
        {
            _ventasBusiness = new VentaBusiness();
        }

        [Route("getventas")]
        [HttpGet]
        public IEnumerable<Venta> GetVentas()
        {
            return _ventasBusiness.GetVentas();
        }

        [Route("createventa")]
        [HttpPost]
        public int CreateVenta([FromQuery] int precioTotalVenta)
        {
            return _ventasBusiness.RegistrarVenta(precioTotalVenta);
        }

        [Route("createdetalle")]
        [HttpPost]
        public void CreateDetalle([FromQuery] int idVenta, [FromQuery] int idProducto, [FromQuery] int cantidadVendida, [FromQuery] int precio)
        {
            _ventasBusiness.RegistrarDetalles(idVenta, idProducto, cantidadVendida, precio);
        }
    }
}
