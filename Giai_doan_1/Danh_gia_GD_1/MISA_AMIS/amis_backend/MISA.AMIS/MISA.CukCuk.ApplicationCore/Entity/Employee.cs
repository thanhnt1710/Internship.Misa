using MISA.Amis.Business.Const;
using MISA.Amis.Business.Properties;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Amis.Business.Entity
{
    /// <summary>
    /// Thong tin nhan vien 
    /// </summary>
    /// author: ntthanh (19/8/2021)
    public class Employee : BaseEntity
    {
        #region Properties
        /// <summary>
        /// Khoa chinh
        /// </summary>
        [PrimaryKey]
        [DisplayName(DisplayNameValidate.EmployeeId)]
        public Guid EmployeeId { get; set; }

        /// <summary>
        /// Mã nhân viên 
        /// </summary>
        [Required]
        [CheckDuplicate]
        [MaxLength(MaxLengthValidate.EmployeeCode)]
        [DisplayName(DisplayNameValidate.EmployeeCode)]
        public string EmployeeCode { get; set; }

        /// <summary>
        /// Tên nhân viên
        /// </summary>
        [Required]
        [MaxLength(MaxLengthValidate.EmployeeName)]
        [DisplayName(DisplayNameValidate.EmployeeName)]
        public string EmployeeName { get; set; }

        /// <summary>
        /// Ngày sinh
        /// </summary>
        [DisplayName(DisplayNameValidate.DateOfBirth)]
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Giới tính
        /// </summary>
        [DisplayName(DisplayNameValidate.Gender)]
        public int? Gender { get; set; }

        /// <summary>
        /// Id đơn vị nhân viên
        /// </summary>
        [Required]
        [DisplayName(DisplayNameValidate.DepartmentId)]
        public Guid? DepartmentId { get; set; }

        /// <summary>
        /// Số căn cước
        /// </summary>
        [MaxLength(MaxLengthValidate.IdentityNumber)]
        [DisplayName(DisplayNameValidate.IdentityNumber)]
        public string IdentityNumber { get; set; }

        /// <summary>
        /// Ngày cấp căn cước 
        /// </summary>
        [DisplayName(DisplayNameValidate.IdentityDate)]
        public DateTime? IdentityDate { get; set; }

        /// <summary>
        /// Nơi cấp căn cước 
        /// </summary>
        [MaxLength(MaxLengthValidate.IdentityPlace)]
        [DisplayName(DisplayNameValidate.IdentityPlace)]
        public string IdentityPlace { get; set; }

        /// <summary>
        /// Chức danh nhân viên 
        /// </summary>
        [MaxLength(MaxLengthValidate.EmployeePosition)]
        [DisplayName(DisplayNameValidate.EmployeePosition)]
        public string EmployeePosition { get; set; }

        /// <summary>
        /// Địa chỉ
        /// </summary>
        [MaxLength(MaxLengthValidate.Address)]
        [DisplayName(DisplayNameValidate.Address)]
        public string Address { get; set; }

        /// <summary>
        /// Số tài khoản ngân hàng 
        /// </summary>
        [MaxLength(MaxLengthValidate.BankAccountNumber)]
        [DisplayName(DisplayNameValidate.BankAccountNumber)]
        public string BankAccountNumber { get; set; }

        /// <summary>
        /// Tên ngân hàng 
        /// </summary>
        [MaxLength(MaxLengthValidate.BankName)]
        [DisplayName(DisplayNameValidate.BankName)]
        public string BankName { get; set; }

        /// <summary>
        /// Tên chi nhánh ngân hàng
        /// </summary>
        [MaxLength(MaxLengthValidate.BankBranchName)]
        [DisplayName(DisplayNameValidate.BankBranchName)]
        public string BankBranchName { get; set; }

        /// <summary>
        /// Số điện thoại di động
        /// </summary>
        [MaxLength(MaxLengthValidate.PhoneNumber)]
        [DisplayName(DisplayNameValidate.PhoneNumber)]
        public string PhoneNumber { get; set; }

        /// <summary>
        /// Số điện thoại cố định
        /// </summary>
        [MaxLength(MaxLengthValidate.TelephoneNumber)]
        [DisplayName(DisplayNameValidate.TelephoneNumber)]
        public string TelephoneNumber { get; set; }

        /// <summary>
        /// Email 
        /// </summary>
        [MaxLength(MaxLengthValidate.Email)]
        [DisplayName(DisplayNameValidate.Email)]
        public string Email { get; set; }

        #endregion
    }
}
