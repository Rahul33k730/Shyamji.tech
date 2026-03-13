const prisma = require('../config/prisma');

const getPortfolio = async (req, res) => {
  try {
    const portfolio = await prisma.portfolio.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(portfolio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const createPortfolio = async (req, res) => {
  const { projectName, description, mediaUrl, mediaType, techStack, clientFeedback } = req.body;

  try {
    const portfolio = await prisma.portfolio.create({
      data: {
        projectName,
        description,
        mediaUrl,
        mediaType,
        techStack,
        clientFeedback,
      },
    });
    res.status(201).json(portfolio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePortfolio = async (req, res) => {
  const { id } = req.params;
  const { projectName, description, mediaUrl, mediaType, techStack, clientFeedback } = req.body;

  try {
    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        projectName,
        description,
        mediaUrl,
        mediaType,
        techStack,
        clientFeedback,
      },
    });
    res.json(portfolio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deletePortfolio = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.portfolio.delete({
      where: { id },
    });
    res.json({ message: 'Portfolio item deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getPortfolio, createPortfolio, updatePortfolio, deletePortfolio };
