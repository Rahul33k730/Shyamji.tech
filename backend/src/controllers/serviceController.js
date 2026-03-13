const prisma = require('../config/prisma');

const getServices = async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const createService = async (req, res) => {
  const { name, icon, description, priceINR, priceUSD, order, showInMarquee } = req.body;

  try {
    const service = await prisma.service.create({
      data: {
        name,
        icon,
        description,
        priceINR,
        priceUSD,
        order: order || 0,
        showInMarquee: showInMarquee ?? true,
      },
    });
    res.status(201).json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, icon, description, priceINR, priceUSD, order, showInMarquee } = req.body;

  try {
    const service = await prisma.service.update({
      where: { id },
      data: {
        name,
        icon,
        description,
        priceINR,
        priceUSD,
        order,
        showInMarquee,
      },
    });
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.service.delete({
      where: { id },
    });
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getServices, createService, updateService, deleteService };
