const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const nodemailer = require("nodemailer");
const app = express();
app.use(cors());
app.use(express.json());

const dbName = "smart_inventory";
const url = "mongodb+srv://Hamsa:Saihamsa@atlascluster.ccoj1.mongodb.net/";
const client = new MongoClient(url);

let db;

// Connect to the database once at the start
async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit if the connection fails
  }
}

connectToDatabase();

// Sample expiration data
const expirationData = [
  { id: 1, productName: "Milk", stockQuantity: 30, expirationDate: "04.01.2025", daysRemaining: 2, status: "Expiring Soon", action: "Discount" },
  { id: 2, productName: "Bread", stockQuantity: 50, expirationDate: "03.01.2025", daysRemaining: 1, status: "Expiring Soon", action: "Donate" },
  { id: 3, productName: "Apples", stockQuantity: 20, expirationDate: "03.01.2025", daysRemaining: 0, status: "Expired", action: "Donate" },
  { id: 4, productName: "Yogurt", stockQuantity: 20, expirationDate: "06.1.2025", daysRemaining: 0, status: "Expired", action: "Donate" },
  { id: 5, productName: "Frozen Pizza", stockQuantity: 20, expirationDate: "04.01.2025", daysRemaining: 0, status: "Expired", action: "Donate" },
  { id: 6, productName: "Ham", stockQuantity: 10, expirationDate: "02.01.2025", daysRemaining: 0, status: "Expired", action: "Donate" },
  { id: 7, productName: "Fruit Cake", stockQuantity: 20, expirationDate: "01.01.2025", daysRemaining: 0, status: "Expired", action: "Donate" },
  { id: 8, productName: "Ice cream", stockQuantity: 20, expirationDate: "01.01.2025", daysRemaining: 0, status: "Expired", action: "Donate" },
  { id: 9, productName: "Lamp Chops", stockQuantity: 10, expirationDate: "02.01.2025", daysRemaining: 0, status: "Expired", action: "Donate" },
  { id: 10, productName: "Yogurt", stockQuantity: 40, expirationDate: "03.01.2025", daysRemaining: 0, status: "Expired", action: "Donate" },
  { id: 11, productName: "Soy Milk", stockQuantity: 10, expirationDate: "02.01.2025", daysRemaining: 0, status: "Expired", action: "Donate" },

];

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
    let status;
    if (daysRemaining < 0) status = "Expired";
    else if (daysRemaining <= 1) status = "Critical";
    else if (daysRemaining <= 2) status = "Expiring Soon";
    else status = "Good";

    return { ...item, daysRemaining, status };
  });
}

// API route to fetch the data
app.get("/api/expiration-alerts", (req, res) => {
  const updatedData = calculateDaysRemainingAndStatus(expirationData);
  res.json(updatedData);
});

// Function to send email notifications for critical/expiring products
const sendEmailAlert = () => {
  const productsToNotify = expirationData.filter(item => item.daysRemaining <= 2); // Products close to expiration

  if (productsToNotify.length > 0) {
    const productList = productsToNotify.map(
      product => `Product: ${product.productName}, Days Remaining: ${product.daysRemaining}, Status: ${product.status}`
    ).join("\n");

    const mailOptions = {
      from: "mailhamsas@gmail.com",
      to: "hamsasaravanan416@gmail.com", // Replace with recipient email
      subject: "Expiration Alert: Products Expiring Soon",
      text: `The following products are expiring soon or need urgent attention:\n\n${productList}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });
  }
};

// API route to fetch the data
app.get("/api/expiration-alerts", (req, res) => {
  res.json(expirationData);
  sendEmailAlert(); // Trigger email logic when endpoint is hit
});

// POST route to add a supplier
app.post("/api/suppliers", async (req, res) => {
  const { name, contact, email, deliveryArea, productCategory } = req.body;
  try {
    await db
      .collection("suppliers")
      .insertOne({ name, contact, email, deliveryArea, productCategory });
    res.json({ msg: "Supplier added" });
  } catch (error) {
    console.error("Error adding supplier:", error);
    res.status(500).json({ msg: "Error adding supplier" });
  }
});

// GET route to fetch all suppliers
app.get("/api/suppliers", async (req, res) => {
  try {
    const suppliers = await db.collection("suppliers").find().toArray();
    res.json(suppliers);
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    res.status(500).json({ msg: "Error fetching suppliers" });
  }
});

// PUT route to update a supplier by ID
app.put("/api/suppliers/:id", async (req, res) => {
  const { id } = req.params;
  const { name, contact, email, deliveryArea, productCategory } = req.body;

  try {
    const result = await db.collection("suppliers").updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, contact, email, deliveryArea, productCategory } }
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ msg: "Supplier not found" });
    } else {
      res.json({ msg: "Supplier updated successfully" });
    }
  } catch (error) {
    console.error("Error updating supplier:", error);
    res.status(500).json({ msg: "Error updating supplier" });
  }
});

app.delete("/api/suppliers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.collection("suppliers").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      res.status(404).json({ msg: "Supplier not found" });
    } else {
      res.json({ msg: "Supplier deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting supplier:", error);
    res.status(500).json({ msg: "Error deleting supplier" });
  }
});

// Start the server
app.listen(8081, () => {
  console.log("Server Started on port 8081");
});
