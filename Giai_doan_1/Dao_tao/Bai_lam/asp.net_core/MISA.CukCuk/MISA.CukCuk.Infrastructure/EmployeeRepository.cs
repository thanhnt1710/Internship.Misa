using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.CukCuk.Business.Entity;
using MISA.CukCuk.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CukCuk.DataAccess
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(IConfiguration configuration) : base(configuration)
        {

        }

        public Employee GetEmployeeByCode(string employeeCode)
        {
            var employeeDuplicate = _dbConnection.Query<Employee>($"SELECT * FROM Employee WHERE EmployeeCode = '{employeeCode}'", commandType: CommandType.Text).FirstOrDefault();
            return employeeDuplicate;
        }
    }
}
