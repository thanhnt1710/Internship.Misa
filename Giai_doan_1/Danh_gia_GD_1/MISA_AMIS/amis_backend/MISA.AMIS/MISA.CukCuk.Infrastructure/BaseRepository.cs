using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.Amis.Business.Entity;
using MISA.Amis.Business.Enum;
using MISA.Amis.Business.Interfaces;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MISA.Amis.DataAccess
{
    /// <summary>
    /// Lớp base thực thi interface repository 
    /// </summary>
    /// <typeparam name="MISAEntity"></typeparam>
    /// CreatedBy: ntthanh (19/8/2021)
    public class BaseRepository<MISAEntity> : IBaseRepository<MISAEntity>, IDisposable where MISAEntity:BaseEntity
    {
        #region Declare
        IConfiguration _configuration;
        //Chuoi ket noi
        string _connectionString = string.Empty;
        protected IDbConnection _dbConnection = null;
        protected string _tableName;

        /// <summary>
        /// Hàm khởi tạo: Khoi tao cac thong tin can thiet 
        /// </summary>
        /// CreatedBy: ntthanh (19/8/2021)
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

        #region Methods
        /// <summary>
        /// Them moi nhan vien 
        /// </summary>
        /// <param name="entity">obj chứa thông tin entity thêm mới</param>
        /// <returns>Số dòng bị ảnh hưởng</returns>
        /// CreatedBy: ntthanh (19/8/2021)
        public int Add(MISAEntity entity)
        {
            var rowAffects = 0;
            _dbConnection.Open();
            using(var transaction = _dbConnection.BeginTransaction())
            {
                try 
                { 
                    //khoi tao ket noi toi Db
                    var parameters = MappingDbType(entity);
                    //Thuc thi 
                    rowAffects = _dbConnection.Execute($"Proc_Insert{_tableName}", parameters, transaction, commandType: CommandType.StoredProcedure);
                    if (rowAffects > 0)//Nếu thành công
                    {
                        transaction.Commit();
                    }
                    else//Nếu thất bại
                    {
                        transaction.Rollback();
                    }
                }
                catch(Exception e)
                {
                    transaction.Rollback();
                }
            }
            return rowAffects;
        }

        /// <summary>
        /// Xóa nhân viên theo khóa chính
        /// </summary>
        /// <param name="entityId">Khóa chính</param>
        /// <returns>Số dòng bị ảnh hưởng</returns>
        /// CreatedBy: ntthanh (19/8/2021)
        public int Delete(Guid entityId)
        {
            var rowAffects = 0;
            _dbConnection.Open();
            using (var transaction = _dbConnection.BeginTransaction())
            {
                try
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add($"@{_tableName}Id", entityId);
                    //Thuc hien cau lenh voi Dapper
                    rowAffects = _dbConnection.Execute($"Proc_Delete{_tableName}ById", param: parameters, transaction, commandType: CommandType.StoredProcedure);
                    if(rowAffects > 0)//Nếu thành công
                    {
                        transaction.Commit();
                    }
                    else//Nếu thất bại
                    {
                        transaction.Rollback();
                    }
                }
                catch(Exception e)
                {
                    transaction.Rollback();
                }
            }
            return rowAffects;
        }

        /// <summary>
        /// Lấy toàn bộ nhân viên
        /// </summary>
        /// <returns>List obj kết quả</returns>
        /// CreatedBy: ntthanh (19/8/2021)
        public IEnumerable<MISAEntity> GetAll()
        {
            //Buid chuoi cau lenh SQL
            var entities = _dbConnection.Query<MISAEntity>($"Proc_Get{_tableName}s", commandType: CommandType.StoredProcedure);
            //Tra ve du lieu
            return entities;
        }

        /// <summary>
        /// Lấy thông tin nhân viên theo khóa chính
        /// </summary>
        /// <param name="entityId">Khóa chính</param>
        /// <returns>obj entity lấy được theo Id</returns>
        /// CreatedBy: ntthanh (19/8/2021)
        public MISAEntity GetById(Guid entityId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add($"@{_tableName}Id", entityId);
            var entity = _dbConnection.QueryFirstOrDefault<MISAEntity>($"Proc_Get{_tableName}ById", param: parameters, commandType: CommandType.StoredProcedure);
            return entity;
        }
        
        /// <summary>
        /// Sua thong tin nhan vien 
        /// </summary>
        /// <param name="entity">obj chứa thông tin entity cần sửa</param>
        /// <returns>Số dòng bị ảnh hưởng</returns>
        /// CreatedBy: ntthanh (19/8/2021)
        public int Update(MISAEntity entity)
        {
            var rowAffects = 0;
            _dbConnection.Open();
            using (var transaction = _dbConnection.BeginTransaction())
            {
                try
                {
                    //khoi tao ket noi toi Db
                    var parameters = MappingDbType(entity);
                    //Thuc thi 
                    rowAffects = _dbConnection.Execute($"Proc_Update{_tableName}", parameters, transaction, commandType: CommandType.StoredProcedure);
                    if (rowAffects > 0)//Nếu thành công
                    {
                        transaction.Commit();
                    }
                    else//Nếu thất bại
                    {
                        transaction.Rollback();
                    }
                }
                catch(Exception e)
                {
                    transaction.Rollback();
                }
            }
            //Tra ve ket qua so ban ghi them duoc 
            return rowAffects;
        }

        /// <summary>
        /// Thêm Property đã chuyển đổi kiểu phù hơp vào DynamicParameters để thực thi lệnh sql tới database
        /// </summary>
        /// <param name="entity">obj entity</param>
        /// <returns>parameters</returns>
        /// CreatedBy: ntthanh (19/8/2021)
        private DynamicParameters MappingDbType(MISAEntity entity)
        {
            //Lấy cac property
            var properties = entity.GetType().GetProperties();
            var parameters = new DynamicParameters();
            //Duyệt qua các property
            foreach(var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(entity);
                var propertyType = property.PropertyType;
                //Mếu là kiểu guid
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

        /// <summary>
        /// Lấy thông tin obj entity bằng property
        /// </summary>
        /// <param name="entity">entity</param>
        /// <param name="property">thuộc tính</param>
        /// <returns>entity</returns>
        /// CreatedBy: ntthanh (19/8/2021)
        public MISAEntity GetEntityByProperty(MISAEntity entity, PropertyInfo property)
        {
            DynamicParameters parameters = new DynamicParameters();
            //Tên thuộc tính
            var propertyName = property.Name;
            //Giá trị thuộc tính
            var propertyValue = property.GetValue(entity);
            //Id (khóa chính) cua entity 
            var keyValue = entity.GetType().GetProperty($"{_tableName}Id").GetValue(entity);

            parameters.Add($"@PropertyValue", propertyValue);
            parameters.Add($"@PropertyName", propertyName);
            parameters.Add($"@KeyValue", keyValue);

            var commandQuery = string.Empty;
            //Nếu là thêm mới thì lấy tất cả 
            if(entity.EntityState == EntityState.AddNew)
            {
                commandQuery = $"SELECT * FROM {_tableName} WHERE {propertyName} = @PropertyValue";
            }
            //Nếu là sửa thì trừ chính nó ra và lấy tất cả 
            else if(entity.EntityState == EntityState.Update)
            {
                commandQuery = $"SELECT * FROM {_tableName} WHERE {propertyName} = @PropertyValue AND {_tableName}Id <> @KeyValue";
            }
            else
            {
                return null;
            }
            var entityReturn = _dbConnection.Query<MISAEntity>(commandQuery, param: parameters, commandType: CommandType.Text).FirstOrDefault();
            return entityReturn;
        }

        //Đóng kết nối đến Database
        public void Dispose()
        {
            if(_dbConnection.State == ConnectionState.Open)
            {
                _dbConnection.Close();
            }
        }
        #endregion
    }
}
