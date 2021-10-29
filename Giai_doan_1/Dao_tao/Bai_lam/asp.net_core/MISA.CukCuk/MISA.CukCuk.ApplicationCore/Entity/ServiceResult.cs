using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CukCuk.Business.Entity
{
    public class ServiceResult
    {
        /// <summary>
        /// Trạng thái service: true - thành công; false - có lỗi validate 
        /// </summary>
        public bool Success { get; set; }
        public string DevMsg { get; set; }
        public string UserMsg { get; set; }
        public object Data { get; set; }
        public string MISACode { get; set; }
    }
}
