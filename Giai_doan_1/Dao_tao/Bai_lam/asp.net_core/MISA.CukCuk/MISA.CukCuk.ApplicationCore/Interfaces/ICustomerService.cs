using MISA.CukCuk.Business.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CukCuk.Business.Interfaces
{
    public interface ICustomerService : IBaseService<Customer>
    {
        IEnumerable<Employee> GetCustomerPaging(int limit, int offset);
        IEnumerable<Employee> GetCustomerByGroup(Guid groupId);
    }
}
