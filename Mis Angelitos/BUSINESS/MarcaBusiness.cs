using Mis_Angelitos.DOMAIN;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Mis_Angelitos.BUSINESS
{
    public class MarcaBusiness
    {
        private SqlCommand _comando;
        private SqlConnection _conexion;
        private SqlDataReader _lector;
        public MarcaBusiness()
        {
            _comando = new SqlCommand();
            _conexion = new SqlConnection();
            _conexion.ConnectionString = "data source=(local)\\SQLEXPRESS;Initial Catalog=TPC_Rivero;Integrated Security=True";
            _comando.CommandType = System.Data.CommandType.Text;
            _comando.Connection = _conexion;
        }

        /*public void Create(string nombre)
        {
                var marca = _context.Marcas.Where(x => x.Nombre == nombre).SingleOrDefault();
                if (marca == null)
                {
                    var nuevaMarca = new Marca()
                    {
                        Nombre = nombre
                    };
                    _context.Marcas.Add(nuevaMarca);
                    _context.SaveChanges();
                }
        }*/

        public List<Marca> GetMarcas()
        {
            List<Marca> marcas = new List<Marca>();
            Marca marca;

            try
            {
                _comando.CommandText = "select * from Marcas";
                _conexion.Open();
                _lector = _comando.ExecuteReader();

                while (_lector.Read())
                {
                    marca = new Marca();
                    marca.Id = _lector.GetInt32(0);
                    marca.Nombre = _lector["Nombre"].ToString();

                    marcas.Add(marca);
                }
                return marcas;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                _conexion.Close();
            }
        }
    }
}
