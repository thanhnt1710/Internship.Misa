using EMIS.QLTH.Business.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMIS.QLTH.Business.Interfaces
{
    /// <summary>
    /// interface giáo viên tầng kết nối database
    /// </summary>
    /// CreatedBy: ntthanh (27/09/2021)
    public interface IEmployeeRepository : IBaseRepository<Employee>
    {

        /// <summary>
        /// Hàm lấy mã giáo viên mới
        /// </summary>
        /// <returns>
        /// Số hiệu giáo viên mới 
        /// </returns>
        /// CreatedBy: ntthanh (27/09/2021)
        public string GetNewEmployeeCode();

        /// <summary>
        /// Hàm lọc giáo viên theo tên, số hiệu
        /// </summary>
        /// <param name="employeeFilter">tên, số hiệu</param>
        /// <param name="departmentId">Id tổ bộ môn</param>
        /// <returns>List obj kết quả filter</returns>
        /// CreatedBy: ntthanh (27/09/2021)
        object GetEmployeesFilter(string employeeFilter, Guid? departmentId);

        /// <summary>
        /// Hàm lọc giáo viên theo tổ bộ môn
        /// </summary>
        /// <param name="departmentId">Id tổ bộ môn</param>
        /// <returns>List obj kết quả filter</returns>
        /// CreatedBy: ntthanh (27/09/2021)
        object GetEmployeesFilterByDepartment(Guid departmentId);
    }
}

