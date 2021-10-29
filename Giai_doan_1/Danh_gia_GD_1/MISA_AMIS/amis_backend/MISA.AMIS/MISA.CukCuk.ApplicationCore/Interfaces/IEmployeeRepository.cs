using MISA.Amis.Business.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Amis.Business.Interfaces
{
    /// <summary>
    /// interface nhân viên tầng kết nối database
    /// </summary>
    /// CreatedBy: ntthanh (27/7/2021)
    public interface IEmployeeRepository : IBaseRepository<Employee>
    {
        /// <summary>
        /// Hàm lấy mã nhân viên mới
        /// </summary>
        /// <returns>
        /// Mã nhân viên mới 
        /// </returns>
        public string GetNewEmployeeCode();

        /// <summary>
        /// Hàm lọc nhân viên theo các trường taang DL
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
        object GetEmployeesFilterPaging(string specs, int? pageSize, int? pageIndex);

    }
}

