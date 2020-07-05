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

        //private readonly AngelitosContext context;

        /*public MarcaController()
        {
            _marcaBusiness = new MarcaBusiness();
        }

        [HttpGet]
        public IEnumerable<Marca> GetMarcas()
        {
            return new Marca();//_marcaBusiness.GetMarcas();
        }*/
    }
}
