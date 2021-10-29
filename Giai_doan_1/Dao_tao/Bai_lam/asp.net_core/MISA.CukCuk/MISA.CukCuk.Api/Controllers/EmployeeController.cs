using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using MySqlConnector;
using System.Data;
using MISA.CukCuk.Business.Service;
using MISA.CukCuk.DataAccess;
using MISA.CukCuk.Business.Entity;
using MISA.CukCuk.Business.Properties;
using MISA.CukCuk.Business.Const;
using MISA.CukCuk.Business.Interfaces;

namespace MISA.CukCuk.Api.Controllers
{
    public class EmployeeController : BaseController<Employee>
    {
        IEmployeeService _employeeService;
        //public ServiceResult ServiceResult;

        public EmployeeController(IEmployeeService employeeService) : base(employeeService)
        {
            _employeeService = employeeService;
            //ServiceResult = new ServiceResult();
        }
    }
}
