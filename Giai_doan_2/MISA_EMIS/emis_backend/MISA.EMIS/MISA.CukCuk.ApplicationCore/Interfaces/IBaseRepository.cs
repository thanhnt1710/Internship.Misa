using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;

namespace EMIS.QLTH.Business.Interfaces
{
    /// <summary>
    /// interface tầng repository 
    /// </summary>
    /// <typeparam name="MISAEntity">entity tủy chỉnh</typeparam>
    /// CreatedBy: ntthanh (27/09/2021)
    public interface IBaseRepository<MISAEntity>
    {

        /// <summary>
        /// Lấy toàn bộ dữ liệu
        /// </summary>
        /// <returns>List obj kết quả</returns>
        /// CreatedBy: ntthanh (27/09/2021)
        IEnumerable<MISAEntity> GetAll();

        /// <summary>
        /// Lấy thông tin theo khóa chính
        /// </summary>
        /// <param name="entityId">Khóa chính</param>
        /// <returns>obj entity lấy được theo Id</returns>
        /// CreatedBy: ntthanh (27/09/2021)
        MISAEntity GetById(Guid entityId);

        /// <summary>
        /// Thêm mới 
        /// </summary>
        /// <param name="entity">obj chứa thông tin entity thêm mới</param>
        /// <returns>Số dòng bị ảnh hưởng</returns>
        /// CreatedBy: ntthanh (27/09/2021)
        int Add(MISAEntity entity);

        /// <summary>
        /// Sửa thông tin
        /// </summary>
        /// <param name="entity">obj chứa thông tin entity cần sửa</param>
        /// <returns>Số dòng bị ảnh hưởng</returns>
        /// CreatedBy: ntthanh (27/09/2021)
        int Update(MISAEntity entity);

        /// <summary>
        /// Xóa theo khóa chính
        /// </summary>
        /// <param name="entityId">Khóa chính</param>
        /// <returns>Số dòng bị ảnh hưởng</returns>
        /// CreatedBy: ntthanh (27/09/2021)
        int Delete(Guid entityId);

        /// <summary>
        /// Lấy thông tin obj entity bằng property
        /// </summary>
        /// <param name="entity">entity</param>
        /// <param name="property">thuộc tính</param>
        /// <returns>entity</returns>
        /// CreatedBy: ntthanh (27/09/2021)
        MISAEntity GetEntityByProperty(MISAEntity entity, PropertyInfo property);
    }
}
