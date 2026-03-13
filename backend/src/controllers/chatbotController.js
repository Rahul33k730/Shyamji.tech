const prisma = require('../config/prisma');

const chat = async (req, res) => {
  const { sessionId, message } = req.body;

  try {
    // Save user message (try/catch to avoid failing if DB is down)
    try {
      await prisma.chatLog.create({
        data: {
          sessionId,
          message,
          sender: 'USER',
        },
      });
    } catch (dbErr) {
      console.warn('Could not save user chat log:', dbErr.message);
    }

    // Simple AI logic (can be replaced with OpenAI/other AI API)
    let aiResponse = "I'm Shyamji AI. How can I help you today?";
    
    if (message.toLowerCase().includes('service')) {
      try {
        const services = await prisma.service.findMany({ take: 3 });
        if (services.length > 0) {
          aiResponse = `We offer services like ${services.map(s => s.name).join(', ')}. Which one are you interested in?`;
        }
      } catch (dbErr) {
        console.warn('Could not fetch services for chatbot:', dbErr.message);
        aiResponse = "We offer a wide range of AI and Tech services including Chatbot development, Web & Mobile apps, and Automation solutions.";
      }
    } else if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost')) {
      aiResponse = "Our pricing is dynamic and depends on your location. You can view it in the Services section or contact us for a custom quote.";
    } else if (message.toLowerCase().includes('contact') || message.toLowerCase().includes('book')) {
      aiResponse = "You can book a consultation through our contact form below.";
    }

    // Save AI response (try/catch to avoid failing if DB is down)
    try {
      const savedAiResponse = await prisma.chatLog.create({
        data: {
          sessionId,
          message: aiResponse,
          sender: 'AI',
        },
      });
      return res.json(savedAiResponse);
    } catch (dbErr) {
      console.warn('Could not save AI chat log:', dbErr.message);
      return res.json({ message: aiResponse, sender: 'AI', createdAt: new Date() });
    }
  } catch (err) {
    console.error('Chatbot Controller Error:', err);
    res.status(500).json({ message: 'I am sorry, I am having trouble processing your request right now. Please try again later.' });
  }
};

const getChatLogs = async (req, res) => {
  try {
    const logs = await prisma.chatLog.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { chat, getChatLogs };
