var arrNhanVien = [];
var kiemTra = new Validation();
document.querySelector("#btnClick").onclick = function (){
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVien.salary = document.querySelector('#salary').value;
    nhanVien.hours = document.querySelector('#hours').value;
    var selectChucVu = document.querySelector('#chucVu');
    nhanVien.chucVu = selectChucVu.options[selectChucVu.selectedIndex].innerHTML;

    var valid = true;
    valid &= kiemTra.kiemTraChu(nhanVien.tenNhanVien, "#error_tenNhanVien")
    & kiemTra.kiemTraSo(nhanVien.maNhanVien, "#error_maNhanVien")
    & kiemTra.kiemTraSo(nhanVien.salary, "#error_salary")
    & kiemTra.kiemTraSo(nhanVien.hours, "#error_hours")
    & kiemTra.kiemTraDoDai(nhanVien.maNhanVien, "#error_maNhanVien_length", 4, 6)
    & kiemTra.kiemTraGiaTri(nhanVien.salary, '#error_salary_value', 1000000, 20000000)
    & kiemTra.kiemTraGiaTri(nhanVien.hours, "#error_hours_value", 50, 150)




    if(valid != true){
        return;
    }

    arrNhanVien.push(nhanVien);
    renderTableNhanVien(arrNhanVien);
    luuNhanVienStorage();

}


function renderTableNhanVien (mangNhanVien){
    var html = "";
    for(var i = 0 ; i<mangNhanVien.length; i++){
        var index = mangNhanVien[i];
        var newNhanVien = new NhanVien();
        newNhanVien.maNhanVien = index.maNhanVien;
        newNhanVien.tenNhanVien = index.tenNhanVien;
        newNhanVien.chucVu = index.chucVu;
        newNhanVien.heSoChucVu = index.heSoChucVu;
        newNhanVien.salary = index.salary;
        newNhanVien.hours = index.hours;
        html += 
        `
        <tr>
            <td>${newNhanVien.maNhanVien}</td>
            <td>${newNhanVien.tenNhanVien}</td>
            <td>${newNhanVien.chucVu}</td>
            <td>${newNhanVien.salary}</td>
            <td>${newNhanVien.totalSalary()}</td>
            <td>${newNhanVien.hours}</td>
            <td>${newNhanVien.xepLoaiNhanVien()}</td>
            <td>
                <button class = "btn btn-danger" onclick = "xoaNhanVien('${newNhanVien.maNhanVien}')">Xóa</button>
                <button class = "btn btn-primary" onclick = "suaNhanVien('${newNhanVien.maNhanVien}')">Chỉnh sửa</button>
            </td>
        </tr>
        `
    }
    document.querySelector("#tblNhanVien").innerHTML = html;
}

function xoaNhanVien (maNhanVienClick){
    for (var i = arrNhanVien.length - 1; i>=0; i--){
        var index = arrNhanVien[i];
        if(index.maNhanVien === maNhanVienClick){
            arrNhanVien.splice(i,1);
        }
    }
    renderTableNhanVien(arrNhanVien);
    luuNhanVienStorage();
}

function suaNhanVien (maNhanVienClick){
    for(var i = 0 ; i<arrNhanVien.length; i++){
        var index = arrNhanVien[i];
        if(index.maNhanVien === maNhanVienClick){
            document.querySelector('#maNhanVien').value = index.maNhanVien
            document.querySelector('#tenNhanVien').value = index.tenNhanVien;
            document.querySelector('#chucVu').value = index.heSoChucVu;
            document.querySelector('#salary').value = index.salary;
            document.querySelector('#hours').value = index.hours;
        }
    }
}
document.querySelector("#btnUpdate").onclick = function (){
    var newNhanVien = new NhanVien();
    newNhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    newNhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    newNhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    newNhanVien.salary = document.querySelector('#salary').value;
    newNhanVien.hours = document.querySelector('#hours').value;
    var selectChucVu = document.querySelector('#chucVu');
    newNhanVien.chucVu = selectChucVu.options[selectChucVu.selectedIndex].innerHTML;
    for(var i = 0; i<arrNhanVien.length; i++){
        var index = arrNhanVien[i];
        if(newNhanVien.maNhanVien === index.maNhanVien){
            index.tenNhanVien = newNhanVien.tenNhanVien;
            index.chucVu = newNhanVien.chucVu;
            index.salary = newNhanVien.salary;
            index.hours = newNhanVien.hours;
            index.heSoChucVu = newNhanVien.heSoChucVu;
        }
    }
    renderTableNhanVien(arrNhanVien);
    luuNhanVienStorage();
}
document.querySelector('#timKiem').onclick = function (){
    var tuKhoa = document.querySelector('#tuKhoa').value;
    tuKhoa = tuKhoa.trim().toLowerCase();
    var newArrNhanVien = [];
    for(var i = 0; i < arrNhanVien.length ; i++){
        var index = arrNhanVien[i];
        if(index.tenNhanVien.trim().toLowerCase().search(tuKhoa) !== -1){
            newArrNhanVien.push(index);
        }
    }
    renderTableNhanVien(newArrNhanVien);
}
function luuNhanVienStorage (){
    var sMangNhanVien = JSON.stringify(arrNhanVien);
    localStorage.setItem("arrStaff", sMangNhanVien);
}
function layNhanVienStorage(){
    if(localStorage.getItem("arrStaff")){
        var sMangNhanVien = localStorage.getItem("arrStaff");
        arrNhanVien = JSON.parse(sMangNhanVien);
        renderTableNhanVien(arrNhanVien);
    }

}

layNhanVienStorage();


let sinhVien = {
    id: "1",
    name: "loc",
    price: 1000,
    showInfo: function (){
        console.log('id', sinhVien.id);
        console.log('name', sinhVien.name);
        console.log('price', sinhVien.price);
    },
    info:{
        img: "google.com"
    }
}

let {showInfo,...rest} = sinhVien;
let {img} = sinhVien
console.log(img);
console.log(rest);



let gaiGoi = [1, "loc", "fuck", 2, function(){
    console.log("id", gaiGoi[0]);
    console.log("ten", gaiGoi[1]);
    console.log("tinh trang", gaiGoi[2]);
}]

let [maNV, tenNV, tinhTrangNV, soCC, hienThiThongTin] = gaiGoi;
console.log(maNV);
hienThiThongTin();








let hoTen = "lucky";
let age = 14;
let thongTinCho = function (){
    console.log(hoTen, age);
}


let random = {
    hoTen,
    age,
    thongTinCho
}

console.log(random);
random.thongTinCho()



let vailozluon = "hello cac ban"
let random2 = {
    [vailozluon]: 1,
    ten: "loc",
    price: 5000
}


console.log('random2', random2);
console.log(random2[vailozluon]);




let dog = [
    {id: 1, name: "lucky1", price: 2000, link: "google.com"},
    {id: 2, name: "lucky3", price: 5000, link: "google.com"},
    {id: 3, name: "lucky4", price: 3000, link: "google.com"},
]


for (let index of dog){
    console.log(index);
}

for(let fuck in dog){
    console.log(fuck);
}




let sinhVienDepTrai = {
    id: "1",
    name: "loc",
    price: 1000,
    img: "google.com"
}

for (let key in sinhVienDepTrai){
    console.log(key, sinhVienDepTrai.key);
}
