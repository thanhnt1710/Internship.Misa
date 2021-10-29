/**
 * Chuyen tieng viet co dau thanh khong dau
 * @param {string} str chuoi can chuyen
 * @returns 
 */
function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}

/**
 * Format gioi tinh
 * @param {string or null} gender gioi tinh
 * CreateBy: ntthanh (5/7/2021)
 */
function formatGender(gender) {
if (gender === null) return `Không xác định`;
else return gender;
}

/**
 * Format su lieu sang ngay thang nam
 * @param {*} date bat cu kieu du lieu nao
 * @returns
 * CreateBy: ntthanh (//)
 */
function formatDate(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime())) {
        return "";
    } else {
        let day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;
        return `${day}/${month}/${year}`;
    }
}

/**
 * Ham dinh dang hien thi tien te
 * @param {number} money So tien
 * CreateBy: ntthanh (5/7/2021)
 */
function formatMoney(money) {
if (Number.isInteger(money))
    return money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
else return "0";
}


/**
 * Ham tao ma nhan vien set gia tri cho truong ma nhan vien
 * author: ntthanh (9/7/2021)
 */
 function getEmployeeCode() {
    $.ajax({
        url: "http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode",
        method: "GET",
    })
    .done(function (res) {
        $('input[readonly]').val(res);
        toastRight("Tạo mã nhân viên thành công", "", "", "success");
    })
    .fail(function (res) {
        toastRight("Tạo mã nhân viên thất bại", "", "", "error");
    });
}

/**
 * Khởi tạo lại form về mặc định
 */
function resetForm() {
    $(".right__block-detail-item__content input").val(""); // xoa noi dung ben trong input
    $(".right__block-detail-item input").removeAttr("style"); //Bo border cac khung input
    //An cac thong bao loi
    $(".right__block-detail-item__error").css("display", "none");
    $(".right__block-detail-item__empty").css("display", "none");
}

/**
 * Hien thi thong bao Từ trên xuống voi Tieu de và Noi dung thong bao
 * @param {string} title  Tieu de thong bao
 * @param {string} message1 Noi dung thong bao
 * @param {string} message2 Noi dung thong bao
 * @param {string} message3 Noi dung thong bao
 */
function toastTop(title , message1, message2, message3) {
    const main = document.getElementById('toast_top');
    if(main) {
        const toast_top = document.createElement('div');

        toast_top.classList.add('toast_top'); 
        toast_top.innerHTML = `
            <div class="toast_top__title">
                ${title}
            </div>
            <div class="toast_top__content">
                ${message1}<br>${message2}<br>${message3}
            </div>
            <div class="toast_top__footer">
                <button class="toast_top__footer-btn">Đóng</button>
            </div>
        `;
        main.appendChild(toast_top);
        
    }
    setTimeout(function(){
        $("#toast_top").empty();
    }, 4000);
}

/**
 * An thong bao tu tren xuong (toast top) khi nhan btn "Dong"
 */
$("#toast_top").on("click", ".toast_top__footer button", function() {
    $("#toast_top").empty();
    $(".auto_focus")[0].focus(); //focus o dau tien
})

/**
 * Ham hien thi canh bao voi cac tham so truyen vao phu hop cac truong hop khac nhau
 * @param {string} title Tieu de canh bao 
 * @param {string} message1 Thong diep canh bao
 * @param {string} message2 Thong diep canh bao
 * @param {string} content_btn1 Noi dung hien thi button 1
 * @param {string} content_btn2 Noi dung hien thi button 2
 * @param {string} color Mau chủ đạo the hien tuy tinh huong canh bao
 * Author: ntthanh (9/7/2021)
 */
function popup(title, message1, message2, content_btn1, content_btn2, color) {
    $("#popup").append(`
        <div class="popup">
            <div class="popup__title">
                ${title}
            </div>
            <div class="popup__content">
                <div class="popup__content__icon">
                    <i style="color: ${color}" class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="popup__content__text">${message1}<br>${message2}</div>
            </div>
            <div class="popup__footer">
                <button class="popup__footer__cont">${content_btn1}</button>
                <button style="background-color: ${color}" class="popup__footer__cancel">${content_btn2}</button>
            </div>
        </div>
    `);
}

/**
 * Hàm hiển thị thông báo kết quả 1 thao tác thêm sửa xóa của người dùng 
 * @param {string} message1 Công việc cần thông báo: Thêm nhân viên, Xóa nhân viên, ...
 * @param {string} message2 Mã nhân viên của mỗi lần thông báo
 * @param {string} message3 Kết quả (Thành công, thất bại, ...)
 * @param {string} type Kiểu thông báo để hiên thị màu (Chỉ nhận các giá trị định nghĩa sẵn: success, error, ...)
 * Author: ntthanh (10/7/2021)
 */
function toastRight(message1, message2, message3, type) {
    const main = document.getElementById('toast_right');
    if(main) {
        const toast_right = document.createElement('div');

        const icons = {
            success: "fas fa-check-circle",
            warning: "fas fa-exclamation-circle" ,
            error: "fas fa-exclamation-triangle" 
        }
        const icon = icons[type];

        toast_right.classList.add('toast_right', `toast_right--${type}`); 
        toast_right.innerHTML = `
            <div class="toast_right-wrap">
                <div class="toast_right__icon">
                    <i class="${icon}"></i>
                </div>
                <div class="toast_right__content">
                    ${message1} ${message2} ${message3}
                </div>
            </div>
            <div class="toast_right__icon toast_right__icon_close">
                <i class="fas fa-times"></i>
            </div>
        `;
        main.appendChild(toast_right);

        //Auto remove toast_right
        const autoRemoveId = setTimeout(function() {
            main.removeChild(toast_right);
        }, 4000);

        //Remove toast_right when clicked
        $("#toast_right").on("click", ".toast_right__icon_close", function() {
            $(this).parents('.toast_right').remove();
            // clearTimeout(autoRemoveId);
            $(".auto_focus")[0].focus(); //focus o dau tien
        })
    }
}

