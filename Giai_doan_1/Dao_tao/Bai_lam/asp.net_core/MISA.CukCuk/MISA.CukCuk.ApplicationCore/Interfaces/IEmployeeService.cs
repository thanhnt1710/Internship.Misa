using MISA.CukCuk.Business.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CukCuk.Business.Interfaces
{
    public interface IEmployeeService : IBaseService<Employee>
    {
        IEnumerable<Employee> GetEmployeePaging(int limit, int offset);
        IEnumerable<Employee> GetEmployeeByDepartment(Guid departmentId);
    }
}
