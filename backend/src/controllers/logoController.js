const prisma = require('../config/prisma');

const getLogo = async (req, res) => {
  try {
    const logo = await prisma.logo.findFirst();
    res.json(logo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateLogo = async (req, res) => {
  const { mainLogo, iconVersion, favicon } = req.body;

  try {
    let logo = await prisma.logo.findFirst();

    if (logo) {
      logo = await prisma.logo.update({
        where: { id: logo.id },
        data: { mainLogo, iconVersion, favicon },
      });
    } else {
      logo = await prisma.logo.create({
        data: { mainLogo, iconVersion, favicon },
      });
    }

    res.json(logo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getLogo, updateLogo };
