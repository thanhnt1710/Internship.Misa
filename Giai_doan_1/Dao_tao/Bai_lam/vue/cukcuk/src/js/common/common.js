export const Format = {
	methods: {
		/**
		 * Format gioi tinh
		 * @param {string or null} gender gioi tinh
		 * CreateBy: ntthanh (5/7/2021)
		 */
		formatGender(gender) {
			if (gender === null) return `Không xác định`;
			switch(gender) {
			case 0:
				return 'Nam';
			case 1:
				return 'Nữ';
			case 2:
				return 'Khác';
			default:
				return 'Không xác định';
			}
		},
	
		/**
		 * Format su lieu sang dd/mm/yyyy
		 * @param {*} date bat cu kieu du lieu nao
		 * @returns
		 * CreateBy: ntthanh (//)
		 */
		formatDDMMYYY(date) {
			let dateOfBirth = new Date(date);
			if (Number.isNaN(dateOfBirth.getTime())) {//kiem tra lai
				return "";
			} else {
				let day = dateOfBirth.getDate(),
					month = dateOfBirth.getMonth() + 1,
					year = dateOfBirth.getFullYear();
				day = day < 10 ? "0" + day : day;
				month = month < 10 ? "0" + month : month;
				return `${day}/${month}/${year}`;
			}
		},
		
		
		// formatYYYYMMDD(date) {
		// 	let dateTime = new Date(date);
		// 	if (Number.isNaN(dateTime.getTime())) {
		// 		return "";
		// 	} else {
		// 		let day = dateTime.getDate(),
		// 			month = dateTime.getMonth() + 1,
		// 			year = dateTime.getFullYear();
		// 		day = day < 10 ? "0" + day : day;
		// 		month = month < 10 ? "0" + month : month;
		// 		return `${year}-${month}-${day}`;
		// 	}
		// },

		/**
		 * Ham dinh dang hien thi tien te
		 * @param {number} money So tien
		 * CreateBy: ntthanh (5/7/2021)
		 */
		formatMoney(money) {
			if (Number.isInteger(money))
			return money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
			else return "0";
		},
	},
}