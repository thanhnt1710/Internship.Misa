using EMIS.QLTH.Business.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMIS.QLTH.Business.Interfaces
{
    /// <summary>
    /// interface giáo viên tầng business
    /// </summary>
    /// CreatedBy: ntthanh (27/09/2021)
    public interface IEmployeeService : IBaseService<Employee>
    {

        /// <summary>
        /// Hàm lấy số hiệu giáo viên mới
        /// </summary>
        /// <returns>
        /// ServiceResult lưu thông tin kết quả
        /// </returns>
        /// CreatedBy: ntthanh (27/09/2021)
        public ServiceResult GetNewEmployeeCode();

        /// <summary>
        /// Hàm lọc giáo viên theo số hiệu, tên, tổ bộ môn
        /// </summary>
        /// <param name="employeeFilter">Số hiệu, tên</param>
        /// <param name="departmentId">Id tổ bộ môn</param>
        /// <returns>
        /// Data: List obj kết quả filter
        /// </returns>
        /// CreatedBy: ntthanh (27/09/2021)
        ServiceResult GetEmployeesFilter(string employeeFilter, Guid? departmentId);

        /// <summary>
        /// Hàm lọc giáo viên theo tổ bộ môn
        /// </summary>
        /// <param name="departmentId">Id tổ bộ môn</param>
        /// <returns>Data: List obj kết quả filter</returns>
        /// CreatedBy: ntthanh (27/09/2021)
        ServiceResult GetEmployeesFilterByDepartment(Guid departmentId);
    }
}
