// Import packages
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// Apply middleware
app.use(cors());
app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const PORT = process.env.PORT || 4000;

// Routes
app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

// Conncet MongoDB and Server
mongoose.connect(MONGODB_URI)
  .then(() => {
	app.listen(PORT, () => {
	  console.log(`Server is running on port ${PORT}...`);
	})
  })
  .catch(err => console.log(err));
