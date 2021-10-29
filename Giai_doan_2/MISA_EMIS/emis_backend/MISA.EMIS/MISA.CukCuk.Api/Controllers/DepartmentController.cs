using EMIS.QLTH.Business.Entity;
using EMIS.QLTH.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EMIS.QLTH.Api.Controllers
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
