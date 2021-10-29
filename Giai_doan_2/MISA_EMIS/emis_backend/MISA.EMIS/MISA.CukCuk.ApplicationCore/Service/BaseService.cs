using EMIS.QLTH.Business.Entity;
using EMIS.QLTH.Business.Interfaces;
using EMIS.QLTH.Business.Const;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EMIS.QLTH.Business.Properties;
using EMIS.QLTH.Business.Enum;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace EMIS.QLTH.Business.Service
{
    /// <summary>
    /// Lớp thực thi interface tầng Service
    /// </summary>
    /// <typeparam name="MISAEntity">enitity</typeparam>
    /// CreatedBy: ntthanh (27/09/2021)
    public class BaseService<MISAEntity> : IBaseService<MISAEntity> where MISAEntity:BaseEntity
    {
        #region Declare
        IBaseRepository<MISAEntity> _baseRepository;
        ServiceResult _serviceResult;

        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        /// <param name="baseRepository"></param>
        /// CreatedBy: ntthanh (27/09/2021)
        public BaseService(IBaseRepository<MISAEntity> baseRepository)
        {
            _baseRepository = baseRepository;
            _serviceResult = new ServiceResult() { Validate = true };
        }
        #endregion

        #region Methods
        /// <summary>
        /// Thêm mới
        /// </summary>
        /// <param name="entity">obj chứa thông tin entity thêm mới</param>
        /// <returns>ServiceResult chứa thông tin kết quả</returns>
        /// CreatedBy: ntthanh (27/09/2021)
        public virtual ServiceResult Add(MISAEntity entity)
        {
            //Gán trạng thái Obj là thêm mới (thêm property EntityState)
            entity.EntityState = EntityState.AddNew;
            //Thực hiện validate
            var validateServiceResult = Validate(entity);
            if(validateServiceResult.Validate)//Validate đúng
            {
                //Số bản ghi bị ảnh hưởng khi thêm lưu trong Data
                validateServiceResult.Data = _baseRepository.Add(entity);
                if((int)validateServiceResult.Data > 0)//Thành công
                {
                    return validateServiceResult;
                }
                else//Thất bại (validateServiceResult.Data==0)
                {
                    validateServiceResult.UserMsg = Resources.ErrorMsg;
                    validateServiceResult.DevMsg = Resources.DataBaseError;
                    validateServiceResult.MISACode = MISACode.MISACodeErrorData;
                    return validateServiceResult;
                }
            }
            else//Validate sai
            {
                return validateServiceResult;
            }
        }

        /// <summary>
        /// Xóa theo khóa chính
        /// </summary>
        /// <param name="entityId">Khóa chính</param>
        /// <returns>ServiceResult chứa thông tin kết quả</returns>
        /// CreatedBy: ntthanh (27/09/2021)
        public ServiceResult Delete(Guid entityId)
        {
            _serviceResult.Validate = true;
            //Số bản ghi bị ảnh hưởng lưu trong Data
            _serviceResult.Data = _baseRepository.Delete(entityId);
            if ((int)_serviceResult.Data > 0)//Thành công
            {
                _serviceResult.UserMsg = Resources.SuccessMsg;
                _serviceResult.DevMsg = "";
                _serviceResult.MISACode = MISACode.MISACodeSuccess;
            }
            else//Thất bại (_serviceResult.Data == 0)
            {
                _serviceResult.UserMsg = Resources.ErrorMsg;
                _serviceResult.DevMsg = Resources.DataBaseError;
                _serviceResult.MISACode = MISACode.MISACodeErrorData;
            }
            return _serviceResult;
        }

        /// <summary>
        /// Lấy toàn bộ dữ liệu
        /// </summary>
        /// <returns>Kết quả hàm GetAll() BaseRepository</returns>
        /// CreatedBy: ntthanh (27/09/2021)
        public IEnumerable<MISAEntity> GetAll()
        {
            return _baseRepository.GetAll();
        }

        /// <summary>
        /// Lấy thông tin theo khóa chính
        /// </summary>
        /// <param name="entityId">Khóa chính</param>
        /// <returns>Kết quả hàm GetById() BaseRepository</returns>
        /// CreatedBy: ntthanh (27/09/2021)
        public MISAEntity GetById(Guid entityId)
        {
            return _baseRepository.GetById(entityId);
        }

        /// <summary>
        /// Sửa thông tin
        /// </summary>
        /// <param name="entity">obj chứa thông tin entity cần sửa</param>
        /// <returns>ServiceResult chứa thông tin kết quả</returns>
        /// CreatedBy: ntthanh (27/09/2021)
        public ServiceResult Update(MISAEntity entity)
        {
            //Gán trạng thái Obj là sửa
            entity.EntityState = EntityState.Update;
            //Thực hiện validate
            var validateServiceResult = Validate(entity);
            if (validateServiceResult.Validate)//Validate đúng
            {
                //Số bản ghi bị ảnh hưởng lưu trong Data
                validateServiceResult.Data = _baseRepository.Update(entity);
                if ((int)_serviceResult.Data > 0)//Thành công
                {
                    return validateServiceResult;
                }
                else//Thất bại (_serviceResult.Data == 0)
                {
                    validateServiceResult.UserMsg = Resources.ErrorMsg;
                    validateServiceResult.DevMsg = Resources.DataBaseError;
                    validateServiceResult.MISACode = MISACode.MISACodeErrorData;
                    return validateServiceResult;
                }
            }
            else//Validate sai
            {
                return validateServiceResult;
            }
        }

        /// <summary>
        /// Ham Validate cua rieng BaseService
        /// </summary>
        /// <param name="entity">enity cần validate</param>
        /// <returns>
        /// ServiceResult chứa thông tin kết quả
        /// </returns>
        /// CreatedBy: ntthanh (27/09/2021)
        private ServiceResult Validate(MISAEntity entity)
        {
            //Đọc các Property:
            var properties = entity.GetType().GetProperties();
            //Duyệt qua các property
            foreach(var property in properties)
            {
                var propertyValue = property.GetValue(entity);
                //Lấy ra mảng DisplayName cua property hien tai 
                var displayNameAttribute = property.GetCustomAttributes(typeof(DisplayName), true);
                var displayName = string.Empty;
                //Neu property hien tai co DisplayName thì gán giá trị cho DisplayName
                if(displayNameAttribute.Length > 0)
                {
                    displayName = (displayNameAttribute[0] as DisplayName).Name;
                }

                //Kiểm tra xem có attribute cần phải validate không: 
                //Check bắt buộc nhap
                if(property.IsDefined(typeof(Required), false))
                {
                    
                    //Check bắt buộc nhập 
                    if(propertyValue == null || propertyValue == "")
                    {
                        _serviceResult.Validate = false;
                        _serviceResult.UserMsg = Resources.ValidateError;
                        _serviceResult.MISACode = MISACode.MISACodeErrorRequired;
                        _serviceResult.Data = string.Format(Resources.ValidateError_Empty, displayName);
                        //Nếu sai trả về false ngay
                        return _serviceResult;
                    }
                }

                //Check trùng dữ liệu 
                if (property.IsDefined(typeof(CheckDuplicate), false))
                {
                    //Tên property
                    var propertyName = property.Name;
                    var entityDuplicate = _baseRepository.GetEntityByProperty(entity, property);
                    if(entityDuplicate != null)//Bị trùng
                    {
                        _serviceResult.Validate = false;
                        _serviceResult.UserMsg = Resources.ValidateError;
                        _serviceResult.MISACode = MISACode.MISACodeErrorDuplicate;
                        _serviceResult.Data = string.Format(Resources.ValidateError_Duplicate, displayName);
                        //Nếu sai trả về false ngay
                        return _serviceResult;
                    }
                }

                //Check Maxlength 
                if (property.IsDefined(typeof(MaxLength), false))
                {
                    //Lấy ra độ dài đã khai báo 
                    var attributeMaxLength = property.GetCustomAttributes(typeof(MaxLength), true)[0];
                    var length = (attributeMaxLength as MaxLength).Value;
                    if(propertyValue != null && propertyValue.ToString().Trim().Length > length)
                    {
                        _serviceResult.Validate = false;
                        _serviceResult.UserMsg = Resources.ValidateError;
                        _serviceResult.MISACode = MISACode.MISACodeErrorMaxLength;
                        _serviceResult.Data = string.Format(Resources.ValidateError_MaxLength, displayName, length);
                        //Nếu sai trả về false ngay
                        return _serviceResult;
                    }
                }

                //Check Email 
                if (property.IsDefined(typeof(CheckEmail), false))
                {   
                    if(propertyValue != null)
                    {
                        string email = propertyValue.ToString();
                        if(email != string.Empty) //Nếu không nhập email thì không cần validate
                        {
                            System.Text.RegularExpressions.Regex regex = new System.Text.RegularExpressions.Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
                            Match match = regex.Match(email);
                            if (!match.Success)//Sai định dạng
                            {
                                _serviceResult.Validate = false;
                                _serviceResult.UserMsg = Resources.ValidateError;
                                _serviceResult.MISACode = MISACode.MISACodeErrorEmail;
                                _serviceResult.Data = Resources.ValidateError_Email;
                                //Nếu sai trả về false ngay
                                return _serviceResult;
                            }
                        }   
                    }
                }

                //CheckNumber
                if (property.IsDefined(typeof(CheckNumber), false))
                {
                    if(propertyValue.ToString() != string.Empty)//Nếu không có gì thì không cần check 
                    {
                        double n;
                        bool isNumeric = double.TryParse(propertyValue.ToString(), out n);
                        if (!isNumeric)
                        {
                            _serviceResult.Validate = false;
                            _serviceResult.UserMsg = Resources.ValidateError;
                            _serviceResult.MISACode = MISACode.MISACodeErrorNumber;
                            _serviceResult.Data = string.Format(Resources.ValidateError_Number, displayName);
                            //Nếu sai trả về false ngay
                            return _serviceResult;
                        }
                    }
                }

                //Check thêm

            }

            //Nếu validate tại base đúng thì validate tại con 
            if (_serviceResult.Validate)
            {
                _serviceResult = ValidateCustom(entity);
            }
            return _serviceResult;
        }

        /// <summary>
        /// Ham Validate dành cho kế thừa
        /// </summary>
        /// <param name="entity">entity cần validate</param>
        /// <returns>
        /// Tại base luôn trả về true
        /// </returns>
        /// CreatedBy: ntthanh (27/09/2021)
        protected virtual ServiceResult ValidateCustom(MISAEntity entity)
        {
            _serviceResult.Validate = true;
            _serviceResult.UserMsg = Resources.SuccessMsg;
            _serviceResult.DevMsg = "";
            _serviceResult.MISACode = MISACode.MISACodeSuccess;
            return _serviceResult;
        }
        #endregion
    }
}
