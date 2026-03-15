const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient({});

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "rahuldrrahulyadav@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Rahul986718";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Update or Create Admin
  const admin = await prisma.admin.findUnique({ where: { email: adminEmail } });
  if (admin) {
    await prisma.admin.update({
      where: { email: adminEmail },
      data: { password: hashedPassword }
    });
  } else {
    await prisma.admin.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
      },
    });
  }

  // Initial Content
  const initialContent = [
    { key: "hero_tagline", value: "TRANSFORM" },
    { key: "hero_title", value: "SHYAMJI TECH Turning Great Ideas Into Reality" },
    { key: "hero_subtitle", value: "Shyamji Tech is a premium innovation hub helping businesses transform ideas into powerful digital products using modern technology and AI." },
    { key: "company_description", value: "Shyamji Tech is a premium innovation hub helping businesses transform ideas into powerful digital products using modern technology and AI." },
    { key: "footer_text", value: "Building the future of intelligent technology with cutting-edge AI and software solutions for the next generation of startups." },
  ];

  for (const item of initialContent) {
    await prisma.content.upsert({
      where: { key: item.key },
      update: { value: item.value },
      create: item,
    });
  }

  // Initial Services
  const initialServices = [
    {
      name: "AI Model Training",
      description: "Customized AI training services tailored to your specific industry needs.",
      price: "₹100,000",
      category: "AI & Automation",
      icon: "Brain",
      status: "active",
    },
    {
      name: "Custom Web Development",
      description: "High-performance custom websites built with modern technologies like React and Next.js.",
      price: "₹35,000",
      category: "Web Development",
      icon: "Globe",
      status: "active",
    },
    {
      name: "Mobile App Development",
      description: "Native and cross-platform mobile applications designed for seamless user experiences.",
      price: "₹60,000",
      category: "Mobile Apps",
      icon: "Smartphone",
      status: "active",
    },
    {
      name: "AI Automation Solutions",
      description: "Automate your business workflows with intelligent AI-driven automation systems.",
      price: "₹40,000",
      category: "AI & Automation",
      icon: "Zap",
      status: "active",
    },
  ];

  // Clear existing services to avoid duplicates
  await prisma.service.deleteMany({});

  for (const service of initialServices) {
    await prisma.service.create({
      data: service,
    });
  }

  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
