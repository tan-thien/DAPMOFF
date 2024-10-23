const UserService = require('../services/UserService');

// Hàm kiểm tra đầu vào chung
const validateInput = (req, res, isLogin = false) => {
    const { nameAcc, password, confirmPassword, idAccType } = req.body;

    if (!nameAcc || !password || (isLogin ? false : !confirmPassword) || !idAccType) {
        return res.status(400).json({
            status: "ERR",
            message: 'Tất cả thông tin là bắt buộc, ngoại trừ idAcc'
        });
    }

    if (!isLogin && password !== confirmPassword) {
        return res.status(400).json({
            status: "ERR",
            message: 'Mật khẩu và xác nhận mật khẩu không khớp'
        });
    }

    return null; // Không có lỗi
};

const createUser = async (req, res) => {
    try {
        const validationError = validateInput(req, res);
        if (validationError) return validationError;

        // Gọi service để tạo tài khoản mới
        const response = await UserService.createUser({
            nameAcc: req.body.nameAcc,
            password: req.body.password,
            idAccType: req.body.idAccType,
            status: req.body.status
        });
        return res.status(201).json(response); // Trả về mã 201 cho việc tạo thành công

    } catch (e) {
        console.error('Lỗi khi tạo tài khoản:', e);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi tạo tài khoản'
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const validationError = validateInput(req, res, true); // true để kiểm tra cho login
        if (validationError) return validationError;

        // Gọi service để đăng nhập
        const response = await UserService.loginUser({
            nameAcc: req.body.nameAcc,
            password: req.body.password
        });
        return res.status(200).json(response);

    } catch (e) {
        console.error('Lỗi khi đăng nhập:', e);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi đăng nhập'
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const validationError = validateInput(req, res, true); // true để kiểm tra cho login
        if (validationError) return validationError;

        // Gọi service để đăng nhập
        const response = await UserService.loginUser({
            nameAcc: req.body.nameAcc,
            password: req.body.password
        });
        return res.status(200).json(response);

    } catch (e) {
        console.error('Lỗi khi đăng nhập:', e);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi đăng nhập'
        });
    }
};



module.exports = {
    createUser,
    loginUser,
    updateUser
};
