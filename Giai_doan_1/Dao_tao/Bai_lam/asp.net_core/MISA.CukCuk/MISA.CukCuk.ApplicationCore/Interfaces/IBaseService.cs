using MISA.CukCuk.Business.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CukCuk.Business.Interfaces
{
    public interface IBaseService<MISAEntity>
    {
        //Lấy toàn bộ nhân viên
        IEnumerable<MISAEntity> GetAll();

        //Lấy thông tin nhân viên theo khóa chính
        MISAEntity GetById(Guid entityId);

        //Them moi nhan vien 
        int Add(MISAEntity entity);

        //Sua thong tin nhan vien 
        int Update(MISAEntity entity);

        //Xóa nhân viên theo khóa chính 
        int Delete(Guid entityId);

        // Kiểm tra trùng mã 
        bool CheckDuplicateEntityCode(string entityCode);

        //Check email
        bool CheckEmail(string email);
    }
}
