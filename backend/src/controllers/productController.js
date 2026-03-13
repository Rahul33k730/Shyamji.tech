const prisma = require('../config/prisma');

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const createProduct = async (req, res) => {
  const { name, image, description, features, learnMore } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        name,
        image,
        description,
        features,
        learnMore,
      },
    });
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, image, description, features, learnMore } = req.body;

  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        image,
        description,
        features,
        learnMore,
      },
    });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: { id },
    });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