/**
 * Ẩn cảnh bao nếu ấn button 1 popup cảnh báo
 */
$("#popup").on("click", ".popup__footer__cont", function() {
    $("#popup").empty();
    //Đối với hủy cảnh báo trong form 
    $(".auto_focus")[0].focus(); //focus o dau tien
    //Đối với hủy xóa 
    $(".remove").removeClass("remove");//Bỏ chọn nhân viên đã chọn
})

/**
 * Ham xóa nội dung form nhập liệu để nhập mới
 */
function retypeAddEmployee() {
    $("#popup").on("click", ".popup__footer__cancel", function() {
        $("#popup").empty();//An form canh bao
        //reset lại form 
        resetForm();
        $(".modal").css("display", "block");
        //Tao ma nhan vien
        getEmployeeCode();
        $(".auto_focus")[0].focus(); //focus o dau tien
    })
}

/**
 * Huy nhập form -> thoat ra ngoai
 * Author: ntthanh (9/7/2021)
 */
function cancelAddEmployee() {
    $("#popup").on("click", ".popup__footer__cancel", function() {
        $("#popup").empty();//An form canh bao
        $(".modal").css("display", "none"); //an modal
    });
}

/**
 * Hàm xóa các hàng đã chọn
 * @param {array} removes Mảng các tr có class remove (các hàng cần xóa)
 * Author: ntthanh (11/7/2021)
 */
 function removeEmployees(removes) {
    $("#popup").on("click", ".popup__footer__cancel", function() {
        $("#popup").empty();//An form canh bao
        $.each(removes, function (index, remove) {
            var removeId = $(this).data("recordId");
            var removeCode = $(this).data("recordCode");
            $.ajax({
                url: `http://cukcuk.manhnv.net/v1/Employees/${removeId}`,
                method: 'DELETE'
            })
            .done(function (res) {
                toastRight("Xóa nhân viên mã", removeCode, "thành công", "success");
            })
            .fail(function (res) {
                toastRight("Xóa nhân viên mã", removeCode, "thất bại", "error");
                console.log(res);
            })
        })
        removes = {};
    })
}


/**
 * Lay thong tin Vi trí, set các giá trị cho select dropdown
 * Author: ntthanh (11/7/2021)
 */
function getPosition() {
    var select_position = $('.position');
		select_position.empty();
		$.ajax({
			url: 'http://cukcuk.manhnv.net/v1/Positions',
			method: 'GET'
		})
		.done(function (res) {
			if(res) {
				select_position.siblings('.combobox__top').find('input').val(res[0].PositionName);
				select_position.siblings('.combobox__top').find('input').attr('valueId', res[0].PositionId);
				$.each(res, function(index, obj) {
					var option = $(`
						<div valueId="${obj.PositionId}">
							<i class="fas fa-check"></i>
							<span>${obj.PositionName}</span>
						</div>
					`);
					select_position.append(option);
				})
				$('.position div:first-child').addClass('combobox__content__current');
			}
		})
		.fail(function (res) {
			console.log(res);
			toastRight("Lấy thông tin vị trí thất bại", "", "", "error");
		})
}

/**
 * Lay thong tin Phong ban, set các giá trị cho select dropdown
 * Author: ntthanh (11/7/2021)
 */
function getDepartment() {
    var select_department = $('.department');
		select_department.empty();
		$.ajax({
			url: 'http://cukcuk.manhnv.net/api/Department',
			method: 'GET'
		})
		.done(function (res) {
			if(res) {
				select_department.siblings('.combobox__top').find('input').val(res[0].DepartmentName);
				select_department.siblings('.combobox__top').find('input').attr('valueId', res[0].DepartmentId);
				$.each(res, function(index, obj) {
					var option = $(`
						<div valueId="${obj.DepartmentId}">
							<i class="fas fa-check"></i>
							<span>${obj.DepartmentName}</span>
						</div>
					`);
					select_department.append(option);
				})
				$('.department div:first-child').addClass('combobox__content__current');
            }
		})
		.fail(function (res) {
			console.log(res);
			toastRight("Lấy thông tin phòng ban thất bại", "", "", "error");
		})
}


// function keyBoardResult() {
//     $('.combobox').on('keydown', '.result_select', function() {
//         if(e.keyCode == 40 || e.which == 40) { //Nhấn mũi tên xuống
//             alert(1);
//             $(this).next().addClass('result_select');
//             $(this).removeClass('result_select');
//         } else if(e.keyCode == 38 || e.which == 38) {// Nhaán mũi tên lên 
//             alert(2);
//             $(this).prev().addClass('result_select');
//             $(this).removeClass('result_select');
//         } else if(e.keyCode == 13 || e.which == 13) {//Nhan enter
//             alert(3);
//             $('.combobox__content .result_select').trigger('click');
//         }
//     })
// }