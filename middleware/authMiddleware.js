import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        message: "Auth failed",
        success: false,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId =  decoded.userId ;
    next();
  } catch (error) {
    return res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};

export default auth;
