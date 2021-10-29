using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.CukCuk.Business.Interfaces;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MISA.CukCuk.DataAccess
{
    public class BaseRepository<MISAEntity> : IBaseRepository<MISAEntity>
    {
        #region DECLARE
        IConfiguration _configuration;
        //Chuoi ket noi
        string _connectionString = string.Empty;
        protected IDbConnection _dbConnection = null;
        protected string _tableName;

        /// <summary>
        /// Khoi tao cac thong tin can thiet trong hàm khởi tạo 
        /// </summary>
        public BaseRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            //Khai báo thông tin kêt nối tới db
            _connectionString = _configuration.GetConnectionString("MISACukCukConnectionString");
            //Khởi tạo kết nối 
            _dbConnection = new MySqlConnection(_connectionString);
            //Ten bang 
            _tableName = typeof(MISAEntity).Name;
        }

        #endregion
        public int Add(MISAEntity entity)
        {
            //khoi tao ket noi toi Db
            var parameters = MappingDbType(entity);
            //Thuc thi 
            var rowAffects = _dbConnection.Execute($"Proc_Insert{_tableName}", parameters, commandType: CommandType.StoredProcedure);
            //Tra ve ket qua so ban ghi them duoc 
            return rowAffects;
        }

        /*public bool CheckDuplicateEntityCode(string entityCode)
        {
            var isDuplicate = false;
            //Khai bao cau lenh truy van db
            var sqlCommand = $"SELECT {_tableName}Code FROM {_tableName} WHERE {_tableName}Code = @{_tableName}Code";
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add($"@{_tableName}Code", entityCode);
            var res = _dbConnection.QueryFirstOrDefault<string>(sql: sqlCommand, param: parameters);
            if (res != null)
            {
                isDuplicate = true;
            }
            return isDuplicate;
        }*/

        /*public bool CheckEmail(string email)
        {
            Regex regex = new Regex(@"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$",
            RegexOptions.CultureInvariant | RegexOptions.Singleline);
            var isEmail = regex.IsMatch(email);
            return isEmail;
        }*/

        public int Delete(Guid entityId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add($"@{_tableName}Id", entityId);
            //Thuc hien cau lenh voi Dapper
            var res = _dbConnection.Execute($"Proc_Delete{_tableName}ById", param: parameters, commandType: CommandType.StoredProcedure);
            return res;
        }

        public IEnumerable<MISAEntity> GetAll()
        {
            //Buid chuoi cau lenh SQL
            var entities = _dbConnection.Query<MISAEntity>($"Proc_Get{_tableName}s", commandType: CommandType.StoredProcedure);
            //Tra ve du lieu
            return entities;
        }

        public MISAEntity GetById(Guid entityId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add($"@{_tableName}Id", entityId);
            var entity = _dbConnection.QueryFirstOrDefault<MISAEntity>($"Proc_Get{_tableName}ById", param: parameters, commandType: CommandType.StoredProcedure);
            return entity;
        }

        public int Update(MISAEntity entity)
        {
            //khoi tao ket noi toi Db
            var parameters = MappingDbType(entity);
            //Thuc thi 
            var rowAffects = _dbConnection.Execute($"Proc_Update{_tableName}", parameters, commandType: CommandType.StoredProcedure);
            //Tra ve ket qua so ban ghi them duoc 
            return rowAffects;
        }

        private DynamicParameters MappingDbType(MISAEntity entity)
        {
            var properties = entity.GetType().GetProperties();
            var parameters = new DynamicParameters();
            foreach(var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(entity);
                var propertyType = property.PropertyType;
                if(propertyType == typeof(Guid) || propertyType == typeof(Guid?))
                {
                    parameters.Add($"@{propertyName}", propertyValue, DbType.String);
                }
                else
                {
                    parameters.Add($"@{propertyName}", propertyValue);
                }
            }

            return parameters;
        }


        public MISAEntity GetEntityByProperty(string propertyName, object propertyValue)
        {
            var commandSql = $"SELECT * FROM {_tableName} WHERE {propertyName} = '{propertyValue}'";
            var entity = _dbConnection.Query<MISAEntity>(commandSql, commandType: CommandType.Text).FirstOrDefault();
            return entity;
        }
    }
}
