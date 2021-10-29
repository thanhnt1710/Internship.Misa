using EMIS.QLTH.Business.Const;
using EMIS.QLTH.Business.Entity;
using EMIS.QLTH.Business.Enum;
using EMIS.QLTH.Business.Interfaces;
using EMIS.QLTH.Business.Properties;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMIS.QLTH.Business.Service
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

        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        /// <param name="employeeRepository"></param>
        /// CreatedBy: ntthanh (27/09/2021)
        public EmployeeService(IEmployeeRepository employeeRepository):base(employeeRepository)
        {
            _employeeRepository = employeeRepository;
            _serviceResult = new ServiceResult() { Validate = true };
        }
        #endregion

        #region Methods

        

        /// <summary>
        /// Hàm lấy số hiệu giáo viên mới
        /// </summary>
        /// <returns>
        /// ServiceResult lưu thông tin kết quả
        /// </returns>
        /// CreatedBy: ntthanh (27/09/2021)
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
        /// Hàm lọc giáo viên theo số hiệu, tên
        /// </summary>
        /// <param name="employeeFilter">Số hiệu, tên</param>
        /// <param name="departmentId">Id tổ bộ môn</param>
        /// <returns>
        /// List obj kết quả filter
        /// </returns>
        /// CreatedBy: ntthanh (27/09/2021)
        public ServiceResult GetEmployeesFilter(string employeeFilter, Guid? departmentId)
        {
            _serviceResult.Validate = true;
            _serviceResult.UserMsg = Resources.SuccessMsg;
            _serviceResult.DevMsg = "";
            _serviceResult.Data = _employeeRepository.GetEmployeesFilter(employeeFilter, departmentId);
            _serviceResult.MISACode = MISACode.MISACodeSuccess;
            return _serviceResult;
        }

        /// <summary>
        /// Hàm lọc giáo viên theo tổ bộ môn
        /// </summary>
        /// <param name="departmentId">Id tổ bộ môn</param>
        /// <returns>Data: List obj kết quả filter</returns>
        public ServiceResult GetEmployeesFilterByDepartment(Guid departmentId)
        {
            _serviceResult.Validate = true;
            _serviceResult.UserMsg = Resources.SuccessMsg;
            _serviceResult.DevMsg = "";
            _serviceResult.Data = _employeeRepository.GetEmployeesFilterByDepartment(departmentId);
            _serviceResult.MISACode = MISACode.MISACodeSuccess;
            return _serviceResult;
        }

        #endregion
    }
}
