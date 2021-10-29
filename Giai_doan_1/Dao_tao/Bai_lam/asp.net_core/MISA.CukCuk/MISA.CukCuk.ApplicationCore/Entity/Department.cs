using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CukCuk.Business.Entity
{
    /// <summary>
    /// Lớp phòng ban 
    /// Author: ntthanh (27/7/2021)
    /// </summary>
    public class Department: BaseEntity
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

        #endregion
    }
}
