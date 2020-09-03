require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select "productId",
           "name",
           "price",
           "image",
           "shortDescription",
           "switchOptions"
      from "products"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId, 10);
  if (!productId) {
    return next(new ClientError('product cannot be found', 404));
  }
  const sql = `
    select *
      from "products"
     where "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    res.json([]);
  } else {
    const sql = `
    select "c"."cartItemId",
           "c"."price",
           "c"."selectedSwitch",
           "p"."productId",
           "p"."image",
           "p"."name",
           "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using ("productId")
    where "c"."cartId" = $1
  `;
    const params = [req.session.cartId];
    db.query(sql, params)
      .then(result => res.json(result.rows))
      .catch(err => next(err));
  }
});

app.post('/api/cart', (req, res, next) => {
  const productId = parseInt(req.body.product.productId, 10);
  if (!Number.isInteger(productId) || productId <= 0) {
    return next(new ClientError('invalid productId', 404));
  }
  const sql = `
  select "price"
    from "products"
   where "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        throw new ClientError('no results found', 400);
      } else if (req.session.cartId) {
        const price = result.rows[0];
        const newObj = {
          cartId: req.session.cartId,
          ...price
        };
        return newObj;
      } else {
        const price = result.rows[0];
        const sql = `
          insert into "carts" ("cartId", "createdAt")
               values (default, default)
            returning "cartId"
        `;
        return db.query(sql)
          .then(result => {
            const cartId = result.rows[0];
            const newObj = { ...cartId, ...price };
            return newObj;
          });
      }
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const sql = `
        insert into "cartItems" ("cartId", "productId", "price", "selectedSwitch")
             values ($1, $2, $3, $4)
          returning "cartItemId"
      `;
      const params = [result.cartId, productId, result.price, req.body.option];
      return db.query(sql, params)
        .then(result => result.rows[0]);
    })
    .then(result => {
      const sql = `
        select "c"."cartItemId",
               "c"."price",
               "c"."selectedSwitch",
               "p"."productId",
               "p"."image",
               "p"."name",
               "p"."shortDescription"
          from "cartItems" as "c"
          join "products" as "p" using ("productId")
         where "c"."cartItemId" = $1
      `;
      const params = [result.cartItemId];
      return db.query(sql, params)
        .then(result => res.status(201).json(result.rows[0]));
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  const order = req.body;
  if (!req.session.cartId) {
    return next(new ClientError('no cartId found in session', 400));
  }
  if (!order.name || !order.creditCard || !order.shippingAddress) {
    return next(new ClientError('invalid order', 404));
  }
  const sql = `
    insert into "orders" ("cartId", "name", "creditCard", "shippingAddress")
         values ($1, $2, $3, $4)
      returning "orderId", "createdAt", "name", "creditCard", "shippingAddress"
  `;
  const params = [req.session.cartId, order.name, order.creditCard, order.shippingAddress];
  return db.query(sql, params)
    .then(result => {
      delete req.session.cartId;
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
