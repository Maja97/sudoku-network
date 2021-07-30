import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ message: "Your session is not valid" });
  }
};

export const verifyRefreshToken = (req, res, next) => {
  try {
    const token = req.body.refreshToken;
    jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ message: "Refresh token invalid" });
  }
};
