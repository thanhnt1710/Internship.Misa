using MISA.Amis.Business.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Amis.Business.Interfaces
{
    /// <summary>
    /// interface khách hàng tầng business
    /// </summary>
    /// CreatedBy: ntthanh (27/7/2021)
    public interface IEmployeeService : IBaseService<Employee>
    {
        /// <summary>
        /// Hàm lấy mã nhân viên mới
        /// </summary>
        /// <returns>
        /// ServiceResult lưu thông tin kết quả
        /// </returns>
        public ServiceResult GetNewEmployeeCode();

        /// <summary>
        /// Hàm lọc nhân viên theo các trường tang BL (validate)
        /// </summary>
        /// <param name="specs">Mã nhân viên, tên</param>
        /// <param name="pageSize">Số bản ghi 1 trang</param>
        /// <param name="pageIndex">Số trang</param>
        /// <returns>
        /// object chứa các thông tin 
        ///     TotalPage: Tổng số trang
        ///     TotalRecord: Tổng số bản ghi
        ///     Data: List obj kết quả filter và phân trang
        /// </returns>
        ServiceResult GetEmployeesFilterPaging(string specs, int? pageSize, int? pageIndex);
    }
}
