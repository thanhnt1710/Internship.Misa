using MISA.CukCuk.Business.Const;
using MISA.CukCuk.Business.Entity;
using MISA.CukCuk.Business.Interfaces;
using MISA.CukCuk.Business.Properties;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CukCuk.Business.Service
{
    public class EmployeeService : BaseService<Employee>, IEmployeeService
    {
        IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository):base(employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        /*public override int Add(Employee employee)
        {
            //Validate
            var isValid = true;
            //1.Check trung ma khach hang
            var employeeDuplicate = _employeeRepository.GetEmployeeByCode(employee.EmployeeCode);
            if(employeeDuplicate != null)
            {
                isValid = false;
            }
            //Check them cac thu 

            if (isValid)
            {
                return base.Add(employee);
            }
            else
            {
                return 0;
            }
            
        }*/

        public IEnumerable<Employee> GetEmployeeByDepartment(Guid departmentId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Employee> GetEmployeePaging(int limit, int offset)
        {
            throw new NotImplementedException();
        }
    }
}
