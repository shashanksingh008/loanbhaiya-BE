import mongoose from 'mongoose';

// const serverOptions = {
//   maxPoolSize: 100,  
//   socketOptions: {
//     socketTimeoutMS: 6000000
//   }
// };
const MONGO_CLIENT = () => {
  mongoose.connect(process.env.MONGODB) 
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(`Could not connect to MongoDB: ${err}`));  
};

export default MONGO_CLIENT;
