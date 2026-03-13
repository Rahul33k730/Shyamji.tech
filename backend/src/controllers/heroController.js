const prisma = require('../config/prisma');

const getHero = async (req, res) => {
  try {
    const hero = await prisma.hero.findFirst();
    if (!hero) {
      return res.status(404).json({ message: 'Hero content not found' });
    }
    res.json(hero);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateHero = async (req, res) => {
  const { backgroundUrl, backgroundType, missionTagline, floatingTaglines, cta1Text, cta1Link, cta2Text, cta2Link } = req.body;

  try {
    let hero = await prisma.hero.findFirst();

    if (hero) {
      hero = await prisma.hero.update({
        where: { id: hero.id },
        data: {
          backgroundUrl,
          backgroundType,
          missionTagline,
          floatingTaglines,
          cta1Text,
          cta1Link,
          cta2Text,
          cta2Link,
        },
      });
    } else {
      hero = await prisma.hero.create({
        data: {
          backgroundUrl,
          backgroundType,
          missionTagline,
          floatingTaglines,
          cta1Text,
          cta1Link,
          cta2Text,
          cta2Link,
        },
      });
    }

    res.json(hero);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getHero, updateHero };
