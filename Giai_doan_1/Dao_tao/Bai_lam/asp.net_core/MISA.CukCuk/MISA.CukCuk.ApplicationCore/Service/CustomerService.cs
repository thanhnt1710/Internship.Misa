using MISA.CukCuk.Business.Entity;
using MISA.CukCuk.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CukCuk.Business.Service
{
    
    public class CustomerService : BaseService<Customer>, ICustomerService
    {
        IBaseRepository<Customer> _customerRepository;

        public CustomerService(IBaseRepository<Customer> customerRepository) : base(customerRepository)
        {
            _customerRepository = customerRepository;
        }

        public IEnumerable<Employee> GetCustomerByGroup(Guid groupId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Employee> GetCustomerPaging(int limit, int offset)
        {
            throw new NotImplementedException();
        }
    }
}
