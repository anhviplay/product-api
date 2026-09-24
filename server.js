require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const productRoutes = require("./routes/productRoutes");

const app = express();

// Cho phép API nhận dữ liệu JSON
app.use(express.json());

// Các API Product sẽ bắt đầu bằng /products
app.use("/products", productRoutes);

// API dùng để kiểm tra server có hoạt động không
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP"
    });
});

// Kết nối MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });