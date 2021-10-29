using MISA.CukCuk.Business.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CukCuk.Business.Interfaces
{
    public interface IEmployeeRepository : IBaseRepository<Employee>
    {
        public Employee GetEmployeeByCode(string employeeCode);
    }
}
