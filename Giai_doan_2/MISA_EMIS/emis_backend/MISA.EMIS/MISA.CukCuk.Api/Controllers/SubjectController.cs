using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EMIS.QLTH.Business.Entity;
using EMIS.QLTH.Business.Interfaces;

namespace EMIS.QLTH.Api.Controllers
{
    public class SubjectController : BaseController<Subject>
    {
        IBaseService<Subject> _baseService;

        public SubjectController(IBaseService<Subject> baseService) : base(baseService)
        {
            _baseService = baseService;
        }
    }
}
