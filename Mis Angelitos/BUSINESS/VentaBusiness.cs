using Mis_Angelitos.DOMAIN;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Mis_Angelitos.BUSINESS
{
    public class VentaBusiness
    {
        private SqlCommand _comando;
        private SqlConnection _conexion;
        private SqlDataReader _lector;
        public VentaBusiness()
        {
            _comando = new SqlCommand();
            _conexion = new SqlConnection();
            _conexion.ConnectionString = "data source=(local)\\SQLEXPRESS;Initial Catalog=TPC_Rivero;Integrated Security=True";
            _comando.CommandType = System.Data.CommandType.Text;
            _comando.Connection = _conexion;
        }

        public int RegistrarVenta(List<DetalleVenta> detalleVentas, Venta venta)
        {
            try
            {
                string procedure = "Venta_Insert";
                var command = new SqlCommand(procedure, _conexion);
                command.CommandType = CommandType.StoredProcedure;
                SqlParameter param;

                param = command.Parameters.Add("@Fecha", SqlDbType.Date);
                param.Value = DateTime.Now;

                param = command.Parameters.Add("@PrecioTotal", SqlDbType.Real);
                param.Value = venta.PrecioTotalVenta;

                param = command.Parameters.Add("@Id", SqlDbType.Int);
                param.Direction = ParameterDirection.Output;

                _conexion.Open();
                command.ExecuteNonQuery();

                return (int)param.Value;
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

        public void RegistrarDetalles()
        {

        }

        public List<Venta> GetVentas()
        {
            List<Venta> productos = new List<Venta>();
            Venta producto;

            try
            {
                _comando.CommandText = "select p.Id, p.Nombre, p.IdMarca, p.TipoProducto, p.Stock," +
                    " p.PorcentajeGanancia, p.PorUnidad, p.HistoricoVendido, m.Nombre as NombreMarca from Productos p " +
                    "inner join Marcas m on p.IdMarca = m.Id";
                _conexion.Open();
                _lector = _comando.ExecuteReader();

                while (_lector.Read())
                {

                    producto = new Venta();
                    producto.Id = _lector.GetInt32(0);
                    //producto.Nombre = _lector["Nombre"].ToString();
                    /*producto.Marca = new Marca()
                    {
                        Id = _lector.GetInt32(2),
                        Nombre = _lector["NombreMarca"].ToString()
                    };
                    producto.TipoProducto = new TipoProductoC
                    {
                        Id = _lector.GetInt32(3),
                        Nombre = Enum.GetName(typeof(TipoProductoE), _lector.GetInt32(3))
                    };*/
                    //producto.Stock = _lector.GetFloat(4);
                    //producto.PorcentajeGanancia = _lector.GetFloat(5);
                    //producto.PorUnidad = _lector.GetBoolean(6);
                    //producto.HistoricoVendido = _lector.GetFloat(7);
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
