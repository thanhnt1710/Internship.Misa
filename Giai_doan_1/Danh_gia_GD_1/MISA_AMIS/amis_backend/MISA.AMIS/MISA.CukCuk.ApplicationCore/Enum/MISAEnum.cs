using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Amis.Business.Enum
{
    /// <summary>
    /// Gioi tinh 
    /// </summary>
    public enum Gender
    {
        /// <summary>
        /// Nam
        /// </summary>
        Male = 0,

        /// <summary>
        /// Nữ
        /// </summary>
        Female = 1,

        /// <summary>
        /// Khác
        /// </summary>
        Other = 2,
    }

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
