import ENUMS from '../resource/conststring'

export const Format = {
	methods: {
		/**
		 * Format gioi tinh
		 * @param {string or null} gender gioi tinh
		 * Author: ntthanh (16/08/2021)
		 */
		formatGender(gender) {
			if (gender === null) return ENUMS.GENDER.UNDEFINED;
			switch(gender) {
			case 0:
				return ENUMS.GENDER.MALE;
			case 1:
				return ENUMS.GENDER.FEMALE;
			case 2:
				return ENUMS.GENDER.OTHER;
			default:
				return ENUMS.GENDER.UNDEFINED;
			}
		},
	
		/**
		 * Format su lieu sang dd/mm/yyyy
		 * @param {*} date bat cu kieu du lieu nao
		 * @returns
		 * Author: ntthanh (16/08/2021)
		 */
		formatDate(date) {
			let dateOfBirth = new Date(date);
			if (Number.isNaN(dateOfBirth.getTime()) || date == null) {
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
		
	},
}
