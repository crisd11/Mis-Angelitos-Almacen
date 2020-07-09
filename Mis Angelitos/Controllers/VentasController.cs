using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mis_Angelitos.BUSINESS;
using Mis_Angelitos.DOMAIN;

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

        [Route("create")]
        [HttpPost]
        public void Create([FromQuery] string nombre, [FromQuery] int idMarca, [FromQuery] int tipoProducto, [FromQuery] float stock, [FromQuery] float porcentaje)
        {
            _ventasBusiness.Create(nombre, idMarca, tipoProducto, stock, porcentaje);
        }
    }
}
