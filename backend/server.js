import express from 'express';
/* import data from './data'; */
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';

dotenv.config();

const port = config.PORT;

const mongodbUrl = config.MONGODB_URL;
/* 
mongoose.connect(mongodbUrl, {
  userNewUrlParser: true,
  useNewUrlParser: true ,
  useUnifiedTopology: true 
}).catch(error => console.log(error.reason)); */

mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("🗄 ==> Successfully connected to mongoDB.");
})
  .catch((err) => {
    console.log(`Error connecting to mongoDB: ${err}`);
  });




const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use('/api/orders', orderRoute);
app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});



app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});




app.listen(port, () =>
  console.log("Server serves at http://localhost:" + port)
);
