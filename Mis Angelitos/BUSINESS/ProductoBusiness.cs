using Mis_Angelitos.DOMAIN;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Mis_Angelitos.BUSINESS
{
    public class ProductoBusiness
    {
        private SqlCommand _comando;
        private SqlConnection _conexion;
        private SqlDataReader _lector;
        public ProductoBusiness()
        {
            _comando = new SqlCommand();
            _conexion = new SqlConnection();
            _conexion.ConnectionString = "data source=(local)\\SQLEXPRESS;Initial Catalog=TPC_Rivero;Integrated Security=True";
            _comando.CommandType = System.Data.CommandType.Text;
            _comando.Connection = _conexion;
        }

        public void Create(string nombre, int idMarca, int tipoProducto, float stock, float porcentaje)
        {
            try
            {
                _comando.CommandText = "insert into Productos values (@nombre, @idMarca, @tipoProducto, @stock, @porcentajeGanancia, @porUnidad, @HistoricoVendido)";
                _comando.Parameters.Clear();
                _comando.Parameters.AddWithValue("@nombre", nombre);
                _comando.Parameters.AddWithValue("@idMarca", idMarca);
                _comando.Parameters.AddWithValue("@tipoProducto", tipoProducto);
                _comando.Parameters.AddWithValue("@stock", stock);
                _comando.Parameters.AddWithValue("@porcentajeGanancia", porcentaje);
                _comando.Parameters.AddWithValue("@porUnidad", true);
                _comando.Parameters.AddWithValue("@HistoricoVendido", 0);
                
                _conexion.Open();
                _comando.ExecuteNonQuery();
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

        public List<Producto> GetProductos()
        {
            List<Producto> productos = new List<Producto>();
            Producto producto;

            try
            {
                _comando.CommandText = "select p.Id, p.Nombre, p.IdMarca, p.TipoProducto, p.Stock," +
                    " p.PorcentajeGanancia, p.PorUnidad, p.HistoricoVendido, m.Nombre as NombreMarca from Productos p " +
                    "inner join Marcas m on p.IdMarca = m.Id";
                _conexion.Open();
                _lector = _comando.ExecuteReader();

                while (_lector.Read())
                {
                    
                    producto = new Producto();
                    producto.Id = _lector.GetInt32(0);
                    producto.Nombre = _lector["Nombre"].ToString();
                    producto.Marca = new Marca()
                    {
                        Id = _lector.GetInt32(2),
                        Nombre = _lector["NombreMarca"].ToString()
                    };
                    producto.TipoProducto = new TipoProductoC
                    {
                        Id = _lector.GetInt32(3),
                        Nombre = Enum.GetName(typeof(TipoProductoE),_lector.GetInt32(3))
                    };
                    producto.Stock = _lector.GetFloat(4);
                    producto.PorcentajeGanancia = _lector.GetFloat(5);
                    producto.PorUnidad = _lector.GetBoolean(6);
                    producto.HistoricoVendido = _lector.GetFloat(7);
                    productos.Add(producto);
                }
                return productos;
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
