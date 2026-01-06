const { sequelize, Admin, Office } = require('./models'); // Also added `Office`
const db = require('./models');

const express = require('express');
require("dotenv").config();
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 7001;
const app = express();
const cors = require('cors');

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',')
  : [];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/office",require("./routes/officeRoute"))
app.use("/api/admin", require("./routes/adminroute"));
app.use("/api/certificate", require("./routes/marriageCertificateroute"));

// Health check endpoint (for Docker & Jenkins)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


const ensureSuperAdminExists = async () => {
  const existingAdmin = await Admin.findOne({ where: { role: 'SuperAdmin' } });

  if (!existingAdmin) {
    await Office.findOrCreate({
      where: { officeId: 'superadmin' },
      defaults: {
        officeName: 'Super Admin School',
        officePassword: 'SupperSchool'
      }
    });

    await Admin.create({
      name: 'Super Admin',
      email: process.env.SUPERADMIN_EMAIL,
      phone: '0000000000',
      password: process.env.SUPERADMIN_PASSWORD,
      role: 'SuperAdmin',
      officeId: 'superadmin'
    });

    console.log('✅ SuperAdmin created successfully');
  } else {
    console.log('✅ SuperAdmin already exists');
  }
};

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database Connected");

    await sequelize.sync({ alter: true });
    console.log("✅ All models synchronized successfully");

    await ensureSuperAdminExists();

    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to database or start server:", err);
  }
};

startServer();
