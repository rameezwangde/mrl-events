import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Reveal = ({ children, className = '', delay = 0 }) => (
  <motion.div 
    className={className} 
    initial={{ opacity: 0, y: 36 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true, margin: '-80px' }} 
    transition={{ duration: .8, delay, ease: [.22, 1, .36, 1] }}
  >
    {children}
  </motion.div>
);

const Eyebrow = ({ children, light = false }) => (
  <div className={`eyebrow ${light ? 'eyebrow-light' : 'eyebrow-dark'} mb-6`}>
    <span></span>{children}
  </div>
);

export default function OurWorkPage() {
  const images = Array.from({ length: 12 }, (_, i) => `/assets/work-${i + 1}.jpeg`);

  return (
    <div className="min-h-screen bg-[var(--beige)] text-[var(--dark)]">
      
      {/* HERO SECTION - Dark Theme, large text */}
      <div className="relative pt-[200px] pb-[120px] bg-[var(--dark)] text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/live-performance.png" 
            alt="Concert Background" 
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark)] via-transparent to-[var(--dark)]"></div>
        </div>

        <div className="container relative z-10">
          <Reveal>
            <Eyebrow light>Our Portfolio</Eyebrow>
            <h1 className="font-[var(--display)] text-7xl md:text-[140px] leading-[0.85] uppercase tracking-wide mb-8">
              OUR <span className="text-[var(--red)]">WORK</span>
            </h1>
            <p className="text-xl md:text-2xl text-[var(--beige)]/80 max-w-3xl leading-relaxed">
              A glimpse into the extraordinary live experiences, corporate galas, and musical events we've brought to life across India.
            </p>
          </Reveal>
        </div>
      </div>

      {/* GALLERY SECTION */}
      <div className="container py-24 md:py-32">
        <Reveal>
          <div className="mb-16 border-b border-[var(--dark)]/10 pb-12">
            <h2 className="font-[var(--display)] text-5xl md:text-7xl uppercase tracking-wide text-[var(--dark)]">
              FEATURED <span className="text-[var(--red)]">MOMENTS</span>
            </h2>
          </div>
        </Reveal>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="relative overflow-hidden group rounded-sm bg-[var(--dark)]">
                <img 
                  src={src} 
                  alt={`Event Moment ${idx + 1}`} 
                  className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[.22,1,.36,1]"
                  loading="lazy"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none"></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="container pb-24">
        <div className="border-t border-[var(--dark)]/10 pt-16 md:pt-24 flex flex-col items-center text-center">
          <Reveal>
            <h2 className="font-[var(--display)] text-5xl md:text-7xl uppercase tracking-wide text-[var(--dark)] mb-8">
              READY TO BE OUR NEXT <span className="text-[var(--red)]">MASTERPIECE?</span>
            </h2>
            <p className="text-xl text-[#5e514a] leading-relaxed max-w-2xl mx-auto mb-10">
              Let's turn your vision into an unforgettable experience. Our team is ready to bring your ideas to life.
            </p>
            <Link to="/#contact" className="button primary">
              Plan your event <ArrowUpRight size={18} />
            </Link>
          </Reveal>
        </div>
      </div>

    </div>
  );
}
