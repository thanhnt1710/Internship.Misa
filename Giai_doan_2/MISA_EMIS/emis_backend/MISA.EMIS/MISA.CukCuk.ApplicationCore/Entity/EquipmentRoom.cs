using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EMIS.QLTH.Business.Const;

namespace EMIS.QLTH.Business.Entity
{
    /// <summary>
    /// Lớp kho, phòng thiết bị 
    /// Author: ntthanh (17/9/2021)
    /// </summary>
    public class EquipmentRoom : BaseEntity
    {
        #region Properties
        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid EquipmentRoomId { get; set; }

        /// <summary>
        /// Tên kho, phòng
        /// </summary>
        public string EquipmentRoomName { get; set; }
        #endregion
    }
}
