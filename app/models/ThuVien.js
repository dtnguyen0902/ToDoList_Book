function ThuVien() {
    this.arrayThuVien = [];

    // Chức năng Thêm sách
    this.themSach = function (sach) {
        this.arrayThuVien.push(sach);
    };

    // Chức năng Xóa sách
    this.xoaSach = function(maSach){
        this.arrayThuVien.splice(this.timViTri(maSach),1);
    }

    //Chức năng lấy thông tin
    this.layThongTin = function (book){
        var vitri = this.timViTri(book);
        return this.arrayThuVien[vitri];
    }

    //Chức năng cập nhật
    this.capNhatThongTin = function(book){
        this.arrayThuVien.map(function(item){
            if(item.maSach === book.maSach){
                item.tenSach = book.tenSach;
                item.loaiSach = book.loaiSach;
                item.NXB = book.NXB;
                item.tinhTrang = book.tinhTrang;
                item.soLuong = book.soLuong;
                item.donGia = book.donGia;
            }
        })       
    }



    //Tìm vị trí
    this.timViTri = function(maSach){
        var vitri;
        this.arrayThuVien.map(function(item, index){
            if(item.maSach === maSach){
                vitri = index;
            }
        });
        return vitri;
    }
}