$(document).ready(function () {
    var KhoSach = new ThuVien();
    var validation = new Validation();
    getLocal();
    $('#btnThem').click(function () {
        $('#btnThemSach').show();
        $('#btnKiemTra').show();
        $('#btnCapNhat').hide();

        $('input').focusout(function () {
            var maSach = $('#ms').val();
            var tenSach = $('#name').val();
            var loaiSach = $('#loaisach').children("option:selected").val();
            var NXB = $('#nxb').val();
            var tinhTrang = $('#tinhtrang').val();
            var soLuong = $('#soluong').val();
            var donGia = $('#dongia').val();

            isCheck = true;
            //Kiểm tra rỗng mã sách
            isCheck &= validation.kiemTraRong(maSach, "#tbMaSach", "(*) Vui lòng nhập Mã Sách") && validation.kiemTraTrung(KhoSach, maSach, '#tbMaSach',"(*) Mã đã bị trùng");

            //Kiểm tra rỗng tên sách
            isCheck &= validation.kiemTraRong(tenSach, "#tbTen", "(*) Vui lòng nhập Tên Sách");

            //Kiểm tra rỗng loại sách
            isCheck &= validation.kiemTraRongOption(loaiSach,"Chọn loại sách", "#tbLoaiSach", "(*) Vui lòng nhập Loại Sách");

            //Kiểm tra rỗng nhà xuất bản
            isCheck &= validation.kiemTraRong(NXB, "#tbNXB", "(*) Vui lòng nhập Nhà Xuất Bản");

            //Kiểm tra rỗng tình trạng
            isCheck &= validation.kiemTraRongOption(tinhTrang,"Tình trạng", "#tbTinhTrang", "(*) Vui lòng nhập Tình Trạng Sách");

            //Kiểm tra rỗng số lượng
            isCheck &= validation.kiemTraRong(soLuong, "#tbSoLuong", "(*) Vui lòng nhập Số lượng Sách");

            //Kiểm tra rỗng đơn giá
            isCheck &= validation.kiemTraRong(donGia, "#tbDonGia", "(*) Vui lòng nhập Đơn giá Sách");
        })
        $('body').delegate('#btnThemSach', 'click', function () {
            var maSach = $('#ms').val();
            var tenSach = $('#name').val();
            var loaiSach = $('#loaisach').val();
            var NXB = $('#nxb').val();
            var tinhTrang = $('#tinhtrang').val();
            var soLuong = $('#soluong').val();
            var donGia = $('#dongia').val();


            var newsach = new Sach(maSach, tenSach, loaiSach, NXB, tinhTrang, soLuong, donGia);


            //Thêm sách
            KhoSach.themSach(newsach);
            table();
            setLocal();
        })
    });

    //Xóa sách
    $('.btnXoa').click(function () {
        var maSach = $(this).data('masach') + "";
        KhoSach.xoaSach(maSach);
        table();
        setLocal();
        getLocal();
    })

    //Sửa sách
    $('.btnSua').click(function () {
        $('#btnThemSach').hide();
        $('#btnCapNhat').show();
        var book = $(this).data("masach") + "";
        var newBook = KhoSach.layThongTin(book);
        $('#ms').val(newBook.maSach);
        $('#name').val(newBook.tenSach);
        $('#loaisach').val(newBook.loaiSach);
        $('#nxb').val(newBook.NXB);
        $('#tinhtrang').val(newBook.tinhTrang);
        $('#soluong').val(newBook.soLuong);
        $('#dongia').val(newBook.donGia);

        //Click vào nút cập nhật
        $('#btnCapNhat').click(function () {
            var maSach = $('#ms').val();
            var tenSach = $('#name').val();
            var loaiSach = $('#loaisach').val();
            var NXB = $('#nxb').val();
            var tinhTrang = $('#tinhtrang').val();
            var soLuong = $('#soluong').val();
            var donGia = $('#dongia').val();

            var newsach = new Sach(maSach, tenSach, loaiSach, NXB, tinhTrang, soLuong, donGia);
            KhoSach.capNhatThongTin(newsach);
            table();
            setLocal();
            getLocal();
        })


    })

    //Tìm kiếm
    $('#searchName').on("keyup", function () {
        var chuoitimkiem = $(this).val().toLowerCase();
        $('#tableDanhSach tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(chuoitimkiem) > -1)
        })
    });

    // Tạo table
    function table() {
        content = "";
        KhoSach.arrayThuVien.map(function (item) {
            content += `
                <tr>
                    <td>${item.maSach}</td>
                    <td>${item.tenSach}</td>
                    <td>${item.loaiSach}</td>
                    <td>${item.NXB}</td>
                    <td>${item.tinhTrang}</td>
                    <td>${item.soLuong}</td>
                    <td>${item.donGia}</td>
                    <td>
                    <button class="btnSua btn btn-success" data-masach="${item.maSach}" data-toggle="modal"
                    data-target="#myModal">Sửa</button>
                    <button class="btnXoa btn btn-danger" data-masach="${item.maSach}">Xóa</button>
                    </td>
                </tr>
                `
        });
        $('#tableDanhSach').html(content);
    };

    // Tạo setLocalStorage
    function setLocal() {
        $.localStorage.set("KhoSach", JSON.stringify(KhoSach.arrayThuVien));
    };

    // Tạo getLocalStorage
    function getLocal() {
        if (localStorage.getItem('KhoSach')) {
            KhoSach.arrayThuVien = JSON.parse(localStorage.getItem('KhoSach'));
        }
        table();
    }

    //Lấy giá trị của input

});
