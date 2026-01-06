const jwt = require("jsonwebtoken");
const {Admin,MarriageCertificate}=require("../models")

const JWT_SECRET = process.env.JWT_SECRET;

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing in cookie" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {
      id: decoded.id, 
      role: decoded.role ,
      officeId: decoded.officeId
    }; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
const isAuthorized = (roles, modelName = null, idParam = 'id') => {
  return async (req, res, next) => {
    try {

      if (req.user.role === "SuperAdmin") return next();
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: `${req.user.role} Forbidden: Access Denied` });
      }
      
      
      // If a model check is needed
      if (modelName) {
        const id = req.params[idParam] || req.body[idParam];
        if (!id) {
            return res.status(400).json({ message: `Missing ${idParam} in request` });
               }
        const model = {
          Admin,
          MarriageCertificate
        }[modelName];

        if (!model) {
          return res.status(500).json({ message: `Internal Error: Model ${modelName} not found` });
        }

        const record = await model.findByPk(id);
        if (!record) {
          return res.status(404).json({ message: `${modelName} record not found` });
        }

        if (record.officeId !== req.user.officeId) {
          return res.status(403).json({ message: "Forbidden: Office mismatch" });
        }

      }
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Authorization Middleware Error" });
    }
  };
};


module.exports={
  isAuthenticated,
  isAuthorized
}
