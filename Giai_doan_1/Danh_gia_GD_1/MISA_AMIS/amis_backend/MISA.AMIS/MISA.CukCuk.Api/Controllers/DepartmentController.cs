using MISA.Amis.Business.Entity;
using MISA.Amis.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.Amis.Api.Controllers
{
    public class DepartmentController : BaseController<Department>
    {
        IBaseService<Department> _baseService;
        //public ServiceResult ServiceResult;

        public DepartmentController(IBaseService<Department> baseService) : base(baseService)
        {
            _baseService = baseService;
            //ServiceResult = new ServiceResult();
        }
    }
}
