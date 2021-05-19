module.exports = {
  toslug: function (str) {
    // Chuyển hết sang chữ thường
    tmp = str.toLowerCase();

    // xóa dấu
    tmp = tmp.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    tmp = tmp.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    tmp = tmp.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    tmp = tmp.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    tmp = tmp.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    tmp = tmp.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    tmp = tmp.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    tmp = tmp.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    tmp = tmp.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    tmp = tmp.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    tmp = tmp.replace(/-+$/g, '');

    // randomslug
    var crypto = require('crypto');
    var id = crypto.randomBytes(4).toString('hex');
    tmp = tmp + id;
    // return
    return tmp;
  },
};
