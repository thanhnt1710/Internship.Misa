using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Amis.Business.Const
{
    /// <summary>
    /// Lớp chứa hằng MISACode
    /// </summary>
    public static class MISACode
    {
        //Thành công
        public const string MISACodeSuccess = "MISA-100";

        //Lỗi Validate
        public const string MISACodeErrorValidate = "MISA-200";
        public const string MISACodeErrorRequired = "MISA-201";
        public const string MISACodeErrorDuplicate = "MISA-202";
        public const string MISACodeErrorMaxLength = "MISA-203";
        public const string MISACodeErrorEmail = "MISA-204";
        public const string MISACodeErrorNumber = "MISA-205";
        public const string MISACodeErrorPhoneNumber = "MISA-206";
        public const string MISACodeErrorIdentityNumber = "MISA-207";
        public const string MISACodeErrorPersonalTaxCode = "MISA-208";
        public const string MISACodeErrorFilterPaging = "MISA-209";

        //Lỗi khi thao tác với database tại tầng DataAccess hoặc lỗi DataBase
        public const string MISACodeErrorData = "MISA-300";

        //Lỗi Exception
        public const string MISACodeErrorException = "MISA-400";
    }
}
