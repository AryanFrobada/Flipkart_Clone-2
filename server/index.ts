import express from 'express';
import { connect } from './config/dataSource'; // Adjust the import path as necessary
const productRoute = require("./routes/Product")

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
})
)

app.use("/api/v1/products", productRoute);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Initialize database connection and start server
connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((error:any) => {
  console.error('Error initializing database:', error);
});
