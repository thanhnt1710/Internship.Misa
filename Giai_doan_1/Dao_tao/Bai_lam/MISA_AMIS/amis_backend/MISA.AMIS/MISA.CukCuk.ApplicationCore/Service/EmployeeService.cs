using MISA.Amis.Business.Const;
using MISA.Amis.Business.Entity;
using MISA.Amis.Business.Interfaces;
using MISA.Amis.Business.Properties;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Amis.Business.Service
{
    /// <summary>
    /// Lớp nhân viên tầng Business implement lớp base
    /// </summary>
    /// /// CreatedBy: ntthanh (27/7/2021)
    public class EmployeeService : BaseService<Employee>, IEmployeeService
    {
        #region Declare
        IEmployeeRepository _employeeRepository;
        ServiceResult _serviceResult;
        public EmployeeService(IEmployeeRepository employeeRepository):base(employeeRepository)
        {
            _employeeRepository = employeeRepository;
            _serviceResult = new ServiceResult() { Validate = true };
        }
        #endregion

        #region Methods

        /// <summary>
        /// Hàm lấy mã nhân viên mới
        /// </summary>
        /// <returns>
        /// ServiceResult lưu thông tin kết quả
        /// </returns>
        public ServiceResult GetNewEmployeeCode()
        {
            var employeeCode = _employeeRepository.GetNewEmployeeCode();
            if(employeeCode == "" || employeeCode == null)//Nếu không lấy được mã NV
            {
                _serviceResult.Validate = true;
                _serviceResult.UserMsg = Resources.ErrorMsg;
                _serviceResult.MISACode = MISACode.MISACodeErrorData;
                _serviceResult.UserMsg = Resources.ErrorMsg;
                _serviceResult.Data = Resources.ErrorMsg_GetNewEmployeeCode;
                //Nếu sai trả về false 
                return _serviceResult;
            }
            else //Nếu đúng trả về serviceResult true
            {
                _serviceResult.Validate = true;
                _serviceResult.UserMsg = Resources.SuccessMsg;
                _serviceResult.DevMsg = "";
                _serviceResult.Data = employeeCode;
                _serviceResult.MISACode = MISACode.MISACodeSuccess;
                return _serviceResult;
            }
        }

        /// <summary>
        /// Hàm lọc nhân viên theo các trường tang BL (validate)
        /// </summary>
        /// <param name="specs">Mã nhân viên, tên, hoặc số điện thoại</param>
        /// <param name="pageSize">Số bản ghi 1 trang</param>
        /// <param name="pageIndex">Số trang</param>
        /// <returns>
        /// object chứa các thông tin 
        ///     TotalPage: Tổng số trang
        ///     TotalRecord: Tổng số bản ghi
        ///     Data: List obj kết quả filter và phân trang
        /// </returns>
        public ServiceResult GetEmployeesFilterPaging(string specs, int? pageSize, int? pageIndex)
        {
            //Validate pageSize, pageOffset bắt buộc có 
            if(pageSize == null || pageSize == 0)
            {
                var namePageSize = "Số bản ghi 1 trang";
                _serviceResult.Validate = false;
                _serviceResult.UserMsg = Resources.ErrorMsg;
                _serviceResult.DevMsg = string.Format(Resources.ValidateError_FilterPagingPageSize, namePageSize);
                _serviceResult.Data = string.Format(Resources.ValidateError_FilterPaging, namePageSize);
                _serviceResult.MISACode = MISACode.MISACodeErrorFilterPaging;
                return _serviceResult;

            }
            else if(pageIndex == null || pageIndex < 0)
            {
                var namePageIndex = "Số trang";
                _serviceResult.Validate = false;
                _serviceResult.UserMsg = Resources.ErrorMsg;
                _serviceResult.DevMsg = string.Format(Resources.ValidateError_FilterPagingPageIndex, namePageIndex);
                _serviceResult.Data = string.Format(Resources.ValidateError_FilterPaging, namePageIndex);
                _serviceResult.MISACode = MISACode.MISACodeErrorFilterPaging;
                return _serviceResult;
            }
            else
            {
                _serviceResult.Validate = true;
                _serviceResult.UserMsg = Resources.SuccessMsg;
                _serviceResult.DevMsg = "";
                _serviceResult.Data = _employeeRepository.GetEmployeesFilterPaging(specs, pageSize, pageIndex);
                _serviceResult.MISACode = MISACode.MISACodeSuccess;
                return _serviceResult;
            }
        }

       
        #endregion
    }
}
