using MISA.CukCuk.Business.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CukCuk.Business.Interfaces
{
    public interface ICustomerRepository: IBaseRepository<Customer>
    {
        public Customer GetCustomerByCode(string customerCode);
    }
}
