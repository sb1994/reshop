const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Product = require("../models/Product");

const router = express.Router();

router.get("/test", async (req, res) => {
  res.json({ msg: "Hello Product Routes" });
});
router.get("/:id", async (req, res) => {
  let { id } = req.params;

  const product = await Product.findById(id);

  const relatedProducts = await Product.find({ brand: product.brand })
    .skip(Math.random(0, 10))
    .limit(4);
  res.json({ product, relatedProducts });
});

router.get("/", async (req, res) => {
  let limit = parseInt(req.query.limit || "20");
  let page = parseInt(req.query.page || "0");

  const totalProducts = await Product.countDocuments();
  const products = await Product.find().skip(page).limit(limit);
  const totalPages = Math.ceil(totalProducts / limit);

  res.json({
    totalProducts,
    products,
    totalPages,
    next: page + 1,
    previous: page === 0 ? 0 : page - 1,
    current: page,
  });
});
router.post("/purchase", async (req, res) => {
  console.log(process.env.STRIPE_SECRET_KEY);
  console.log(req.body);
  let { id, amount } = req.body;

  console.log(id, amount);
  const charge = await stripe.charges.create({
    amount: parseInt(amount),
    currency: "eur",
    source: "tok_mastercard",
    description: "My First Test Charge (created for API docs)",
  });
  res.json({
    charge,
  });
});

router.get("/search/filter", async (req, res) => {
  let limit = parseInt(req.query.limit || "20");
  let page = parseInt(req.query.page || "0"); //defaults to the first page
  let search = req.query.search; //defaults to the first page

  try {
    // console.log(req.query);
    // console.log(search);
    let regX = new RegExp(search, "i");
    const totalProducts = await Product.find({
      name: regX,
    }).countDocuments();
    const products = await Product.find({
      name: regX,
    })
      .skip(page * limit)
      .limit(limit);

    const totalPages = Math.ceil(totalProducts / limit);

    // console.log(products);
    res.json({
      totalProducts,
      products,
      totalPages,
      next: page + 1,
      previous: page - 1 === 0 ? 0 : page - 1,
      current: page,
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
