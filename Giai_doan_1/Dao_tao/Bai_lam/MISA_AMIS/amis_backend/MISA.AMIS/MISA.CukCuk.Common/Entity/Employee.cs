using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CukCuk.Common.Entity
{
    /// <summary>
    /// Thong tin nhan vien 
    /// </summary>
    /// author: ntthanh (22/7/2021)
    public class Employee
    {
        #region Properties
        /// <summary>
        /// Khoa chinh
        /// </summary>
        public Guid EmployeeId { get; set; }

        /// <summary>
        /// Mã nhân viên 
        /// </summary>
        public string EmployeeCode { get; set; }

        /// <summary>
        /// Họ
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Tên 
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// Họ và tên
        /// </summary>
        public string FullName { get; set; }

        /// <summary>
        /// Giới tính
        /// </summary>
        public int? Gender { get; set; }

        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Số điện thoại 
        /// </summary>
        public string PhoneNumber { get; set; }

        /// <summary>
        /// Email 
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Địa chỉ
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// Số căn cước
        /// </summary>
        public string IdentityNumber { get; set; }

        /// <summary>
        /// Ngày cấp căn cước 
        /// </summary>
        public DateTime? IdentityDate { get; set; }

        /// <summary>
        /// Nơi cấp căn cước 
        /// </summary>
        public string IdentityPlace { get; set; }

        /// <summary>
        /// Ngày gia nhập 
        /// </summary>
        public DateTime? JoinDate { get; set; }

        /// <summary>
        /// Tình trạng hôn nhân 
        /// </summary>
        public int? MartialStatus { get; set; }

        /// <summary>
        /// Trình độ hocj vấn 
        /// </summary>
        public int? EducationalBackground { get; set; }

        /// <summary>
        /// Id trình độ chuyên môn 
        /// </summary>
        public Guid? QualificationId { get; set; }

        /// <summary>
        /// Id phòng ban 
        /// </summary>
        public Guid? DepartmentId { get; set; }

        /// <summary>
        /// Id Vị trí 
        /// </summary>
        public Guid? PositionId { get; set; }

        /// <summary>
        /// Tình trạng công việc 
        /// </summary>
        public int? WorkStatus { get; set; }

        /// <summary>
        /// Mã số thuế 
        /// </summary>
        public string PersonalTaxCode { get; set; }

        /// <summary>
        /// Tiền lương
        /// </summary>
        public double? Salary { get; set; }

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

        #region Method
        /// <summary>
        /// Ham kiem tra ma nhan vien da ton tai hay chua
        /// </summary>
        /// <param name="employeeCode">Ma nhan vien</param>
        /// <returns>true - da ton tai; false - chua ton tai</returns>
        /// Author: ntthanh (26/07/2021)


        #endregion
    }
}
