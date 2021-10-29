using Microsoft.Extensions.Configuration;
using MISA.CukCuk.Business.Entity;
using MISA.CukCuk.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CukCuk.DataAccess
{
     public class CustomerRepository : BaseRepository<Customer>, ICustomerRepository
     {

        public CustomerRepository(IConfiguration configuration) :base(configuration)
        {
            
        }

        public Customer GetCustomerByCode(string customerCode)
        {
            throw new NotImplementedException();
        }
     }
}
