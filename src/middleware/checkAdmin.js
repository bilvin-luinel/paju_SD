const jwt = require('jsonwebtoken');

const checkAdmin = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
    }

    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.user = decoded.user;

        if (!user || !user.admin) {
            return res.status(403).json({ message: '권한이 없습니다.' });
        }
        next();
    } catch (err) {
        return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
};

module.exports = checkAdmin;