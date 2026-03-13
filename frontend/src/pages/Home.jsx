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

import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    hero: null,
    services: [],
    products: [],
    portfolio: [],
    logo: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching data from:', API_BASE_URL);
      try {
        setLoading(true);
        // Individual fetches to prevent one failure from blocking others
        const fetchHero = axios.get(`${API_BASE_URL}/hero`).catch(err => {
          console.error('Hero fetch failed:', err.message);
          return { data: null };
        });
        const fetchServices = axios.get(`${API_BASE_URL}/services`).catch(err => {
          console.error('Services fetch failed:', err.message);
          return { data: [] };
        });
        const fetchProducts = axios.get(`${API_BASE_URL}/products`).catch(err => {
          console.error('Products fetch failed:', err.message);
          return { data: [] };
        });
        const fetchPortfolio = axios.get(`${API_BASE_URL}/portfolio`).catch(err => {
          console.error('Portfolio fetch failed:', err.message);
          return { data: [] };
        });
        const fetchLogo = axios.get(`${API_BASE_URL}/logo`).catch(err => {
          console.error('Logo fetch failed:', err.message);
          return { data: null };
        });

        const [heroRes, servicesRes, productsRes, portfolioRes, logoRes] = await Promise.all([
          fetchHero,
          fetchServices,
          fetchProducts,
          fetchPortfolio,
          fetchLogo
        ]);

        console.log('Data fetched successfully');

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
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Safety timeout to ensure loading screen doesn't stay forever
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-950 min-h-screen flex items-center justify-center transition-colors duration-500">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse uppercase tracking-widest text-[10px]">Loading Experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-[#000000]' : 'bg-bg-primary'} min-h-screen selection:bg-primary-blue/30 transition-colors duration-500`}>
      <Navbar />
      <main>
        <Hero heroData={data.hero} />
        <ServicesMarquee services={data.services} />
        <section className={`${theme === 'dark' ? 'bg-[#000000]' : 'bg-bg-primary'} transition-colors duration-500`}>
          <Services services={data.services} />
        </section>
        <section className={`${theme === 'dark' ? 'bg-[#050505]' : 'bg-bg-secondary'} transition-colors duration-500`}>
          <Products products={data.products} />
        </section>
        <section className={`${theme === 'dark' ? 'bg-[#000000]' : 'bg-bg-primary'} transition-colors duration-500`}>
          <PortfolioGrid portfolio={data.portfolio} />
        </section>
        <section className={`${theme === 'dark' ? 'bg-[#050505]' : 'bg-bg-secondary'} transition-colors duration-500`}>
          <ContactSection />
        </section>
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Home;
