using MISA.CukCuk.Business.Entity;
using MISA.CukCuk.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Api.Controllers
{
    public class CustomerController : BaseController<Customer>
    {
        ICustomerService _customerService;
        //public ServiceResult ServiceResult;

        public CustomerController(ICustomerService customerService) : base(customerService)
        {
            _customerService = customerService;
            //ServiceResult = new ServiceResult();
        }
    }

}
