// import express from 'express';
// import MongoFormatters from '../utils/MongoFormatters.js';
// import promoPriceModel from '../models/PromoPrice.js';
// import { auth, admin } from '../middlewares/auth.js';
// import mongoose from 'mongoose';
// import { formatFilterList } from '../utils/MongoFormatters.js';
// const router = express.Router();

// /*
//   Description : Get all promo price
//   Route : /promoprice
// */
// router.get('/', async (req, res, next) => {
//   try {
//     let limitArg = 500;
//     let skipArg = 0;
//     let sortArg = { created: -1 };

//     if (req.query) {
//       const { pagesize, pagenumber, sortby, sortdirection } = req.query;
//       skipArg = MongoFormatters.formatPageNumber(pagenumber, pagesize);
//       limitArg = parseInt(pagesize) || limitArg;
//       sortArg = sortby ? MongoFormatters.formatSortArg(sortby, sortdirection) : sortArg;
//     }

//     let response = await promoPriceModel.aggregate([
//       {
//         $lookup: {
//           from: 'contributors',
//           localField: 'rules.value',
//           foreignField: 'firebrand_id',
//           pipeline: [
//             { "$match": { "$expr": { "$eq": ["$rules.type", "$author"] } } },
//             { "$project": { 'display_name': 1, 'firebrand_id': 1 } },
//           ],
//           as: 'author_name',
//         },
//       }
//     ]);

//     //Before sending response, update response to remove unused property and format custom categories.
//     res.set('Cache-Control', `max-age=${process.env.CACHE_FOR_1HOUR}`);
//     res.status(200).send({ "total": response.length, "promoprice": response });
//   }
//   catch (err) {
//     res.status(502).send(err);
//     next(err);
//   }
// });

// /*
//   Description : Get details promo price
//   Route : /promoprice
// */
// router.get('/details', async (req, res, next) => {
//   try {
//     let queryArgs = {};
//     if (!req.body._id || req.body._id.length === 0) {
//       res.status(400).send({ message: 'Bad request body' });
//       next({ message: 'Request body to delete either was a malformed object or had a size of 0' });
//     }
//     queryArgs._id = req.body._id;
//     let response = await promoPriceModel.find(queryArgs).lean();
//     //Before sending response, update response to remove unused property and format custom categories.
//     res.set('Cache-Control', `max-age=${process.env.CACHE_FOR_1HOUR}`);
//     res.status(200).send({ "promoprice": response });
//   }
//   catch (err) {
//     res.status(502).send(err);
//     next(err);
//   }
// });

// /*
//   Description : add promo price 
//   Route : /promoprice
// */

// router.post('/', async (req, res, next) => {
//   try {
//     if (Object.keys(req.body).length === 0) {
//       res.status(400).send({ error: 'Request body is empty. Try again' });
//       return next({ message: 'Request body sent had no properties' });
//     }
//     const promoprice = req.body;
//     let response;
//     try {
//       response = await promoPriceModel.create(promoprice);
//     } 
//     catch (err) {
//       res.status(500).send({ error: err });
//       return next(err);
//     }
//     res.status(200).send({ message: 'Promo Price added successfully', response : response });
//     next();
//   }
//   catch (err) {
//     res.status(502).send(err);
//     return next(err);
//   }
// });

// /*
//   Description : update promo price
//   Route : /promoprice
// */

// router.put('/', async (req, res, next) => {
//   try {
//     if (Object.keys(req.body).length === 0) {
//       res.status(400).send({ error: 'Request body is empty. Try again' });
//       return next({ message: 'Request body sent had no properties' });
//     }
//     let result = [];
//     const promoprice = req.body;
//     let id = promoprice['id'];
//     let response = await promoPriceModel.findByIdAndUpdate({ '_id': id },
//       { $set: promoprice }, {new: true});
//     result.push(res);
//     res.status(200).send({ message: 'Promo Price updated successfully', response : response });
//     next();
//   }
//   catch (err) {
//     res.status(502).send(err);
//     return next(err);
//   }
// });

// /*
//   Description : delete promo price 
//   Route : /promoprice
// */

// router.delete('/', async (req, res, next) => {
//   if (!req.body._id || req.body._id.length === 0) {
//     res.status(400).send({ message: 'Bad request body' });
//     next({ message: 'Request body to delete either was a malformed object or had a size of 0' });
//   }
//   try {
//     const response = await promoPriceModel.deleteMany({ _id: { $in: req.body._id } });
//     if (response.deletedCount === 0) {
//       res.status(500).send({ message: 'Something went wrong with the delete many operation' });
//       next({ message: `Delete operation failed. request body is here: ${req.body}` });
//     }
//     res.status(200).send({ message: 'Promo  Price Deleted Successfully' });
//     next();
//   }
//   catch (err) {
//     res.status(502).send(err);
//     next(err);
//   }
// });

// export default router;