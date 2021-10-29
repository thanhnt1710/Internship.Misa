using MISA.CukCuk.Business.Entity;
using MISA.CukCuk.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CukCuk.Business.Service
{
    public class BaseService<MISAEntity> : IBaseService<MISAEntity>
    {
        IBaseRepository<MISAEntity> _baseRepository;

        public BaseService(IBaseRepository<MISAEntity> baseRepository)
        {
            _baseRepository = baseRepository;
        }

        public virtual int Add(MISAEntity entity)
        {
            //Thực hiện validate
            var isValidate = Validate(entity);
            if(isValidate)
            {
                return _baseRepository.Add(entity);
            }
            else
            {
                return 0;
            }

        }

        public bool CheckDuplicateEntityCode(string entityCode)
        {
            throw new NotImplementedException();
        }

        public bool CheckEmail(string email)
        {
            throw new NotImplementedException();
        }

        public int Delete(Guid entityId)
        {
            return _baseRepository.Delete(entityId);
        }

        public IEnumerable<MISAEntity> GetAll()
        {
            return _baseRepository.GetAll();
        }

        public MISAEntity GetById(Guid entityId)
        {
            return _baseRepository.GetById(entityId);
        }

        public int Update(MISAEntity entity)
        {
            //Validate

            return _baseRepository.Update(entity);
        }

        //Ham Validate
        private bool Validate(MISAEntity entity)
        {
            var isValidate = true;
            //Đọc các Property:
            var properties = entity.GetType().GetProperties();
            foreach(var property in properties)
            {
                //Kiểm tra xem có attribute cần phải validate không: 
                //Check bất buộc 
                if(property.IsDefined(typeof(Required), false))
                {
                    //Check bất buộc nhập 
                    var propertyValue = property.GetValue(entity);
                    if(propertyValue == null)
                    {
                        isValidate = false;
                    }
                }
                //Check trùng dữ liệu 
                if(property.IsDefined(typeof(CheckDuplicate), false))
                {
                    var propertyName = property.Name;
                    var entityDuplicate = _baseRepository.GetEntityByProperty(propertyName, property.GetValue(entity));
                    if(entityDuplicate != null)//Bị trùng
                    {
                        isValidate = false;
                    }
                }
            }
            return isValidate;
        }
    }
}
