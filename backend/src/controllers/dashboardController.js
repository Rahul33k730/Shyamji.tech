const prisma = require('../config/prisma');

const getDashboardStats = async (req, res) => {
  try {
    const totalVisitors = 0; // Placeholder for visitor tracking
    const serviceInquiries = await prisma.contactMessage.count();
    const chatbotConversations = await prisma.chatLog.groupBy({
      by: ['sessionId'],
      _count: { sessionId: true },
    });
    const recentMessages = await prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });
    const servicesCount = await prisma.service.count();
    const productsCount = await prisma.product.count();

    res.json({
      totalVisitors,
      serviceInquiries,
      chatbotConversations: chatbotConversations.length,
      recentMessages,
      servicesCount,
      productsCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getDashboardStats };
