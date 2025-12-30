import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token =
    req.body?.token || req.query?.token || req.headers["authorization"];

  if (!token) {
    return res.status(403).send("A token is required for authentication.");
  }

  try {
    const cleanToken = token.startsWith("Bearer")
      ? token.slice(7, token.length)
      : token;

    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};

export default verifyToken;
