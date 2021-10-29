using EMIS.QLTH.Business.Const;
using EMIS.QLTH.Business.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMIS.QLTH.Business.Entity
{
    //Bắt buộc nhập
    [AttributeUsage(AttributeTargets.Property)]
    public class Required: Attribute
    {

    }

    //Check trùng mã 
    [AttributeUsage(AttributeTargets.Property)]
    public class CheckDuplicate: Attribute
    {

    }

    //Khóa chính
    [AttributeUsage(AttributeTargets.Property)]
    public class PrimaryKey: Attribute
    {

    }

    //Check maxlegth
    [AttributeUsage(AttributeTargets.Property)]
    public class MaxLength: Attribute
    {
        //Độ dài nhập vào
        public int Value { get; set; }
        public MaxLength(int length)
        {
            this.Value = length;
        }
    }

    //Tên hiển thị 
    [AttributeUsage(AttributeTargets.Property)]
    public class DisplayName: Attribute
    {
        public string Name { get; set; }
        public DisplayName(string name = null)
        {
            this.Name = name;
        }
    }

    //Check Email 
    [AttributeUsage(AttributeTargets.Property)]
    public class CheckEmail : Attribute
    {

    }

    //CheckNumber
    [AttributeUsage(AttributeTargets.Property)]
    public class CheckNumber: Attribute
    {

    }

    /// <summary>
    /// Class chứa các thuộc tính chung cho tất cả class entity khác
    /// </summary>
    public class BaseEntity
    {
        #region Properties
        /// <summary>
        /// Trạng thái: thêm mới hay sửa
        /// </summary>
        public EntityState EntityState { get; set; } = EntityState.AddNew;

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
