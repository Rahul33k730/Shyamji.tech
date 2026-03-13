import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServicesMarquee from '../components/ServicesMarquee';
import Services from '../components/Services';
import Products from '../components/Products';
import PortfolioGrid from '../components/PortfolioGrid';
import ContactSection from '../components/ContactSection';
import Chatbot from '../components/Chatbot';
import Footer from '../components/Footer';

import API_BASE_URL from '../config/api';

const Home = () => {
  const [data, setData] = useState({
    hero: null,
    services: [],
    products: [],
    portfolio: [],
    logo: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Individual fetches to prevent one failure from blocking others
        const fetchHero = axios.get(`${API_BASE_URL}/hero`).catch(() => ({ data: null }));
        const fetchServices = axios.get(`${API_BASE_URL}/services`).catch(() => ({ data: [] }));
        const fetchProducts = axios.get(`${API_BASE_URL}/products`).catch(() => ({ data: [] }));
        const fetchPortfolio = axios.get(`${API_BASE_URL}/portfolio`).catch(() => ({ data: [] }));
        const fetchLogo = axios.get(`${API_BASE_URL}/logo`).catch(() => ({ data: null }));

        const [heroRes, servicesRes, productsRes, portfolioRes, logoRes] = await Promise.all([
          fetchHero,
          fetchServices,
          fetchProducts,
          fetchPortfolio,
          fetchLogo
        ]);

        setData({
          hero: heroRes.data,
          services: servicesRes.data,
          products: productsRes.data,
          portfolio: portfolioRes.data,
          logo: logoRes.data,
        });

        // Dynamically update favicon
        if (logoRes.data?.favicon) {
          const link = document.querySelector("link[rel~='icon']");
          if (link) {
            link.href = logoRes.data.favicon;
          } else {
            const newLink = document.createElement('link');
            newLink.rel = 'icon';
            newLink.href = logoRes.data.favicon;
            document.head.appendChild(newLink);
          }
        }
      } catch (err) {
        console.error('Error in fetchData:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen selection:bg-cyan-500/30 transition-colors duration-300">
      <Navbar />
      <main>
        <Hero heroData={data.hero} />
        <ServicesMarquee services={data.services} />
        <Services services={data.services} />
        <Products products={data.products} />
        <PortfolioGrid portfolio={data.portfolio} />
        <ContactSection />
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Home;
