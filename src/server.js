const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const dbName = "smart_inventory";
const url = "mongodb+srv://Hamsa:Saihamsa@atlascluster.ccoj1.mongodb.net/";
const client = new MongoClient(url);
let db;

const expirationData = [
    { id: 1, productName: "Milk", stockQuantity: 30, expirationDate: "2025-01-04", daysRemaining: 2, status: "Expiring Soon" },
    { id: 2, productName: "Bread", stockQuantity: 50, expirationDate: "2025-01-03", daysRemaining: 1, status: "Expiring Soon" },
    { id: 3, productName: "Apples", stockQuantity: 20, expirationDate: "2025-01-03", daysRemaining: 0, status: "Expired" },
    { id: 4, productName: "Yogurt", stockQuantity: 20, expirationDate: "2025-01-06", daysRemaining: 0, status: "Expired" },
    { id: 5, productName: "Frozen Pizza", stockQuantity: 20, expirationDate: "2025-01-04", daysRemaining: 0, status: "Expired" },
    { id: 6, productName: "Bananas", stockQuantity: 15, expirationDate: "2025-01-02", daysRemaining: 1, status: "Expiring Soon" },
    { id: 7, productName: "Eggs", stockQuantity: 40, expirationDate: "2025-01-05", daysRemaining: 3, status: "Expiring Soon" },
    { id: 8, productName: "Spinach", stockQuantity: 10, expirationDate: "2025-01-02", daysRemaining: 0, status: "Expired" },
    { id: 9, productName: "Chicken Breast", stockQuantity: 12, expirationDate: "2025-01-03", daysRemaining: 1, status: "Expiring Soon" },
    { id: 10, productName: "Fish Fillets", stockQuantity: 8, expirationDate: "2025-01-04", daysRemaining: 2, status: "Expiring Soon" },
    { id: 11, productName: "Lettuce", stockQuantity: 30, expirationDate: "2025-01-05", daysRemaining: 3, status: "Expiring Soon" }
];

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
connectToDatabase();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mailhamsas@gmail.com",
    pass: "zevl rcmh oudr qvtd",
  },
});

function calculateDaysRemainingAndStatus(data) {
  const today = new Date();
  return data.map((item) => {
    const expirationDate = new Date(item.expirationDate);
    const daysRemaining = Math.ceil((expirationDate - today) / (1000 * 60 * 60 * 24));
    return { ...item, daysRemaining, status: daysRemaining < 0 ? "Expired" : "Expiring Soon" };
  });
}

app.get("/api/expiration-alerts", (req, res) => {
  const updatedData = calculateDaysRemainingAndStatus(expirationData);
  res.json(updatedData);
});

const sendEmailAlert = () => {
  const productsToNotify = expirationData.filter(item => item.daysRemaining <= 2);
  if (productsToNotify.length > 0) {
    const productList = productsToNotify.map(product => `Product: ${product.productName}`).join("\n");
    const mailOptions = {
      from: "mailhamsas@gmail.com",
      to: "hamsasaravanan416@gmail.com",
      subject: "Expiration Alert",
      text: `The following products are expiring soon:\n\n${productList}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.error("Error sending email:", error);
      else console.log("Email sent successfully:", info.response);
    });
  }
};
sendEmailAlert();

app.listen(8082, () => {
  console.log("Server started on port 8081");
});
