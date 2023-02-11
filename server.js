/**
 * NPM imports
 */
 import express from 'express';
 import dotenv from 'dotenv';
 
 /**
  * FS imports
  */
 import mongoclient from './init/mongoclient.js';
 import routes from './init/routes.js';
 

 /**
  * instances and vars
  */
 dotenv.config();
 const server = express();
  
 /**
  * Start here
  */
 mongoclient(); //initiate mongoclient
 routes(server); //initiate routes
 
 const port = process.env.PORT || 8080;
 server.listen(port, () => console.log(`Listening on port ${port}`));
 