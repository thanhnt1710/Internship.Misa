using MISA.Amis.Business.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Amis.Business.Interfaces
{
    /// <summary>
    /// interface tầng Business 
    /// </summary>
    /// <typeparam name="MISAEntity">entity tùy chỉnh</typeparam>
    /// CreatedBy: ntthanh (3/8/2021)
    public interface IBaseService<MISAEntity>
    {
        /// <summary>
        /// Lấy toàn bộ nhân viên
        /// </summary>
        /// <returns>Kết quả hàm GetAll() BaseRepository</returns>
        /// CreatedBy: ntthanh (3/8/2021)
        IEnumerable<MISAEntity> GetAll();

        /// <summary>
        /// Lấy thông tin nhân viên theo khóa chính
        /// </summary>
        /// <param name="entityId">Khóa chính</param>
        /// <returns>Kết quả hàm GetById() BaseRepository</returns>
        /// CreatedBy: ntthanh (3/8/2021)
        MISAEntity GetById(Guid entityId);

        /// <summary>
        /// Them moi nhan vien 
        /// </summary>
        /// <param name="entity">obj chứa thông tin entity thêm mới</param>
        /// <returns>ServiceResult chứa thông tin kết quả</returns>
        /// CreatedBy: ntthanh (3/8/2021)
        ServiceResult Add(MISAEntity entity);

        /// <summary>
        /// Sua thong tin nhan vien 
        /// </summary>
        /// <param name="entity">obj chứa thông tin entity cần sửa</param>
        /// <returns>ServiceResult chứa thông tin kết quả</returns> 
        /// CreatedBy: ntthanh (3/8/2021)
        ServiceResult Update(MISAEntity entity);

        /// <summary>
        /// Xóa nhân viên theo khóa chính
        /// </summary>
        /// <param name="entityId">Khóa chính</param>
        /// <returns>ServiceResult chứa thông tin kết quả</returns>
        /// CreatedBy: ntthanh (3/8/2021)
        ServiceResult Delete(Guid entityId);
    }
}
