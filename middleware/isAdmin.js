const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

export const isAdmin = (req, res, next) => {
  const reqToken = req.headers["Authorization"];

  if (reqToken != undefined) {
    const [, token] = reqToken.split(" ");

    try {
      let { role_id } = jwt.verify(token, secret);
      if (role_id === 1) next();
      else return res.status(401).send({ message: "Unauthorized" });
    } catch (err) {
      return res.status(500).send({ message: "Internal error" });
    }
  } else return res.status(400).send({ message: "Bad Request" });
};
