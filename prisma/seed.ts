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

  // Initial Projects (Portfolio)
  const initialProjects = [
    {
      title: "AI Analysis Platform",
      category: "AI & Machine Learning",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
      description: "Enterprise-grade real-time data analysis platform using advanced neural networks for predictive modeling.",
      tags: "AI, Machine Learning, Data Analytics",
    },
    {
      title: "Modern SaaS Dashboard",
      category: "Enterprise Software",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      description: "A highly performant, cloud-native dashboard designed for monitoring complex enterprise metrics and KPIs.",
      tags: "SaaS, Dashboard, Cloud",
    },
    {
      title: "Quantum E-Commerce",
      category: "Web Applications",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
      description: "Next-generation shopping experience featuring serverless architecture and real-time inventory management.",
      tags: "E-Commerce, Next.js, Serverless",
    },
  ];

  // Initial Pricing Plans
  const initialPricingPlans = [
    {
      name: "Custom Web Development",
      price: "₹35,000",
      description: "High-performance custom websites built with modern technologies like React and Next.js.",
      features: JSON.stringify(["Modern UI/UX Design", "Responsive Layouts", "SEO Optimized", "Next.js & React", "Secure Deployment"]),
      popular: false,
      order: 0
    },
    {
      name: "AI Automation Solutions",
      price: "₹40,000",
      description: "Automate your business workflows with intelligent AI-driven automation systems.",
      features: JSON.stringify(["Workflow Analysis", "Custom AI Integration", "Process Automation", "Efficiency Reporting", "Continuous Optimization"]),
      popular: true,
      order: 1
    },
    {
      name: "Mobile App Development",
      price: "₹60,000",
      description: "Native and cross-platform mobile applications designed for seamless user experiences.",
      features: JSON.stringify(["iOS & Android Apps", "Flutter/React Native", "Offline Functionality", "App Store Publishing", "Push Notifications"]),
      popular: false,
      order: 2
    },
    {
      name: "AI Model Training",
      price: "₹100,000",
      description: "Customized AI training services tailored to your specific industry needs.",
      features: JSON.stringify(["Data Processing", "Model Architecture", "Performance Tuning", "Scalable Inference", "API Integration"]),
      popular: false,
      order: 3
    }
  ];

  // Clear existing services to avoid duplicates
  await prisma.service.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.pricingPlan.deleteMany({});

  for (const service of initialServices) {
    await prisma.service.create({
      data: service,
    });
  }

  for (const project of initialProjects) {
    await prisma.project.create({
      data: project,
    });
  }

  for (const plan of initialPricingPlans) {
    await prisma.pricingPlan.create({
      data: plan,
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
