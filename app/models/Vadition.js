function Validation() {
    this.kiemTraRong = function (input, spanid, messFail) {
        if (input === "") {
            $(spanid).show();
            $(spanid).html(messFail);
            return false;
        } else {
            $(spanid).hide();
            return true;
        }
    }

    this.kiemTraRongOption = function (input, txtTest, spanid, messFail) {
        if (input === txtTest) {
            $(spanid).show();
            $(spanid).html(messFail);
            return false;
        } else {
            $(spanid).hide();
            return true;
        }
    }

    //Kiểm tra trùng
    this.kiemTraTrung = function (arraySach, input, spanid, messFail) {
        $.map(arraySach, function (item) {
            if (input === item.maSach) {
                $(spanid).show();
                $(spanid).html(messFail);
                return false;

            } else{
                $(spanid).hide();
                return true;
            }
        })
    }
}