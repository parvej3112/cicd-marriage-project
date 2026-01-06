const { Model, json, where } = require('sequelize')
const {Admin}=require('../models')
const JWT_SECRET=process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const register = async (req, res) => {
  const {name,email,phone,officeBranch,password,role} = req.body;
  if(!name|| !email|| !phone || !password ){
    return res.json({message:"All details are required"})
}
if(role==="SuperAdmin"){
  return res.json({message:"Role Invalid!,You Can not use this Role."})
}
  try {
    
    const exist=await Admin.findOne({where:{email}})
    if(exist){
        return res.json({message:"Email Allready Exist"})
    }
        
    const userreco = await Admin.create({name,email,phone,officeBranch,password,role, officeId: req.user.officeId});

    res.status(201).json({ message: `${userreco.name} registered successfully`, userId: userreco.id }); 
  } catch (error) {
    res.status(500).json({ error: "Failed to register Admin" });
  }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
      return res.json({message:"All feilds are required"})
    }
    try {
      const userreco = await Admin.findOne({ where: { email } });
      if (!userreco) return res.status(404).json({ error: "Invalid Email" });
  
      if (userreco.password !== password) {
        return res.status(401).json({ error: "Invalid Password" });
      }
  
      const token = jwt.sign({ id: userreco.id, role: userreco.role ,officeId: userreco.officeId},JWT_SECRET, { expiresIn: "1d" });
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  };

const getAll = async (req, res) => {
    try {
        const isSuperAdmin = req.user.role === "SuperAdmin";
        const resu = await Admin.findAll({where: isSuperAdmin ? {} : { officeId: req.user.officeId },});
        return res.json(resu);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

const getById = async (req, res) => {
    const id = req.params.id;
    try {
        const resu = await Admin.findOne({ where: { id } });
        return res.json(resu);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

const updateById = async (req, res) => {
    const id = req.params.id;
    const {name,email,phone,officeBranch} = req.body;
    try {
        const adm = await Admin.findByPk(id);
        if (!adm) {
            return res.status(404).json({ message: "Admin not found" });
        }
        adm.name = name;
        adm.email = email;
        adm.phone = phone;
        adm.officeBranch = officeBranch;
        await adm.save();
        return res.json(adm);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

const deleteById = async (req, res) => {
    const id = req.params.id;
    try {
        const adm = await Admin.findByPk(id);
        if (!adm) {
            return res.status(404).json({ message: "Admin not found" });
        }
        await adm.destroy();
        return res.json({ message: "Admin Deleted" });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
    res.status(200).json({ message: "Logout successful." });
  };

  const forgetPassword=async (req, res) => {
    const { email } = req.body;

    const user = await Admin.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });
  
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = Date.now() + 15 * 60 * 1000; // 15 minutes
  
    user.resetToken = token;
    user.resetTokenExpiry = expiry;
    await user.save();
  
    // Return the token in response (for internal use)
    res.json({ message: 'Reset token generated', token });
  }

 const resetPassword=async (req, res) => {
    const { token, newPassword } = req.body;
    
    const user = await Admin.findOne({
      where: {
        resetToken: token,
        resetTokenExpiry: { [Op.gt]: Date.now() }
      }
    });
  
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
  
    user.password = newPassword; // Hash in real app!
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();
  
    res.json({ message: 'Password has been reset successfully' });
  }

module.exports = {
    register,
    login,
    getAll,
    getById,
    updateById,
    deleteById,
    logout,
    forgetPassword,
    resetPassword
};
