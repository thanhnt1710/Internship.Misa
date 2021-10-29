$(document).ready(function () {
    new EmployeeJS();
});

/**
 * Class quan ly cac su kien cho trang employee
 * CreateBy: ntthanh (6/7/2021)
 */
class EmployeeJS extends BaseJS {
    constructor() {
        super();
    }
    setDataUrl() {
        this.getDataUrl = "http://cukcuk.manhnv.net/v1/Employees";
    }
}
