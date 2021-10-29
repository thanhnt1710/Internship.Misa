using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CukCuk.Business.Entity
{
    public class Customer: BaseEntity
    {
        #region Properties
        /// <summary>
        /// Khoa chinh
        /// </summary>
        public Guid CustomerId { get; set; } 

        /// <summary>
        /// Mã khách hàng
        /// </summary>
        public string CustomerCode { get; set; } 

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
        /// Id nhóm khác hàng
        /// </summary>
        public Guid? CustomerGroupId { get; set; } 

        /// <summary>
        /// Số tiền nợ
        /// </summary>
        public double? DebitAmount { get; set; } 

        /// <summary>
        /// Số thẻ thành viên 
        /// </summary>
        public string MemberCardCode { get; set; } 

        /// <summary>
        /// Tên công ty 
        /// </summary>
        public string CompanyName { get; set; } 

        /// <summary>
        /// Trạng thái theo dõi 
        /// </summary>
        public int? IsStopFollow { get; set; } 

        /// <summary>
        /// Mã số thuế cong ty 
        /// </summary>
        public string CompanyTaxCode { get; set; } 

        #endregion
    }
}
