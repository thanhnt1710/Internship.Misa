using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EMIS.QLTH.Business.Entity;
using EMIS.QLTH.Business.Interfaces;

namespace EMIS.QLTH.Api.Controllers
{
    public class EquipmentRoomController : BaseController<EquipmentRoom>
    {
        IBaseService<EquipmentRoom> _baseService;

        public EquipmentRoomController(IBaseService<EquipmentRoom> baseService) : base(baseService)
        {
            _baseService = baseService;
        }
    }
}
