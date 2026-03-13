const prisma = require('../config/prisma');

const submitContactForm = async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  try {
    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        service,
        message,
      },
    });
    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getContactMessages = async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateMessageStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const message = await prisma.contactMessage.update({
      where: { id },
      data: { status },
    });
    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  try {
    const subscription = await prisma.newsletter.create({
      data: { email },
    });
    res.status(201).json({ message: 'Subscribed successfully', data: subscription });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).json({ message: 'Email already subscribed' });
    }
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitContactForm, getContactMessages, updateMessageStatus, subscribeNewsletter };
