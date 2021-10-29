<template>
  <div class="content">
    <div class="title">
      <div class="title__name">Danh sách nhân viên</div>
      <button v-on:click="showModal" id="btnAdd" class="title__btn">
        <img
          src="../../../assets/Resource/icon/add.png"
          alt=""
          class="title__btn-img"
        />
        <div>Thêm nhân viên</div>
      </button>
    </div>
    <div class="search">
      <div class="search__left">
        <div class="search__left__search search__left-format">
          <img src="../../../assets/Resource/icon/search.png" alt="" />
          <input placeholder="Tìm kiếm theo mã, Tên hoặc Số điện thoại" />
        </div>
        <div class="combobox combobox-search search__left__department search__left-format">
          <button class="combobox__top search__left-format__current">
            <input
              class="departmentName"
              fieldName="DepartmentName"
              fieldId="DepartmentId"
              valueId=""
            />
            <i class="fas fa-chevron-down"></i>
          </button>
          <div
            class="department combobox__content search__left-format__content"
          >
            <!-- <div valueId="" class="combobox__content__current result_select">
                            <i class="fas fa-check"></i>
                            <span></span>
                        </div>
                        <div valueId="">
                            <i class="fas fa-check"></i>
                            <span></span>
                        </div>
                        <div valueId="">
                            <i class="fas fa-check"></i>
                            <span></span>
                        </div> -->
          </div>
        </div>
        <div
          class="
            combobox combobox-search
            search__left__position search__left-format
          "
        >
          <button class="combobox__top search__left-format__current">
            <input
              class="positionName"
              fieldName="positionName"
              fieldId="PositionId"
              valueId=""
            />
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="position combobox__content search__left-format__content">
            <!-- <div valueId="" class="combobox__content__current">
                            <i class="fas fa-check"></i>
                            <span></span>
                        </div>
                        <div valueId="">
                            <i class="fas fa-check"></i>
                            <span></span>
                        </div>
                        <div valueId="">
                            <i class="fas fa-check"></i>
                            <span></span>
                        </div> -->
          </div>
        </div>
      </div>
      <div class="search__right">
        <button id="btnRemove" class="search__right-btn">
          <i class="far fa-trash-alt"></i>
        </button>
        <button id="btnRefresh" class="search__right-btn">
          <img
            src="../../../assets/Resource/icon/refresh.png"
            alt=""
            class="search__right-btn__img"
          />
        </button>
      </div>
    </div>
    <div class="contentdetail">
      <table class="contentdetail-table" cellspacing="0">
        <thead>
          <tr>
            <!-- <th></th>
                        <th>#</th> -->
            <th fieldName="EmployeeCode" formatType="">Mã nhân viên</th>
            <th fieldName="FullName" formatType="">Họ và tên</th>
            <th fieldName="GenderName" formatType="Gender">Giới tính</th>
            <th fieldName="DateOfBirth" formatType="ddmmyyyy">Ngày sinh</th>
            <th fieldName="PhoneNumber" formatType="">Số điện thoại</th>
            <th fieldName="Email" formatType="">Email</th>
            <th fieldName="PositionName" formatType="">Vị trí</th>
            <th fieldName="DepartmentName" formatType="">Phòng ban</th>
            <th fieldName="Salary" formatType="Money">Tiền lương</th>
            <th fieldName="Address" formatType="">Địa chỉ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in this.$store.state.employees" v-bind:key="employee.EmployeeId">
            <td v-bind:title="employee.EmployeeCode">
              {{ employee.EmployeeCode }}
            </td>
            <td v-bind:title="employee.FullName">{{ employee.FullName }}</td>
            <td v-bind:title="employee.Gender">{{ employee.Gender }}</td>
            <td v-bind:title="employee.DateOfBirth">
              {{ employee.DateOfBirth }}
            </td>
            <td v-bind:title="employee.PhoneNumber">
              {{ employee.PhoneNumber }}
            </td>
            <td v-bind:title="employee.Email">{{ employee.Email }}</td>
            <td v-bind:title="employee.PositionName">
              {{ employee.PositionName }}
            </td>
            <td v-bind:title="employee.DepartmentName">
              {{ employee.DepartmentName }}
            </td>
            <td v-bind:title="formatMoney(employee.Salary)">{{ formatMoney(employee.Salary) }}</td>
            <td v-bind:title="employee.Address">{{ employee.Address }}</td>
          </tr>
          <!-- <tr class="remove">
                <td title:>NV000001</td>
                <td title:>Nguyễn Văn ABC</td>
                <td title:>Nam</td>
                <td title:>01/01/2000</td>
                <td title:>012345678</td>
                <td title:>thanhnguyen340034@gmail.com</td>
                <td title:>Giám đốc</td>
                <td title:>Phòng ban</td>
                <td title:>14.000.000</td>
                <td title:>Phương Liêt, Thanh Xuân, Hà Nội Phương Liêt, Thanh Xuân, Hà Nội Phương Liêt, Thanh Xuân, Hà Nội</td>
            </tr>
            <tr>
                <td title:>NV000001</td>
                <td title:>Nguyễn Văn ABC</td>
                <td title:>Nam</td>
                <td title:>01/01/2000</td>
                <td title:>012345678</td>
                <td title:>thanhnguyen340034@gmail.com</td>
                <td title:>Giám đốc</td>
                <td title:>Phòng ban</td>
                <td title:>14.000.000</td>
                <td title:>Phương Liêt, Thanh Xuân, Hà Nội Phương Liêt, Thanh Xuân, Hà Nội Phương Liêt, Thanh Xuân, Hà Nội</td>
            </tr> -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
@import "../../../css/page/employee.css";
@import "../../../css/common/combobox.css";
</style>

<script>
export default {
  name: "EmployeeContent",
  components: {

  },
  data() {
    return {

    };
  },
  create() {
    // this.$store.dispatch('getEmployees');
  },
  props: {

  },
  methods: {
    showModal() {
      this.$store.commit("SHOW_MODAL");
    },
    /**
     * Format gioi tinh
     * @param {string or null} gender gioi tinh
     * CreateBy: ntthanh (5/7/2021)
     */
    formatGender(gender) {
      if (gender === null) return `Không xác định`;
      else return gender;
    },

    /**
     * Format su lieu sang ngay thang nam
     * @param {*} date bat cu kieu du lieu nao
     * @returns
     * CreateBy: ntthanh (//)
     */
    formatDate(date) {
    //   var date = new Date(date);
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
    },

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
};
</script>