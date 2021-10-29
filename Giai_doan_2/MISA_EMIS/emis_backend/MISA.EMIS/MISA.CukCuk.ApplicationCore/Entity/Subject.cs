using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMIS.QLTH.Business.Entity
{
    /// <summary>
    /// Lớp môn học
    /// Author: ntthanh (17/9/2021)
    /// </summary>
    public class Subject : BaseEntity
    {
        #region Properties
        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid SubjectId { get; set; }

        /// <summary>
        /// Tên môn học
        /// </summary>
        public string SubjectName { get; set; }
        #endregion
    }
}
