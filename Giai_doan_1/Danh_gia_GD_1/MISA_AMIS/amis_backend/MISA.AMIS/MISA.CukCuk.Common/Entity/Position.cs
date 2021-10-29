using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CukCuk.Common.Entity
{
    /// <summary>
    /// Lớp vị trí 
    /// Author: ntthanh (27/07/2021)
    /// </summary>
    public class Position
    {
        #region Properties
        /// <summary>
        /// Khoa chinh
        /// </summary>
        public Guid PositionId { get; set; }

        /// <summary>
        /// Mã vị trí 
        /// </summary>
        public string PositionCode { get; set; }

        /// <summary>
        /// Tên vị trí 
        /// </summary>
        public string PositionName { get; set; }

        /// <summary>
        /// Moo tả
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public Guid? ParentId { get; set; }

        /// <summary>
        /// Ngày tạo 
        /// </summary>
        public DateTime? CreatedDate { get; set; }

        /// <summary>
        /// Người tạo 
        /// </summary>
        public string CreatedBy { get; set; }

        /// <summary>
        /// Ngày sửa
        /// </summary>
        public DateTime? ModifiedDate { get; set; }

        /// <summary>
        /// Người sửa
        /// </summary>
        public string ModifiedBy { get; set; }
        #endregion
    }
}
