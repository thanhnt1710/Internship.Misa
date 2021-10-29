using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CukCuk.Common.Entity
{
    /// <summary>
    /// Lớp phòng ban 
    /// Author: ntthanh (27/7/2021)
    /// </summary>
    public class Department
    {
        #region Properties
        /// <summary>
        /// Khoa chinh
        /// </summary>
        public Guid DepartmentId { get; set; }

        /// <summary>
        /// Mã phòng ban 
        /// </summary>
        public string DepartmentCode { get; set; }

        /// <summary>
        /// Tên phòng ban 
        /// </summary>
        public string DepartmentName { get; set; }

        /// <summary>
        /// Mô tả 
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Ngày tạo 
        /// </summary>
        public DateTime? CreatedDate { get; set; }

        /// <summary>
        /// Người tạo 
        /// </summary>
        public string CreatedBy { get; set; }

        /// <summary>
        /// Ngày chỉnh sửa 
        /// </summary>
        public DateTime? ModifiedDate { get; set; }

        /// <summary>
        /// Người chỉnh sửa 
        /// </summary>
        public string ModifiedBy { get; set; }

        #endregion
    }
}
