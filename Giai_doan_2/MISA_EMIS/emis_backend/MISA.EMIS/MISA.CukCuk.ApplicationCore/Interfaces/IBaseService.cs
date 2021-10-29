using EMIS.QLTH.Business.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMIS.QLTH.Business.Interfaces
{
    /// <summary>
    /// interface tầng Business 
    /// </summary>
    /// <typeparam name="MISAEntity">entity tùy chỉnh</typeparam>
    /// CreatedBy: ntthanh (27/09/2021)
    public interface IBaseService<MISAEntity>
    {
        /// <summary>
        /// Lấy toàn bộ dữ liệu
        /// </summary>
        /// <returns>Kết quả hàm GetAll() BaseRepository</returns>
        /// CreatedBy: ntthanh (27/09/2021)
        IEnumerable<MISAEntity> GetAll();

        /// <summary>
        /// Lấy thông tin theo khóa chính
        /// </summary>
        /// <param name="entityId">Khóa chính</param>
        /// <returns>Kết quả hàm GetById() BaseRepository</returns>
        /// CreatedBy: ntthanh (27/09/2021)
        MISAEntity GetById(Guid entityId);

        /// <summary>
        /// Thêm mới
        /// </summary>
        /// <param name="entity">obj chứa thông tin entity thêm mới</param>
        /// <returns>ServiceResult chứa thông tin kết quả</returns>
        /// CreatedBy: ntthanh (27/09/2021)
        ServiceResult Add(MISAEntity entity);

        /// <summary>
        /// Sửa thông tin 
        /// </summary>
        /// <param name="entity">obj chứa thông tin entity cần sửa</param>
        /// <returns>ServiceResult chứa thông tin kết quả</returns> 
        /// CreatedBy: ntthanh (27/09/2021)
        ServiceResult Update(MISAEntity entity);

        /// <summary>
        /// Xóa theo khóa chính
        /// </summary>
        /// <param name="entityId">Khóa chính</param>
        /// <returns>ServiceResult chứa thông tin kết quả</returns>
        /// CreatedBy: ntthanh (27/09/2021)
        ServiceResult Delete(Guid entityId);
    }
}
