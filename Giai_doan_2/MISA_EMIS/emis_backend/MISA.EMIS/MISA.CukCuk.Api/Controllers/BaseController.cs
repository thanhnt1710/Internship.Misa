using Microsoft.AspNetCore.Mvc;
using EMIS.QLTH.Business.Const;
using EMIS.QLTH.Business.Entity;
using EMIS.QLTH.Business.Interfaces;
using EMIS.QLTH.Business.Properties;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EMIS.QLTH.Api.Controllers
{
    /// <summary>
    /// Lớp base controller
    /// </summary>
    /// <typeparam name="MISAEntity"></typeparam>
    /// CreatedBy: ntthanh (27/09/2021)
    [Route("api/v1/[controller]s")]
    [ApiController]
    public class BaseController<MISAEntity> : ControllerBase
    {
        #region Declare
        IBaseService<MISAEntity> _baseService;
        public ServiceResult _serviceResult;

        /// <summary>
        /// Hàm khởi tạo 
        /// </summary>
        /// <param name="baseService"></param>
        public BaseController(IBaseService<MISAEntity> baseService)
        {
            _baseService = baseService;
            _serviceResult = new ServiceResult();
        }
        #endregion

        #region Methods
        /// <summary>
        /// Lấy toàn bộ dữ liệu 
        /// </summary>
        /// <returns>
        /// 200 - thành công 
        /// 201 - Thêm mới thành công
        /// 400 - Dữ liệu đầu vào không hợp lệ
        /// 500 - Exception
        /// </returns>
        /// CreatedBy: ntthanh (27/09/2021)
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var entities = _baseService.GetAll();
                if (entities.Count() > 0)
                {
                    return Ok(entities); //Tra ve du lieu
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception e)
            {
                _serviceResult.Validate = false;
                _serviceResult.UserMsg = Resources.ErrorMsg;
                _serviceResult.DevMsg = e.Message;
                _serviceResult.MISACode = MISACode.MISACodeErrorException;
                return StatusCode(500, _serviceResult);
            }
        }

        /// <summary>
        /// Lấy thông tin giáo viên theo khóa chính
        /// </summary>
        /// <param name="entityId">khóa chính</param>
        /// <returns>
        /// 200 - thành công 
        /// 201 - Thêm mới thành công
        /// 400 - Dữ liệu đầu vào không hợp lệ
        /// 500 - Exception
        /// </returns>
        /// CreatedBy: ntthanh (27/09/2021)
        [HttpGet("{Id}")]
        public IActionResult GetById([FromRoute] Guid Id)
        {
            try
            {
                var employee = _baseService.GetById(Id);
                if (employee != null)
                {
                    return Ok(employee); //Tra ve du lieu - 200
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception e)
            {
                _serviceResult.Validate = false;
                _serviceResult.UserMsg = Resources.ErrorMsg;
                _serviceResult.DevMsg = e.Message;
                _serviceResult.MISACode = MISACode.MISACodeErrorException;
                return StatusCode(500, _serviceResult);
            }
        }

        /// <summary>
        /// Thêm mới cán bộ, tổ bộ môn
        /// </summary>
        /// <param name="entity">Obj entity cần thêm mới</param>
        /// <returns>
        /// 200 - thành công 
        /// 201 - Thêm mới thành công
        /// 400 - Dữ liệu đầu vào không hợp lệ
        /// 500 - Exception
        /// </returns>
        /// CreatedBy: ntthanh (17/9/2021)
        [HttpPost]
        public IActionResult Add([FromBody] MISAEntity entity)
        {
            try
            {
                var serviceResult = _baseService.Add(entity);
                if (serviceResult.Validate)//Validate đúng
                {
                    if((int)serviceResult.Data > 0)//Validate thành công, thêm thành công -> trả về 201
                    {
                        return StatusCode(201, serviceResult);
                    }
                    else//Validate thành công, thêm bị lỗi -> trả về 200
                    {
                        return StatusCode(200, serviceResult);
                    }
                }
                else//Validate sai
                {
                    return StatusCode(200, serviceResult);
                }
            }
            catch (Exception e)
            {
                _serviceResult.Validate = false;
                _serviceResult.UserMsg = Resources.ErrorMsg;
                _serviceResult.DevMsg = e.Message;
                _serviceResult.MISACode = MISACode.MISACodeErrorException;
                return StatusCode(500, _serviceResult);
            }
        }


        /// <summary>
        /// Xoa theo khóa chính 
        /// </summary>
        /// <param name="entityId">khóa chính enity can xoa</param>
        /// <returns
        /// 200 - thành công 
        /// 201 - Thêm mới thành công
        /// 400 - Dữ liệu đầu vào không hợp lệ
        /// 500 - Exception
        /// </returns>
        /// CreatedBy: ntthanh (27/09/2021)
        [HttpDelete("{Id}")]
        public IActionResult Delete([FromRoute]Guid Id)
        {
            try
            {
                var serviceResult = _baseService.Delete(Id);
                //Dù xóa đc hay k đều trả về 200, Khác nhau ở MISACode trả về
                return StatusCode(200, serviceResult);
            }
            catch (Exception e)
            {
                _serviceResult.Validate = false;
                _serviceResult.UserMsg = Resources.ErrorMsg;
                _serviceResult.DevMsg = e.Message;
                _serviceResult.MISACode = MISACode.MISACodeErrorException;
                return StatusCode(500, _serviceResult);
            }
        }

        /// <summary>
        /// Chinh sua theo khóa chính
        /// </summary>
        /// <param name="Id">khóa chính obj cần sửa</param>
        /// <param name="entity">obj chứa thông tin thay đổi</param>
        /// <returns>
        /// 200 - thành công 
        /// 201 - Thêm mới thành công
        /// 400 - Dữ liệu đầu vào không hợp lệ
        /// 500 - Exception
        /// </returns>
        /// CreatedBy: ntthanh (27/09/2021)
        [HttpPut("{Id}")]
        public IActionResult Update([FromRoute] string Id, [FromBody] MISAEntity entity)
        {
            try
            {
                //Theem Id cho Body đề phòng người dùng k truyền Id bên trong body
                //Property cua entityId
                var keyProperty = entity.GetType().GetProperty($"{typeof(MISAEntity).Name}Id");
                //Neu kieu entityId la Guid
                if(keyProperty.PropertyType == typeof(Guid))
                {
                    keyProperty.SetValue(entity, Guid.Parse(Id));
                }
                //Neu kieu entityId la Int
                else if (keyProperty.PropertyType == typeof(int))
                {
                    keyProperty.SetValue(entity, int.Parse(Id));
                }
                else//Con lai
                {
                    keyProperty.SetValue(entity, Id);
                }

                var serviceResult = _baseService.Update(entity);
                if (serviceResult.Validate)//Validate đúng
                {
                    if ((int)serviceResult.Data > 0)//Validate thành công, sửa thành công -> trả về 201
                    {
                        return StatusCode(201, serviceResult);
                    }
                    else//Validate thành công, sửa bị lỗi -> trả về 200
                    {
                        return StatusCode(200, serviceResult);
                    }
                }
                else//Validate sai
                {
                    return StatusCode(200, serviceResult);
                }
            }
            catch (Exception e)
            {
                _serviceResult.Validate = false;
                _serviceResult.UserMsg = Resources.ErrorMsg;
                _serviceResult.DevMsg = e.Message;
                _serviceResult.MISACode = MISACode.MISACodeErrorException;
                return StatusCode(500, _serviceResult);
            }
        }

        #endregion
    }
}
