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

const Eyebrow = ({ children }) => (
  <div className="eyebrow eyebrow-dark mb-6">
    <span></span>{children}
  </div>
);

export default function AboutPage() {
  return (
    <div className="pt-[140px] pb-24 min-h-screen bg-[var(--beige)] text-[var(--dark)]">
      
      {/* HERO SECTION - Inspired by Reference 1 */}
      <div className="container mb-24 md:mb-32">
        <Reveal>
          <Eyebrow>About the company</Eyebrow>
          <h1 className="font-[var(--display)] text-7xl md:text-[130px] leading-[0.85] uppercase tracking-wide mb-10 text-[var(--dark)]">
            ABOUT MRL <span className="text-[var(--red)]">EVENTS</span>
          </h1>
          <div className="max-w-3xl space-y-6 text-[#5e514a] text-xl md:text-2xl font-medium leading-relaxed">
            <p>
              MRL Events is a vibrant and rapidly growing entertainment and event management company, founded in 2023 by Mr. Laxaman Patel and Mr. Ramesh Mor. Since its inception, the company has established itself as a trusted name in the industry by curating and executing high-quality musical events across India.
            </p>
            <p>
              With a passion for delivering exceptional live experiences, MRL Events focuses on bringing legendary artists and unforgettable performances to audiences in a grand and memorable way.
            </p>
          </div>
        </Reveal>
      </div>

      {/* MISSION / IMAGE SECTION - Inspired by Reference 2 */}
      <div className="container mb-24 md:mb-32">
        <div className="border-t border-[var(--dark)]/10 pt-16 md:pt-24">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-24 items-center">
            <Reveal>
              <Eyebrow>Our Mission</Eyebrow>
              <h2 className="font-[var(--display)] text-6xl md:text-[95px] leading-[0.85] uppercase tracking-wide text-[var(--dark)] mb-8">
                EXTRAORDINARY LIVE EXPERIENCES
              </h2>
              <p className="text-xl text-[#5e514a] leading-relaxed max-w-xl">
                To craft extraordinary live entertainment experiences that connect audiences with legendary artists, through innovation, excellence, and heartfelt execution.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="h-full">
              <img 
                src="/assets/live-performance.png" 
                alt="Live Event" 
                className="w-full h-[400px] md:h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </Reveal>
          </div>
        </div>
      </div>

      {/* VISION / IMAGE SECTION - Inspired by Reference 2 (Flipped) */}
      <div className="container mb-24 md:mb-32">
        <div className="border-t border-[var(--dark)]/10 pt-16 md:pt-24">
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-24 items-center">
            <Reveal delay={0.2} className="order-2 md:order-1 h-full">
              <img 
                src="/assets/corporate-gala.png" 
                alt="Corporate Event" 
                className="w-full h-[400px] md:h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </Reveal>
            <Reveal className="order-1 md:order-2">
              <Eyebrow>Our Vision</Eyebrow>
              <h2 className="font-[var(--display)] text-6xl md:text-[95px] leading-[0.85] uppercase tracking-wide text-[var(--dark)] mb-8">
                REDEFINING LIVE EVENTS
              </h2>
              <p className="text-xl text-[#5e514a] leading-relaxed max-w-xl">
                To emerge as one of India's premier entertainment companies, known for redefining live events with creativity, professionalism, and unforgettable performances.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* CORE VALUES GRID - Inspired by Reference 3 */}
      <div className="container mb-24">
        <div className="border-t border-[var(--dark)]/10 pt-16 md:pt-24">
          <Reveal>
            <Eyebrow>Why MRL Events</Eyebrow>
            <h2 className="font-[var(--display)] text-6xl md:text-[110px] leading-[0.85] uppercase tracking-wide text-[var(--dark)] mb-20 max-w-5xl">
              PASSION. QUALITY. INNOVATION.
            </h2>
          </Reveal>
          
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-16 border-t border-[var(--dark)]/10 pt-16">
            <Reveal delay={0.1}>
              <h3 className="font-[var(--display)] text-4xl mb-4 uppercase tracking-wider text-[var(--dark)]">Passion for Performance</h3>
              <p className="text-lg text-[#5e514a] leading-relaxed">Fueling every event with energy, enthusiasm, and musical excellence.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <h3 className="font-[var(--display)] text-4xl mb-4 uppercase tracking-wider text-[var(--dark)]">Commitment to Quality</h3>
              <p className="text-lg text-[#5e514a] leading-relaxed">Ensuring flawless execution with attention to detail in every project.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <h3 className="font-[var(--display)] text-4xl mb-4 uppercase tracking-wider text-[var(--dark)]">Artist & Audience Centricity</h3>
              <p className="text-lg text-[#5e514a] leading-relaxed">Balancing the needs of performers and patrons for enriching experiences.</p>
            </Reveal>
            <Reveal delay={0.4}>
              <h3 className="font-[var(--display)] text-4xl mb-4 uppercase tracking-wider text-[var(--dark)]">Innovation & Creativity</h3>
              <p className="text-lg text-[#5e514a] leading-relaxed">Continuously evolving concepts and formats to set new trends in live entertainment.</p>
            </Reveal>
            <Reveal delay={0.5} className="md:col-span-2">
              <h3 className="font-[var(--display)] text-4xl mb-4 uppercase tracking-wider text-[var(--dark)]">Integrity & Professionalism</h3>
              <p className="text-lg text-[#5e514a] leading-relaxed max-w-2xl">Building lasting relationships through trust, transparency, and respect.</p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ADDITIONAL TEXT & CTA */}
      <div className="container">
        <div className="border-t border-[var(--dark)]/10 pt-16 md:pt-24 flex flex-col items-center text-center">
          <Reveal>
            <a href="/#contact" className="button primary" style={{ marginTop: '20px' }}>
              Get in Touch <ArrowUpRight size={18} />
            </a>
          </Reveal>
        </div>
      </div>

    </div>
  );
}
