const express = require('express');
const promotionRouter = express.Router();

promotionRouter
  .route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res) => {
    res.end('Will send all the promotions to you');
  })
  .post((req, res) => {
    res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`);
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
  });

promotionRouter
  .route('/:promotionId')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res) => {
    res.end(`Will send details of the promotion: ${req.params.promotionId} to you`);
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
  })
  .put((req, res) => {
    const message = `Updating the promotion ${req.params.promotionId}.\nWill update the promotion: ${req.body.name} with description: ${req.body.description}`;
    res.end(message);
  })
  .delete((req, res) => {
    res.end(`Deleting the ${req.params.promotionId} promotion.`);
  });

module.exports = promotionRouter;
