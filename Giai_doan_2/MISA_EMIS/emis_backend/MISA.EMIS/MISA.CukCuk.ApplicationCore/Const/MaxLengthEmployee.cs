using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMIS.QLTH.Business.Const
{
    /// <summary>
    /// Số ký tự tối đa khi validate giáo viên
    /// </summary>
    public static class MaxLengthEmployee
    { 
        public const int EmployeeCode = 20;
        public const int EmployeeImageUrl = 255;
        public const int FullName = 100;
        public const int PhoneNumber = 20;
        public const int Email = 50;
    }
}
