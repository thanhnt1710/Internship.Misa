using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMIS.QLTH.Business.Entity
{
    /// <summary>
    /// Lớp chứa thông tin kết quả trả về 
    /// </summary>
    public class ServiceResult
    {
        /// <summary>
        /// Trạng thái validate: true - thành công; false - có lỗi validate 
        /// </summary>
        public bool Validate { get; set; }

        /// <summary>
        /// thông điệp cho dev
        /// </summary>
        public string DevMsg { get; set; }

        /// <summary>
        /// Thông điệp cho user
        /// </summary>
        public string UserMsg { get; set; }

        /// <summary>
        /// Dữ liệu cụ thể
        /// </summary>
        public object Data { get; set; }

        /// <summary>
        /// Mã MISA
        /// </summary>
        public string MISACode { get; set; }
    }
}
