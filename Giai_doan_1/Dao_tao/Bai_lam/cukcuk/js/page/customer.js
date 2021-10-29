    $(document).ready(function () {
        new CustomerJS();
    });
    
    /**
     * Class quan ly cac su kien cho trang customer
     * CreateBy: ntthanh (6/7/2021) 
     */
    class CustomerJS extends BaseJS{
        constructor() {
        this.loadData();
        }

    
        /**
         * Load du lieu 
         * CreateBy: ntthanh (6/7/2021) 
         */
        loadData() {
        //Lay du lieu ve
        $.ajax({
            url: "http://cukcuk.manhnv.net/v1/Employees",
            method: "GET",
        })
            .done(function (res) {
            let data = res;
            let stt = 1;
            $.each(data, function (index, item) {
                let gender = item["GenderName"];
                let dateOfBirth = item["DateOfBirth"];
                let salary = item["Salary"];
                gender = formatGender(gender);
                dateOfBirth = formatDate(dateOfBirth);
                salary = formatMoney(salary);
                let tr = $(`<tr>
                            <td>
                                <input type="checkbox">
                            </td>
                            <td><span>${stt}</span></td>
                            <td><span title="${item["EmployeeId"]}">${item["EmployeeId"]}</span></td>
                            <td><span title="${item["FullName"]}">${item["FullName"]}</span></td>
                            <td><span title="${gender}">${gender}</span></td>
                            <td><span title="${dateOfBirth}">${dateOfBirth}</span></td>
                            <td><span title="${item["PhoneNumber"]}">${item["PhoneNumber"]}</span></td>
                            <td><span title="${item["Email"]}">${item["Email"]}</span></td>
                            <td><span title="${item["QualificationName"]}">${item["QualificationName"]}</span></td>
                            <td><span title="${item["DepartmentName"]}">${item["DepartmentName"]}</span></td>
                            <td style="text-align: right"><span title="${salary}">${salary}</span></td>
                            <td><span title="${item["Address"]}">${item["Address"]}</span></td>
                            </tr>`);
                $(".contentdetail-table tbody").append(tr);
                stt++;
                
            });
        })
        .fail(function (res) {

        });
        }
    
        /**
         * Them moi du lieu 
         * CreateBy: ntthanh (6/7/2021)
         */
        add() {
    
        }
    
        /**
         * Sua du lieu 
         * CreateBy: ntthanh (6/7/2021)
         */
        edit() {
    
        }
    
        /**
         * Xoa du lieu 
         * CreateBy: ntthanh (6/7/2021)
         */
        delete() {
    
        }
    }
    
        