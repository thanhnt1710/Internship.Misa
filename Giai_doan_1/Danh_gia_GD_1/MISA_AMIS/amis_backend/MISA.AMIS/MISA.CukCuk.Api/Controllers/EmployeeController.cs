using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using MySqlConnector;
using System.Data;
using MISA.Amis.Business.Service;
using MISA.Amis.DataAccess;
using MISA.Amis.Business.Entity;
using MISA.Amis.Business.Properties;
using MISA.Amis.Business.Const;
using MISA.Amis.Business.Interfaces;

namespace MISA.Amis.Api.Controllers
{
    public class EmployeeController : BaseController<Employee>
    {
        IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService) : base(employeeService)
        {
            _employeeService = employeeService;
        }

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

        [HttpGet("FilterPaging")]
        public IActionResult GetEmployeesFilterPaging([FromQuery]string specs, [FromQuery] int? pageSize, [FromQuery] int? pageIndex)
        {
            try
            {
                var serviceResult = _employeeService.GetEmployeesFilterPaging(specs, pageSize, pageIndex);
                if (serviceResult.Validate)//Validate thành công 
                {
                    return StatusCode(200, serviceResult);
                }
                else//Validate thất bại 
                {
                    return StatusCode(200, serviceResult);
                }
            }
            catch (Exception e)
            {
                _serviceResult.Validate = false;
                _serviceResult.UserMsg = Resources.ErrorMsg;
                _serviceResult.DevMsg = e.Message;
                _serviceResult.MISACode = MISACode.MISACodeErrorException;
                return StatusCode(500, _serviceResult);
            }
        }
    }
}
