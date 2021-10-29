using MISA.CukCuk.Business.Entity;
using MISA.CukCuk.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Api.Controllers
{
    public class PositionController : BaseController<Position>
    {
        IBaseService<Position> _baseService;
        //public ServiceResult ServiceResult;

        public PositionController(IBaseService<Position> baseService) : base(baseService)
        {
            _baseService = baseService;
            //ServiceResult = new ServiceResult();
        }
    }
}
