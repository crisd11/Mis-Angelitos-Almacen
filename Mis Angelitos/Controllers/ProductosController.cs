using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mis_Angelitos.DOMAIN;
using Mis_Angelitos.BUSINESS;

namespace Mis_Angelitos.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private ProductoBusiness _productosBusiness;

        public ProductosController()
        {
            _productosBusiness = new ProductoBusiness();
        }

        [Route("getproductos")]
        [HttpGet]
        public IEnumerable<Producto> GetMarcas()
        {
            return _productosBusiness.GetProductos();
        }
    }
}
