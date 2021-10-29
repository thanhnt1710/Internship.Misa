using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using MySqlConnector;
using System.Data;
using EMIS.QLTH.Business.Service;
using EMIS.QLTH.DataAccess;
using EMIS.QLTH.Business.Entity;
using EMIS.QLTH.Business.Properties;
using EMIS.QLTH.Business.Const;
using EMIS.QLTH.Business.Interfaces;

namespace EMIS.QLTH.Api.Controllers
{
    public class EmployeeController : BaseController<Employee>
    {
        IEmployeeService _employeeService;

        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        /// <param name="employeeService"></param>
        /// CreatedBy: ntthanh (27/09/2021)
        public EmployeeController(IEmployeeService employeeService) : base(employeeService)
        {
            _employeeService = employeeService;
        }

        /// <summary>
        /// Lấy số hiệu giáo viên mới
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: ntthanh (27/09/2021)
        [HttpGet("GetNewEmployeeCode")]
        public IActionResult GetNewEmployeeCode()
        {
            try
            {
                var serviceResult = _employeeService.GetNewEmployeeCode();
                if(serviceResult.MISACode == MISACode.MISACodeSuccess)//Nếu lấy mã thành công 
                {
                    return StatusCode(200, serviceResult);
                }
                else //Nếu lấy mã thất bại 
                {
                    return StatusCode(200, serviceResult);
                }
            }
            catch(Exception e)
            {
                _serviceResult.Validate = true;
                _serviceResult.UserMsg = Resources.ErrorMsg;
                _serviceResult.DevMsg = e.Message;
                _serviceResult.MISACode = MISACode.MISACodeErrorException;
                return StatusCode(500, _serviceResult);
            }
        }

        /// <summary>
        /// Lọc giáo viên theo tên, số hiệu, tổ bộ môn
        /// </summary>
        /// <param name="employeeFilter">tên, số hiệu</param>
        /// <param name="departmentId">Id tổ bộ môn</param>
        /// <returns></returns>
        /// CreatedBy: ntthanh (27/09/2021)
        [HttpGet("Filter")]
        public IActionResult GetEmployeesFilter([FromQuery] string employeeFilter, [FromQuery] Guid? departmentId)
        {
            try
            {
                var serviceResult = _employeeService.GetEmployeesFilter(employeeFilter, departmentId);
                return StatusCode(200, serviceResult);
            }
            catch (Exception e)
            {
                _serviceResult.Validate = true;
                _serviceResult.UserMsg = Resources.ErrorMsg;
                _serviceResult.DevMsg = e.Message;
                _serviceResult.MISACode = MISACode.MISACodeErrorException;
                return StatusCode(500, _serviceResult);
            }
        }

        /// <summary>
        /// Lọc giáo viên theo tổ bộ môn
        /// </summary>
        /// <param name="departmentId">Id tổ bộ môn</param>
        /// <returns></returns>
        /// CreatedBy: ntthanh (27/09/2021)
        [HttpGet("FilterByDepartment")]
        public IActionResult GetEmployeesByDepartment([FromQuery] Guid departmentId)
        {
            try
            {
                var serviceResult = _employeeService.GetEmployeesFilterByDepartment(departmentId);
                return StatusCode(200, serviceResult);
            }
            catch (Exception e)
            {
                _serviceResult.Validate = true;
                _serviceResult.UserMsg = Resources.ErrorMsg;
                _serviceResult.DevMsg = e.Message;
                _serviceResult.MISACode = MISACode.MISACodeErrorException;
                return StatusCode(500, _serviceResult);
            }
        }
    }
}
