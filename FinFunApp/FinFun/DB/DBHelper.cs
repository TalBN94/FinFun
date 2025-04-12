using Npgsql;
using FinFunApp.Exceptions;
using FinFunApp.Model;
using Microsoft.EntityFrameworkCore;

namespace FinFunApp.DB
{
    public class DBHelper<T>
    {
        private string _connString { get; set; }
        private readonly NpgsqlConnection _connection;
        static DBHelper()
        {
        }

        public DBHelper(IConfiguration configuration)
        {
            this._connString = configuration.GetConnectionString("Postgres");
            _connection = new NpgsqlConnection(_connString);
            
            Console.WriteLine("Connection established");
        }

        public List<T> GetAll<T>(string tableName, Func<NpgsqlDataReader, T> mapFunc)
        {
            var results = new List<T>();
            try
            {
                _connection.Open();
                string query = $"SELECT * FROM {tableName}";
            
                using (NpgsqlCommand command = new NpgsqlCommand(query, _connection))
                using (NpgsqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        results.Add(mapFunc(reader));
                    }
                }
                _connection.Close();
            }
            catch (Exception e)
            {
                //Console.WriteLine($"Error: {e.Message}");
                throw e.InnerException;
            }
            return results;
        }
        
        public void Save<T>(string tableName, T data, string[] columns, object[] values )
        {
            try
            {
                _connection.Open();
                string query = $"INSERT INTO {tableName} ({string.Join(",",columns)}) " +
                               $"VALUES ({string.Join(",",columns.Select((c,i)=> $"@param{i}"))}) " +
                               $"ON CONFLICT (id) DO UPDATE SET "+
                               $"{string.Join(",",columns.Select((c,i)=>$"@param{c}"))};";
                               
                using (var command = new NpgsqlCommand(query, _connection))
                {
                    for (int i = 0; i < columns.Length; i++)
                    {
                        command.Parameters.AddWithValue($"@param{i}", values[i]);
                    }

                    command.ExecuteNonQuery();
                }
                _connection.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error: {e.Message}");
            }
        }
        
        //Delete by Guid 
        public void Delete(string tableName,Guid Id)
        {
            try
            {
                _connection.Open();
                string query = $"DELETE FROM {tableName} WHERE id = @id";

                using (var command = new NpgsqlCommand(query, _connection))
                {
                    command.Parameters.AddWithValue("@id", Id);
                    int rowsAffected = command.ExecuteNonQuery();
                    if (rowsAffected > 0)
                    {
                        Console.WriteLine($"Deleted expense with id: {Id}");
                    }
                    else
                    {
                        Console.WriteLine($"No expense with id: {Id}");
                    }
                }
                _connection.Close();

            }
            catch (Exception e)
            {
                throw e.InnerException;
            }
        }
    }
}

