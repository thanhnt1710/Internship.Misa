using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMIS.QLTH.Business.Enum
{
    /// <summary>
    /// Xác định trạng thái Object
    /// </summary>
    public enum EntityState
    {
        //Thêm mới
        AddNew = 1,

        //Chỉnh sửa
        Update = 2,

        //Xóa
        Delete = 3,
    }
}
