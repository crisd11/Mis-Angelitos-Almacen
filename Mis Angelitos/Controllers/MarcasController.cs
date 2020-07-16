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
    public class MarcasController : ControllerBase
    {
        private MarcaBusiness _marcasBusiness;

        public MarcasController()
        {
            _marcasBusiness = new MarcaBusiness();
        }

        [Route("getmarcas")]
        [HttpGet]
        public IEnumerable<Marca> GetMarcas()
        {
            return _marcasBusiness.GetMarcas();
        }

        [Route("create/{nombre}")]
        [HttpPost]
        public void Create(string nombre) 
        {
            _marcasBusiness.Create(nombre);
        }

        [Route("edit")]
        [HttpPost]
        public void Edit([FromQuery] string nombre, [FromQuery] int id)
        {
            _marcasBusiness.Editar(nombre, id);
        }

        [Route("delete")]
        [HttpPost]
        public void Eliminar([FromQuery] int id)
        {
            _marcasBusiness.Eliminar(id);
        }
    }
}
