const Account = require("../models/AccountModel");
const bcrypt =require("bcryptjs");
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');


const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { nameAcc, password, idAccType, status } = newUser;

        try {
            // Kiểm tra xem tên tài khoản đã tồn tại hay chưa
            const checkUser = await Account.findOne({ nameAcc: nameAcc });
            if (checkUser !== null) {
                return resolve({
                    status: 'ERR',
                    message: 'Tên tài khoản đã tồn tại'
                });
            }

            // Mã hóa mật khẩu
            const hash = bcrypt.hashSync(password, 10);

            // Tạo tài khoản mới
            const createdUser = await Account.create({
                nameAcc, 
                password: hash, 
                idAccType,
                status: status || 'active',  // Mặc định là 'active' nếu không cung cấp
                dateRegister: new Date()     // Lưu ngày đăng ký hiện tại
            });

            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'Tạo tài khoản thành công',
                    data: createdUser
                });
            } else {
                resolve({ status: 'ERR', message: 'Tạo tài khoản thất bại' });
            }

        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message
            });
        }
    });
};

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { nameAcc, password } = userLogin;

        try {
            // Kiểm tra xem người dùng có tồn tại không
            const checkUser = await Account.findOne({ nameAcc: nameAcc });
            
            if (checkUser === null) {
                return resolve({
                    status: 'error',
                    message: 'Tên tài khoản không tồn tại'
                });
            }

            // So sánh mật khẩu
            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            if (!comparePassword) {
                return resolve({
                    status: 'error',
                    message: 'Tài khoản hoặc mật khẩu không đúng',
                });
            }

            // Tạo access token
            const access_token = genneralAccessToken({
                id: checkUser.idAcc,
                isAdmin: checkUser.idAccType
            });

            const Refresh_token = genneralRefreshToken({
                id: checkUser.idAcc,
                isAdmin: checkUser.idAccType
            });

            // Gửi phản hồi thành công kèm theo token
            return resolve({ status: 'OK', message: 'Success', data: checkUser, access_token, Refresh_token });

        } catch (e) {
            // Ghi log lỗi để dễ dàng kiểm tra
            console.error('Lỗi trong quá trình đăng nhập:', e);
            return reject({
                status: 'error',
                message: 'Đã xảy ra lỗi trong quá trình đăng nhập',
            });
        }
    });
};



module.exports = {
    createUser,
    loginUser
};
