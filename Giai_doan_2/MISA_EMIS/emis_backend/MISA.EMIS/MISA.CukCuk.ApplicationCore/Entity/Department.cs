using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EMIS.QLTH.Business.Const;

namespace EMIS.QLTH.Business.Entity
{
    /// <summary>
    /// Lớp tổ bộ môn
    /// Author: ntthanh (17/9/2021)
    /// </summary>
    public class Department: BaseEntity
    {
        #region Properties
        /// <summary>
        /// Khóa chính
        /// </summary>
        [PrimaryKey]
        [DisplayName(DisplayNameDepartment.DepartmentId)]
        public Guid DepartmentId { get; set; }

        /// <summary>
        /// Tên tổ bộ môn
        /// </summary>
        [Required]
        [CheckDuplicate]
        [MaxLength(MaxLengthDepartment.DepartmentName)]
        [DisplayName(DisplayNameDepartment.DepartmentName)]
        public string DepartmentName { get; set; }

        /// <summary>
        /// Mô tả tổ bộ môn 
        /// </summary>
        [MaxLength(MaxLengthDepartment.Description)]
        [DisplayName(DisplayNameDepartment.Description)]
        public string Description { get; set; }

        #endregion
    }
}
