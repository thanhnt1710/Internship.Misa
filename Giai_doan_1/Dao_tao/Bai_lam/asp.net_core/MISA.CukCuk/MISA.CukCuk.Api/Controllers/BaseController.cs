using Microsoft.AspNetCore.Mvc;
using MISA.CukCuk.Business.Const;
using MISA.CukCuk.Business.Entity;
using MISA.CukCuk.Business.Interfaces;
using MISA.CukCuk.Business.Properties;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BaseController<MISAEntity> : ControllerBase
    {
        IBaseService<MISAEntity> _baseService;
        public ServiceResult ServiceResult;

        public BaseController(IBaseService<MISAEntity> baseService)
        {
            _baseService = baseService;
            ServiceResult = new ServiceResult();
        }    

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
                ServiceResult.Success = false;
                ServiceResult.UserMsg = Resources.ErrorMsg;
                ServiceResult.DevMsg = e.Message;
                ServiceResult.MISACode = MISAConst.MISACodeErrorException;
                return StatusCode(500, ServiceResult);
            }
        }

        /// <summary>
        /// Lấy thông tin nhân viên theo Id 
        /// </summary>
        /// <param name="entityId"></param>
        /// <returns>
        /// 200 - thành công 
        /// 201 - Thêm mới thành công
        /// 400 - Dữ liệu đầu vào không hợp lệ
        /// 500 - Exception
        /// </returns>
        [HttpGet("{entityId}")]
        public IActionResult GetById(Guid entityId)
        {
            try
            {
                var employee = _baseService.GetById(entityId);
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
                ServiceResult.Success = false;
                ServiceResult.UserMsg = Resources.ErrorMsg;
                ServiceResult.DevMsg = e.Message;
                ServiceResult.MISACode = MISAConst.MISACodeErrorException;
                return StatusCode(500, ServiceResult);
            }
        }

        /// <summary>
        /// Thêm mới nhân viên 
        /// </summary>
        /// <param name="employee">Đối tương Employee cần thêm mới</param>
        /// <returns>
        /// 200 - thành công 
        /// 201 - Thêm mới thành công
        /// 400 - Dữ liệu đầu vào không hợp lệ
        /// 500 - Exception
        /// </returns>
        [HttpPost]
        public IActionResult Add([FromBody] MISAEntity entity)
        {
            try
            {
                var rowAffects = _baseService.Add(entity);
                if (rowAffects > 0)
                {
                    return StatusCode(201, rowAffects);
                }
                else
                {
                    return NoContent();
                }
                /*var serviceResult = _baseService.Add(entity);

                if (serviceResult.Success == false)
                {
                    return BadRequest(serviceResult);
                }
                //So ban ghi them thanh cong
                var rowAffects = (int)serviceResult.Data;
                if (rowAffects > 0)
                {
                    return StatusCode(201, rowAffects);
                }
                else
                {
                    return NoContent();
                }*/
            }
            catch (Exception e)
            {
                ServiceResult.Success = false;
                ServiceResult.UserMsg = Resources.ErrorMsg;
                ServiceResult.DevMsg = e.Message;
                ServiceResult.MISACode = MISAConst.MISACodeErrorException;
                return StatusCode(500, ServiceResult);
            }
        }


        /// <summary>
        /// Xoa nhan vien theo id
        /// </summary>
        /// <param name="entityId">Id Nhan vien can xoa</param>
        /// <returns
        /// 200 - thành công 
        /// 201 - Thêm mới thành công
        /// 400 - Dữ liệu đầu vào không hợp lệ
        /// 500 - Exception
        /// </returns>
        [HttpDelete("{entityId}")]
        public IActionResult Delete(Guid entityId)
        {
            try
            {
                var res = _baseService.Delete(entityId);
                if (res > 0)
                {
                    return StatusCode(201, res);
                }
                else
                {
                    return NoContent();
                }

            }
            catch (Exception e)
            {
                ServiceResult.Success = false;
                ServiceResult.UserMsg = Resources.ErrorMsg;
                ServiceResult.DevMsg = e.Message;
                ServiceResult.MISACode = MISAConst.MISACodeErrorException;
                return StatusCode(500, ServiceResult);
            }
        }

        /// <summary>
        /// Chinh sua nhân viên theo id
        /// </summary>
        /// <param name="employee">object thông tin chỉnh sửa</param>
        /// <returns>
        /// 200 - thành công 
        /// 201 - Thêm mới thành công
        /// 400 - Dữ liệu đầu vào không hợp lệ
        /// 500 - Exception
        /// </returns>
        [HttpPut("{entityId}")]
        public IActionResult Update([FromBody] MISAEntity entity)
        {
            try
            {
                var rowAffects = _baseService.Update(entity);
                if (rowAffects > 0)
                {
                    return StatusCode(201, rowAffects);
                }
                else
                {
                    return NoContent();
                }
                
                /*
                if (serviceResult.Success == false)
                {
                    return BadRequest(serviceResult);
                }
                //So ban ghi sua thanh cong
                var rowAffects = (int)serviceResult.Data;
                if (rowAffects > 0)
                {
                    return StatusCode(201, rowAffects);
                }
                else
                {
                    return NoContent();
                }*/
            }
            catch (Exception e)
            {
                ServiceResult.Success = false;
                ServiceResult.UserMsg = Resources.ErrorMsg;
                ServiceResult.DevMsg = e.Message;
                ServiceResult.MISACode = MISAConst.MISACodeErrorException;
                return StatusCode(500, ServiceResult);
            }
        }

        #endregion
    }
}
