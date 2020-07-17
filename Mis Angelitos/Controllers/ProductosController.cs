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
        public IEnumerable<Producto> GetProductos()
        {
            return _productosBusiness.GetProductos();
        }

        [Route("getbyfiltros")]
        [HttpGet]
        public IEnumerable<Producto> GetByFiltros([FromQuery] string nombre, [FromQuery] int tipoProducto)
        {
            return _productosBusiness.GetByFiltros(nombre,tipoProducto);
        }

        [Route("create")]
        [HttpPost]
        public void Create([FromQuery]string nombre, [FromQuery]int idMarca, [FromQuery]int tipoProducto, [FromQuery]float stock, [FromQuery]float porcentaje)
        {
            _productosBusiness.Create(nombre,idMarca,tipoProducto,stock,porcentaje);
        }

        [Route("edit")]
        [HttpPost]
        public void Edit([FromQuery] int id, [FromQuery] string nombre, [FromQuery] int idMarca, [FromQuery] int tipoProducto, [FromQuery] float stock, [FromQuery] float porcentaje)
        {
            _productosBusiness.Editar(id, nombre, idMarca, tipoProducto, stock, porcentaje);
        }

        [Route("delete")]
        [HttpPost]
        public void Eliminar([FromQuery] int id)
        {
            _productosBusiness.Eliminar(id);
        }
    }
}
