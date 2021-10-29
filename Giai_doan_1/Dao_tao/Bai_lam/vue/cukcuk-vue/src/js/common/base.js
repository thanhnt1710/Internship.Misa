class BaseJS {
	constructor() {
		this.getDataUrl = null;
		this.setDataUrl();
		this.loadData();
		this.initEvent();
	}

	setDataUrl() {}

	initEvent() {
		var me = this;

		//Thu nho navbar
		//Du chuyen sang trai
		$(".navbar__btn-moveleft").click(function () {
		//Chuyen tu grid mac dinh sang grid thu nho
			$(".navbar")
				.removeClass("grid__column-2")
				.addClass("grid__column-navbar_mini");
			$(".main")
				.removeClass("grid__column-10")
				.addClass("grid__column-navbar_mini_right");
			$(".navbar__header-link").css("margin-left", "14px"); //Chinh vi tri icon
			$(".navbar__list-item-link").css("display", "none"); // Xoa ten cac truong thong tin
			$(".navbar__btn-moveleft.fas").css("display", "none"); // an btn sang trai
			$(".navbar__btn-moveright.fas").css("display", "block"); // hien btn sang phai
		});
		//Di chuyen sang phai
		$(".navbar__btn-moveright").click(function () {
			//Chuyen tu grid thu nho sang grid mac dinh
			$(".navbar")
				.removeClass("grid__column-navbar_mini")
				.addClass("grid__column-2");
			$(".main")
				.removeClass("grid__column-navbar_mini_right")
				.addClass("grid__column-10");
			$(".navbar__header-link").css("margin-left", "0"); //Chinh vi tri icon
			$(".navbar__list-item-link").css("display", "block"); // Hien ten cac truong thong tin
			$(".navbar__btn-moveright.fas").css("display", "none"); // an btn sang phai
			$(".navbar__btn-moveleft.fas").css("display", "block"); // hien btn sang trai
		});

		//Focus, blur input -> thêm, bỏ border
		$(".search__left__search input").focus(function () {
			$(".search__left__search").css("border-color", "var(--default-color)");
		});
		$(".search__left__search input").blur(function () {
			$(".search__left__search").removeAttr("style");
		});

		//Combobox
		//Nhan vao icon down hien border va show noi dung de select
		$(".combobox__top i").mousedown(function () {
			$(this).parents('.combobox').css("border-color", "var(--default-color)");
			$(this).parents('.combobox').find('.combobox__content').show();
		});
		//Chon mot item trong select main
		$(".combobox__content").on('click', 'div', function() {
			//Xoa border 
			$(this).parents(".combobox").removeAttr("style");
			//Set gia tri cho input bang gia tri vua chon
			$(this)
				.parents(".combobox")
				.find(".combobox__top input")
				.val($(this).find("span").text());
			//Xoa class hien tai cua item cu
			$(this)
				.siblings(".combobox__content__current")
				.removeAttr("class");
			//them class hien tai cua item vua chon
			$(this).addClass("combobox__content__current");
			//Lay valueId cua item vua chon set cho input
			$(this)
			.parents(".combobox")
			.find(".combobox__top input")
			.attr('valueId', $(this).attr('valueId'));
			// An noi dung dropdownn
			$(".combobox__content").hide();
		});

		//Click input hien border
		$('.combobox__top input').on('click', function() {
			$(this).parents('.combobox').css("border-color", "var(--default-color)");
			// $(this).parents('.combobox').find('.combobox__content').show();
		})

		$(".combobox").mouseleave(function () {
			$(this).find('.combobox__top input').blur();
			$(this).removeAttr("style");
			$(this).find(".combobox__content").hide();
			$(this).find('.result_select').removeClass('result_select');
			$(this).find(`[index]`).removeAttr('index');
			$(this).find(`[max_index_result]`).removeAttr('max_index_result');
		});
		

		//Khi thay doi gia tri o input combobox
		$('.combobox__top input').on('input', function() {
			var value = $(this).val();
			var data = [];
			var divs = $(this).parents('.combobox').find('.combobox__content div');
			var index_result = 0;
			$.each(divs, function(index, div) {
				var data_text = $(this).find('span').text();
				data.push({text: data_text, value: $(this).attr('valueId')});
				if(	!(
					removeVietnameseTones(data_text).toLowerCase().includes(removeVietnameseTones(value).toLowerCase()) 
				)) {
					$(this).css('display', 'none');
					$(this).removeAttr('index');
				}
				else{ 
					$(this).css('display', 'block');
					$(this).attr('index', index_result);
				}
				index_result++;
			});
			$(this).parents('.combobox').find('.combobox__content').attr('max_index_result', index_result-1);
			$(this).parents('.combobox').find('.combobox__content').show();

			//Neu an nut khi dang nhap tim kiem
			$(this).bind('keydown', function(e) {
				var item_current = $(this).parents('.combobox').find('.result_select');
				if(e.keyCode == 40 || e.which == 40) {//Nhấn xuống
					if(item_current.length==1) {//Neu co item được hover rồi
						var index = parseInt(item_current.attr('index'));
						if(index >= 0 && index < index_result-1) {
							item_current.removeClass('result_select');
							index++;
							$(this).parents('.combobox').find(`[index="${index}"]`).addClass('result_select');
						}
						else if(index == index_result - 1) {
							item_current.removeClass('result_select');
							$(this).parents('.combobox').find(`[index=0]`).addClass('result_select');
						}
					}
					else {// nếu chưa có item nào được hover
						//Them class result_select vao item dau tien 
						$(this).parents('.combobox').find('[index=0]').addClass('result_select');
					}
				}
				else if(e.keyCode == 38 || e.which == 38) {//Nhấn lên
					if(item_current.length==1) {//Neu co item được hover rồi
						var index = parseInt(item_current.attr('index'));
						console.log(typeof index);
						if(index > 0 && index <= index_result-1) {
							item_current.removeClass('result_select');
							index--;
							$(this).parents('.combobox').find(`[index="${index}"]`).addClass('result_select');
						}
						else if(index == 0) {
							item_current.removeClass('result_select');
							index = index_result-1;
							$(this).parents('.combobox').find(`[index="${index}"]`).addClass('result_select');
						}
					}
				}
				else if(e.keyCode == 13 || e.which == 13) {//Nhân enter
					//Xoa border 
					$(this).parents(".combobox").removeAttr("style");
					//Set gia tri cho input bang gia tri vua chon
					$(this).val($(this).parents(".combobox").find(".result_select span").text());
					//Xoa class hien tai cua item cu
					$(this)
						.parents(".combobox")
						.find(".combobox__content__current")
						.removeClass("combobox__content__current");
					//them class hien tai cua item vua chon
					$(this)
						.parents(".combobox")
						.find(".result_select")
						.addClass("combobox__content__current");
					//Lay valueId cua item vua chon set cho input
					$(this).attr('valueId', $(this).parents(".combobox").find(".result_select").attr('valueId'));
					// An noi dung dropdownn
					$(".combobox__content").hide();
				}
			})
			
		})


		//Load lai du lieu khi nhan btn nap
		$("#btnRefresh").click(() => {
			this.loadData();
			// Hoac 
			// me.loadData();
			// neu khong dung arrow function
		});

		

		//Xu ly hien thi modal
		//Hien thi them nhan vien khi an btn "them nhan vien"
		$("#btnAdd").click(function () {
			//Danh dau su kien them moi 
			me.formMode = 'Add';
			//reset lai Form
			resetForm();
			$(".modal").css("display", "block"); //Hien thi form
			$(".auto_focus")[0].focus(); //focus o dau tien
			//Tao ma nhan vien
			getEmployeeCode();
		});

		//xoa noi dung ben trong để nhập lại dữ liệu mới
		$("#btnCancel").click(function () {
			//Hiển thị popup cảnh báo
			popup(
				"Cảnh báo",
				"Bạn có chắc muốn nhập lại không?",
				"Mọi dữ liệu trong các trường sẽ bị xóa!",
				"Tiết tục nhập", 
				"Nhập lại", 
				"#FFD700");
			//Xóa nội dung để nhập mới
			retypeAddEmployee();
		});

		//Huy khi nhan dau X -> dữ liệu bị xóa -> ẩn modal
		$("#iconCancel").click(function() {
			//Hiện cảnh báo
			popup(
				"Thông báo", 
				"Bạn có chắc muốn tắt hộp thoại không?",
				"Mọi dữ liệu vừa nhập sẽ bị xóa!", 
				"Tiết tục nhập", 
				"Đóng", 
				"red"
			);
			//Neu an dong
			cancelAddEmployee();
		});


		//Dropdown form thong tin nhan vien
		//Di chuot khoi -> bien mat
		// $(".right__block-detail-item").mouseleave(function () {
		// 	$(this)
		// 		.find(".right__block-detail-item__dropdown_btn")
		// 		.removeAttr("style");
		// 	$(this).find(".right__block-detail-item__dropdown_content").hide();
		// });

		//Click vao dropdown trong form -> hien border va show noi dung
		// $(".right__block-detail-item__dropdown_btn").click(function () {
		// 	$(this).css({
		// 		"border-color": "var(--default-color)",
		// 		"z-index": "1",
		// 	});
		// 	$(this).siblings(".right__block-detail-item__dropdown_content").show();
		// });

		//Click vao chon mot item trong dropdown
		// $(".right__block-detail-item__dropdown_content").on("click", "div", function() {
		// 	//Xoa border btn
		// 	$(this)
		// 		.parent()
		// 		.siblings(".right__block-detail-item__dropdown_btn")
		// 		.removeAttr("style");
		// 	// Set lai text cho btn voi gia tri vua chon
		// 	$(this)
		// 		.parent()
		// 		.siblings(".right__block-detail-item__dropdown_btn")
		// 		.find("span")
		// 		.text($(this).html());
		// 	//Xet value cho span btn voi value la gia tri vua chon
		// 	var value = $(this).attr("value");
		// 	$(this)
		// 		.parent()
		// 		.siblings(".right__block-detail-item__dropdown_btn")
		// 		.find("span")
		// 		.attr("value", value);
		// 	//Xoa class đang được chọn
		// 	$(this)
		// 		.siblings(".right__block-detail-item__dropdown_content__current")
		// 		.removeAttr("class");
		// 	//Them class  đang được chọn vào item vừa chọn
		// 	$(this).addClass("right__block-detail-item__dropdown_content__current");
		// 	//Ẩn dropdown
		// 	$(this).parent().hide();
		// });


		//An thong bao khiu blur truong Ma nhan vien
		$("input[readonly]").blur(function () {
			$(this)
			.parent()
			.siblings(".right__block-detail-item__auto")
			.css("display", "none");
		})

		$("input[readonly]").click(function () {
			$(this)
			.parent()
			.siblings(".right__block-detail-item__auto")
			.css("display", "block");
		})

		//Validate (Kiem tra tung truong sau khi blur)
		/**
		 * Kiem tra ca truong khong duoc de trong (input[required])
		 * Author: ntthanh (8/7/2021)
		 */
		$("input[required]").blur(function () {
			var value = $(this).val();
			if (!value) {
				$(this).css("border", "1px solid red");
				$(this)
				.parent()
				.siblings(".right__block-detail-item__empty")
				.css("display", "block");
				$(this).attr("validate", false);
			} else {
				$(this).removeAttr("style");
				$(this)
				.parent()
				.siblings(".right__block-detail-item__empty")
				.css("display", "none");
				$(this).attr("validate", true);
			}
		});

		/**
		 * Kiem tra cac truong phai la so nhu so dien thoai, so CCCD,...
		 * Author: ntthanh (8/7/2021)
		 */
		$("input.text_only_number").blur(function () {
			var value = $(this).val();
			if (!$.isNumeric(value)) {
				$(this).css("border", "1px solid red");
				$(this)
				.parent()
				.siblings(".right__block-detail-item__error")
				.css("display", "block");
			} else {
				$(this).removeAttr("style");
				$(this)
				.parent()
				.siblings(".right__block-detail-item__error")
				.css("display", "none");
			}
		});

		/**
		 * Kiem tra Email dung dinh dang
		 * Author: ntthanh (8/7/2021)
		 */
		$('input[type="email"]').blur(function () {
			var email = $(this).val();
			var regex =
				/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if (!regex.test(email)) {
				$(this).css("border", "1px solid red");
				$(this)
				.parent()
				.siblings(".right__block-detail-item__error")
				.css("display", "block");
				$(this).attr("validate", false);
			} else {
				$(this).removeAttr("style");
				$(this)
				.parent()
				.siblings(".right__block-detail-item__error")
				.css("display", "none");
				$(this).attr("validate", true);
			}
		});



		//Khi focus vao the input[readonly] ma nhan vien -> hien cac thong bao
		$("input[readonly]").click(function () {
			$(this)
			.parent()
			.siblings(".right__block-detail-item__auto")
			.css("display", "block");
		});

		//Khi focus vao the input[required] -> an di cac thong bao
		$("input[required]").click(function () {
			$(this)
				.parent()
				.siblings(".right__block-detail-item__empty")
				.css("display", "none");
			$(this)
				.parent()
				.siblings(".right__block-detail-item__error")
				.css("display", "none");
		});

		//Khi focus vao input.text_only_number -> an di cac thong bao
		$("input.text_only_number").click(function () {
			$(this)
				.parent()
				.siblings(".right__block-detail-item__empty")
				.css("display", "none");
			$(this)
				.parent()
				.siblings(".right__block-detail-item__error")
				.css("display", "none");
		});

		//Khi nhan btn "Luu" se luu du lieu
		$("#btnSave").click(function () {
			//Validate du lieu
			var inputValidate = $('input[required], input[type="email"]');
			$.each(inputValidate, function (index, input) {
				$(input).trigger("blur");
			});
			var inputNotValids = $('input[validate="false"]');
			if (inputNotValids && inputNotValids.length > 0) {
				// inputNotValids[0].focus();
				toastTop("Thông báo", "Dữ liệu không hợp lệ", "Vui lòng kiểm tra lại!", "");
				//Focus vao o dau tien sai va an di cac canh bao
				// $(inputNotValids[0]).parent().siblings(".right__block-detail-item__empty").css("display", "none");
				// $(inputNotValids[0]).parent().siblings(".right__block-detail-item__error").css("display", "none");
				return;
			}

			//Thu thap du lieu duoc nhap vao -> build thanh obj
			//Lay tât ca cac truong nhap lieu
			var field_input = $("input[fieldName]");
			var field_span = $("span[fieldName]");
			var employee = {};
			$.each(field_input, function (index, input) {
				var propertyName = $(this).attr("fieldName");		
				var value = $(this).val();
				employee[propertyName] = value;
			});
			$.each(field_span, function (index, input) {
				if(!isNaN($(this).attr('value'))) {
					var propertyName = $(this).attr("fieldName");
					var value = $(this).attr('value');
					employee[propertyName] = parseInt(value);
				}
				else {
					var propertyName = $(this).attr("fieldName");
					var propertyId = $(this).attr("fieldId");
					var value_name = $(this).text();
					var value_id = $(this).attr('value');
					employee[propertyName] = value_name;
					employee[propertyId] = value_id;
				}
			});
			
			//Goi Server thuc hien luu du lieu
			//Trước khi gọi, kiểm tra gọi để thêm mới (Add) hay sưa (Edit)
			if(me.formMode == 'Add') {// Neu la them moi -> POST
				//Goi Server thuc hien them moi du lieu
				$.ajax({
					url: "http://cukcuk.manhnv.net/v1/Employees",
					method: "POST",
					contentType: "application/json",
					data: JSON.stringify(employee),
				})
				.done(function (res) {
					//Sau khi luu thanh cong thi
					// + dua ra thong bao thanh cong
					toastRight("Thêm nhân viên mã", $('input[readonly]').val(), "thành công", "success");
	
					//reset lai Form
					resetForm();
					$(".modal").css("display", "none"); //an modal
	
					// + load lai du lieu
					me.loadData();
				})
				.fail(function (res) {
					toastRight("Thêm nhân viên mã", $('input[readonly]').val(), "thất bại", "error");
					console.log(res);
				});
			}
			else if(me.formMode == 'Edit') {// neu la sua -> PUT
				//Theem EmployeeId để sửa
				employee.EmployeeId = me.recordIdEdit;
				//Goi Server thuc hien them sua du lieu
				console.log(employee);
				$.ajax({
					url: `http://cukcuk.manhnv.net/v1/Employees/${me.recordIdEdit}`,
					method: "PUT",
					contentType: "application/json-patch+json",
					data: JSON.stringify(employee),
				})
				.done(function (res) {
					//Sau khi sua thanh cong thi
					// + dua ra thong bao thanh cong
					toastRight("Sửa nhân viên mã", $('input[readonly]').val(), "thành công", "success");
	
					//reset lai Form
					resetForm();
					$(".modal").css("display", "none"); //an modal
	
					// + load lai du lieu
					me.loadData();
				})
				.fail(function (res) {
					toastRight("Sửa nhân viên mã", $('input[readonly]').val(), "thất bại", "error");
					console.log(res);
				});
			}
		});

		//Table
		//DblClick row hien thi thong tin chi tiet
		$(".contentdetail-table tbody").on("dblclick", "tr", function() {
			//Danh dau su kien Sua
			me.formMode = 'Edit';
			//reset lai Form
			resetForm();
			//Lay khoa chinh cua ban ghi da chon
			var recordId = $(this).data('recordId');
			me.recordIdEdit = recordId;
			//Goi service lay thong tin chi tiet qua Id
			$.ajax({
				url: `http://cukcuk.manhnv.net/v1/Employees/${recordId}`,
				method: 'GET'
			})
			.done(function(res) {
				//Binding du lieu len form chi tiet
				
				//Lay tât ca du lieu cac truong cac truong 
				var field_input = $("input[fieldName]");
				var field_span = $("span[fieldName]");
				$.each(field_input, function (index, input) {
					var propertyName = $(this).attr("fieldName");
					var value = res[propertyName];
					$(this).val(value);
				});
				$.each(field_span, function (index, input) {
					var propertyName = $(this).attr("fieldName");
					var propertyId = $(this).attr("fieldId");
					var value = res[propertyName];
					var id = res[propertyId];
					if(id == null) {
						var content = $(this).parent().siblings(`.right__block-detail-item__dropdown_content`).find(`div[value=${value}]`).text();
						$(this).attr('value', value);
						$(this).text(content);
					}
					else {
						var content = $(this).parent().siblings(`.right__block-detail-item__dropdown_content`).find(`div[value=${id}]`).text();
						$(this).attr('value', id);
						$(this).text(content);
					}
				});
			})
			.fail(function(res) {
				console.log(res);
			})

			$(".modal").css("display", "block");
		});

		//Xoa nhan vien
		//click 1 hang se tô đậm và thêm class đánh dấu xóa
		$(".contentdetail-table tbody").on("click", "tr", function() {
			$(this).toggleClass("remove");
		})
		//Nhan vao btn Xoa sẽ hiện cảnh báo, đồng ý sẽ xóa các nhân viên đc tô đậm
		$("#btnRemove").click(function () {
			var flag_remove = true;
			setTimeout(function () {
				var removes = $('.remove');
				//Neu da chon nhan vien de xoa
				if(removes.length>0) {
					//Hien thi popup canh bao
					popup(
						"Cảnh báo",
						"Bạn có chắc muốn xóa những nhân viên đã chọn không?",
						"Mọi dữ liệu về những nhân viên này sẽ bị xóa vĩnh viễn!",
						"Hủy", 
						"Xóa", 
						"red"
					);
					//Nếu ấn "Xóa"
					removeEmployees(removes);
					//tải lại dữ liệu
					$("#popup").on("click", ".popup__footer__cancel", function() {
						if(flag_remove) {
							setTimeout(function () {
								me.loadData();
							}, 500);
						}
						flag_remove = false;
					})
				}
				else {//Neu chua chon ai de xoa
					toastTop("Thông báo", "Chưa chọn nhân viên muốn xóa", "Nhấn chuột vào nhân viên bạn muốn xóa", "Sau đó nhấn nút xóa ở góc trên bên phải");
				}
			},250);
		})
	}

	
	/**
	 * Load du lieu
	 * CreateBy: ntthanh (6/7/2021)
	 */
	loadData() {
		//Lam rong noi dung
		$('table tbody').empty();
		//Lay thong tin cac cot du lieu
		var columns = $("table thead th");
		var getDataUrl = this.getDataUrl;
		//Lay thong tin du lieu se map tuong ung voi cac cot du lieu
		$.ajax({
			url: getDataUrl,
			method: "GET",
		})
		.done(function (res) {
			$.each(res, function (index, obj) {
				var tr = $(`<tr></tr>`);
				$(tr).data('recordId', obj.EmployeeId);
				$(tr).data('recordCode', obj.EmployeeCode);
				$.each(columns, function (index, th) {
					var td = $(`<td><span></span></td>`);
					var fieldName = $(th).attr("fieldName");
					var value = obj[fieldName];
					var formatType = $(th).attr("formatType");
					switch (formatType) {
					case "ddmmyyyy":
						value = formatDate(value);
						break;
					case "Money":
						td.css("text-align", "right");
						value = formatMoney(value);
						break;
					case "Gender":
						value = formatGender(value);
					default:
						break;
					}
					$(td).append(value);
					$(tr).append(td);
				});
				$("table tbody").append(tr);
			});
			toastTop("Thông báo", "Tải dữ liệu thành công!", "", "");
		})
		.fail(function (res) {
			toastTop("Thông báo", "Tải dữ liệu thất bại!", "Kiểm tra lại kết nối của bạn","Hoặc liên hệ với quản trị viên hệ thống");
		});

		//Lay thong tin Vi trí, set các giá trị cho select dropdown
		getPosition();

		//Lay thong tin Phong ban, set các giá trị cho select dropdown
		getDepartment();
	}
}

