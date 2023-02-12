import express from 'express';
import Users from '../models/User';
import mongoose from 'mongoose';
const router = express.Router();

/*
  Description : add users
  Route : /users
*/

router.post('/signup', async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({ error: 'Request body is empty. Try again' });
      return next({ message: 'Request body sent had no properties' });
    }
    const user = req.body;
    let response;
    try {
      response = await Users.create(user);
    } 
    catch (err) {
      res.status(500).send({ error: err });
      return next(err);
    }
    res.status(200).send({ message: 'User signedup successfully', response : response });
    next();
  }
  catch (err) {
    res.status(502).send(err);
    return next(err);
  }
});

/*
  Description : update promo price
  Route : /promoprice
*/

export default router;