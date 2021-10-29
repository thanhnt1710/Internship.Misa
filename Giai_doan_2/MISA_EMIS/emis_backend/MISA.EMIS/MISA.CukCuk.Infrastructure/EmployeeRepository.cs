using Dapper;
using Microsoft.Extensions.Configuration;
using EMIS.QLTH.Business.Entity;
using EMIS.QLTH.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMIS.QLTH.DataAccess
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {

        public EmployeeRepository(IConfiguration configuration) : base(configuration) { }

        /// <summary>
        /// Hàm số hiệu giáo viên mới
        /// </summary>
        /// <returns>
        /// Số hiệu giáo viên mới
        /// </returns>
        /// CreatedBy: ntthanh (27/09/2021)
        public string GetNewEmployeeCode()
        {
            var storeName = "Proc_GetNewEmployeeCode";
            var employeeCode = _dbConnection.Query<string>(storeName, commandType: CommandType.StoredProcedure).ToArray();
            return employeeCode[0];
        }

        /// <summary>
        /// Hàm lọc giáo viên theo tên, số hiệu, tổ bộ môn
        /// </summary>
        /// <param name="employeeFilter">tên, số hiệu</param>
        /// <param name="departmentId">Id tổ bộ môn</param>
        /// <returns>List obj kết quả filter</returns>
        /// CreatedBy: ntthanh (27/09/2021)
        public object GetEmployeesFilter(string employeeFilter, Guid? departmentId)
        {
            //build tham số đầu vào cho store
            DynamicParameters parameters = new DynamicParameters();
            //Khai báo tên store
            var storeName = "Proc_GetEmployeesFilter";
            //Nếu không truyền specs(null) chuyển thành xâu rỗng
            var input = employeeFilter != null ? employeeFilter : string.Empty;
            
            //Add param vào parameters
            parameters.Add("@EmployeeFilter", input, dbType: DbType.String);
            parameters.Add("@DepartmentId", departmentId, DbType.Guid);

            var employees = _dbConnection.Query<object>(storeName, parameters, commandType: CommandType.StoredProcedure);
            return employees;
        }

        /// <summary>
        /// Hàm lọc giáo viên theo tổ bộ môn
        /// </summary>
        /// <param name="departmentId">Id tổ bộ môn</param>
        /// <returns>List obj kết quả filter</returns>
        /// CreatedBy: ntthanh (27/09/2021)
        public object GetEmployeesFilterByDepartment(Guid departmentId)
        {
            //build tham số đầu vào cho store
            DynamicParameters parameters = new DynamicParameters();
            //Khai báo tên store
            var storeName = "Proc_GetEmployeesFilterByDepartment";
            //Add param vào parameters
            parameters.Add("@DepartmentId", departmentId, dbType: DbType.Guid);

            var employees = _dbConnection.Query<object>(storeName, parameters, commandType: CommandType.StoredProcedure);
            return employees;
        }
    }
}
