const { Admin,MarriageCertificate ,Office} = require('../models'); // adjust path if needed

// Create/Register a Office
const createOfficeAndAdmin = async (req, res) => {
    try {
      const { officeName, adminName, adminEmail, adminPassword, adminPhone} = req.body;
  
      // Step 1: Create Office
      const office = await Office.create({ officeName });
  
      // Step 2: Create Admin User for that Office
      const admin = await Admin.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        phone:adminPhone,
        role: 'Admin',
        officeId: office.officeId,
      });
  
      res.status(201).json({
        message: 'Office and Admin created',
        officeId: office.officeId,
        adminId: admin.id,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create office and admin' });
    }
  };
  

// Get all Offices
const getAll = async (req, res) => {
  try {
    const isSuperAdmin = req.user.role === "SuperAdmin";

    const Offices = await Office.findAll({
      where: isSuperAdmin ? {} : { officeId: req.user.officeId },
      include: [
        {
          model: Admin,
          attributes: { exclude: ['password'] },
        },
        {
          model: MarriageCertificate,
        }
      ]
    });

    res.status(200).json({ data: Offices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch offices", error: error.message });
  }
};


// Get office by ID
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundOffice = await Office.findByPk(id, {
      include: [
        { model: Admin },
        { model: MarriageCertificate }
      ]
    });

    if (!foundOffice) {
      return res.status(404).json({ message: "Office not found" });
    }

    res.status(200).json({ data: foundOffice });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch office", error: error.message });
  }
};

// Update a office
const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { officeName } = req.body;

    const foundOffice = await Office.findByPk(id);
    if (!foundOffice) {
      return res.status(404).json({ message: "Office not found" });
    }

    foundOffice.officeName = officeName || foundOffice.officeName;
    await foundOffice.save();

    res.status(200).json({ message: "Office updated successfully", data: foundOffice });
  } catch (error) {
    res.status(500).json({ message: "Failed to update office", error: error.message });
  }
};

// Delete a office
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundOffice = await Office.findByPk(id);

    if (!foundOffice) {
      return res.status(404).json({ message: "Office not found" });
    }

    await foundOffice.destroy();
    res.status(200).json({ message: "Office deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete office", error: error.message });
  }
};

module.exports={
    createOfficeAndAdmin,
    getAll,
    getById,
    updateById,
    deleteById
}