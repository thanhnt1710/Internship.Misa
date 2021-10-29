using EMIS.QLTH.Business.Const;
using EMIS.QLTH.Business.Properties;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMIS.QLTH.Business.Entity
{
    /// <summary>
    /// Thong tin nhan vien 
    /// </summary>
    /// author: ntthanh (19/8/2021)
    public class Employee : BaseEntity
    {
        #region Properties
        /// <summary>
        /// Id giáo viên 
        /// </summary>
        [PrimaryKey]
        [DisplayName(DisplayNameEmployee.EmployeeId)]
        public Guid EmployeeId { get; set; }

        /// <summary>
        /// Số hiệu giáo viên
        /// </summary>
        [Required]
        [CheckDuplicate]
        [MaxLength(MaxLengthEmployee.EmployeeCode)]
        [DisplayName(DisplayNameEmployee.EmployeeCode)]
        public string EmployeeCode { get; set; }

        /// <summary>
        /// Đường dẫn ảnh
        /// </summary>
        [DisplayName(DisplayNameEmployee.EmployeeImageUrl)]
        public string EmployeeImageUrl { get; set; }

        /// <summary>
        /// Họ và tên giáo viên
        /// </summary>
        [Required]
        [MaxLength(MaxLengthEmployee.FullName)]
        [DisplayName(DisplayNameEmployee.FullName)]
        public string FullName { get; set; }

        /// <summary>
        /// Số điện thoại
        /// </summary>
        [MaxLength(MaxLengthEmployee.PhoneNumber)]
        [DisplayName(DisplayNameEmployee.PhoneNumber)]
        public string PhoneNumber { get; set; }

        /// <summary>
        /// Email 
        /// </summary>
        [CheckEmail]
        [MaxLength(MaxLengthEmployee.Email)]
        [DisplayName(DisplayNameEmployee.Email)]
        public string Email { get; set; }

        /// <summary>
        /// Trình độ nghiệp vụ QLTB
        /// </summary>
        [DisplayName(DisplayNameEmployee.IsTrained)]
        public int? IsTrained { get; set; }

        /// <summary>
        /// Trạng thái làm việc
        /// </summary>
        [DisplayName(DisplayNameEmployee.IsActive)]
        public int? IsActive { get; set; }

        /// <summary>
        /// Ngày nghỉ việc
        /// </summary>
        [DisplayName(DisplayNameEmployee.EndJobDate)]
        public DateTime? EndJobDate { get; set; }

        /// <summary>
        /// Id tổ bộ môn 
        /// </summary>
        [DisplayName(DisplayNameEmployee.DepartmentId)]
        public Guid? DepartmentId { get; set; }

        /// <summary>
        /// Tên tổ bộ môn
        /// </summary>
        public string DepartmentName { get; set; }

        /// <summary>
        /// Mô tả tổ bộ môn
        /// </summary>
        public string DepartmentDescription { get; set; }

        /// <summary>
        /// Môn dạy
        /// </summary>
        public string Subject { get; set; }

        /// <summary>
        /// Kho phòng
        /// </summary>
        public string EquipmentRoom { get; set; }

        #endregion
    }
}
