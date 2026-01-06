const { Model, json, where } = require('sequelize')
const { MarriageCertificate } = require('../models');
const { Op } = require('sequelize');
// Create new certificate
const register = async (req, res) => {
    try {
        const {
            groomName,
            groomFathersName,
            groomAge,
            groomOccupation,
            groomReligion,
            groomAddress,
            brideName,
            brideFathersName,
            brideAge,
            brideOccupation,
            brideReligion,
            brideAddress,
            marriageDate,
            maherAmount,
            maherWord,
            Vakil,
            witness1,
            witness2,
            marriagePerformer,
            adminId
        } = req.body;

        // Check required fields
        if (
            !groomName || !groomFathersName || !groomAge || !groomOccupation || !groomReligion || !groomAddress ||
            !brideName || !brideFathersName || !brideAge || !brideOccupation || !brideReligion || !brideAddress ||
            !marriageDate || !maherAmount || !Vakil || !witness1 || !witness2 || !marriagePerformer
        ) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Build the full data object including officeId from authenticated user
        const certificateData = {
            groomName,
            groomFathersName,
            groomAge,
            groomOccupation,
            groomReligion,
            groomAddress,
            brideName,
            brideFathersName,
            brideAge,
            brideOccupation,
            brideReligion,
            brideAddress,
            marriageDate,
            maherAmount,
            maherWord,
            Vakil,
            witness1,
            witness2,
            marriagePerformer,
            adminId,
            officeId: req.user.officeId  // <-- add officeId explicitly here
        };

        const certificate = await MarriageCertificate.create(certificateData);
        return res.json(certificate);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



// Get all certificates
const getAll = async (req, res) => {
    try {
        const isSuperAdmin = req.user.role === "SuperAdmin";
        const certificates = await MarriageCertificate.findAll({where: isSuperAdmin ? {} : { officeId: req.user.officeId },});
        return res.json(certificates);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get certificate by ID
const getById = async (req, res) => {
    const id = req.params.id;
    try {
        const certificate = await MarriageCertificate.findOne({ where: { id } });
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }
        return res.json(certificate);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// get certificate By Groom Or Bride Name

const getByName = async (req, res) => {
    const name = req.params.name; // or use req.body.name for POST
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    try {
        const certificates = await MarriageCertificate.findAll({
            where: {
                officeId: req.user.officeId,
                [Op.or]: [
                    { groomName: { [Op.iLike]: `%${name}%` } },  // For PostgreSQL
                    { brideName: { [Op.iLike]: `%${name}%` } }
                ]
            }
        });

        if (certificates.length === 0) {
            return res.status(404).json({ message: 'No certificates found' });
        }

        return res.json(certificates);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Update certificate by ID
const updateById = async (req, res) => {
    const id = req.params.id;
    try {
        const certificate = await MarriageCertificate.findByPk(id);
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }
        await certificate.update(req.body);
        return res.json(certificate);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete certificate by ID
const deleteById = async (req, res) => {
    const id = req.params.id;
    try {
        const certificate = await MarriageCertificate.findByPk(id);
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }
        await certificate.destroy();
        return res.json({ message: 'Certificate deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    register,
    getAll,
    getById,
    getByName,
    updateById,
    deleteById,
};
