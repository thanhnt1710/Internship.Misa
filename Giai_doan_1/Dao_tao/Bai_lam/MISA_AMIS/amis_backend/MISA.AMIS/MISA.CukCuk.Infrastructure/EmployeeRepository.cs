using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.Amis.Business.Entity;
using MISA.Amis.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Amis.DataAccess
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {

        public EmployeeRepository(IConfiguration configuration) : base(configuration)
        {

        }

        public string GetNewEmployeeCode()
        {
            var storeName = "Proc_GetNewEmployeeCode";
            var employeeCode = _dbConnection.Query<string>(storeName, commandType: CommandType.StoredProcedure).ToArray();
            return employeeCode[0];
        }

        /// <summary>
        /// Hàm lọc nhân viên theo các trường taang DL
        /// </summary>
        /// <param name="specs">Mã nhân viên, tên</param>
        /// <param name="pageSize">Số bản ghi 1 trang</param>
        /// <param name="pageOffSet">Số trang</param>
        /// <returns>
        /// object chứa các thông tin
        ///     TotalPage: Tổng số trang
        ///     TotalRecord: Tổng số bản ghi
        ///     Data: List obj kết quả filter và phân trang
        /// </returns>
        public object GetEmployeesFilterPaging(string specs, int? pageSize, int? pageIndex)
        {
            //build tham số đầu vào cho store
            DynamicParameters parameters = new DynamicParameters();
            //Khai báo tên store
            var storeName = "Proc_GetEmployeesFilterPaging";
            //Khai báo biến lưu tổng bản ghi, tổng sống trang
            var totalRecord = 0;
            var totalPage = 0;
            //Nếu không truyền specs(null) chuyển thành xâu rỗng
            var input = specs != null ? specs : string.Empty;
            //Add param vào parameters
            parameters.Add("@TotalPage", dbType: DbType.Int32, direction: ParameterDirection.Output);
            parameters.Add("@TotalRecord", dbType: DbType.Int32, direction: ParameterDirection.Output);
            parameters.Add("@EmployeeFilter", input, dbType: DbType.String);
            parameters.Add("@PageSize", pageSize, dbType: DbType.Int32);
            parameters.Add("@PageIndex", pageIndex, dbType: DbType.Int32);
            //Số bản ghi của trang cần tìm
            var employees = _dbConnection.Query<object>(storeName, parameters, commandType: CommandType.StoredProcedure);
            //Kết quả totalRecord, totalPage
            totalPage = parameters.Get<int>("@TotalPage");
            totalRecord = parameters.Get<int>("@TotalRecord");
            //Build object để trả về
            var objectReturn = new
            {
                TotalPage = totalPage,
                TotalRecord = totalRecord,
                Data = employees,
            };
            return objectReturn;
        }
    }
}
