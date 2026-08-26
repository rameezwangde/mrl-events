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
  <div className={`eyebrow ${light ? 'eyebrow-light' : 'eyebrow-dark'}`} style={{ marginBottom: '20px' }}>
    <span></span>{children}
  </div>
);

export default function OurWorkPage() {
  const images = Array.from({ length: 12 }, (_, i) => `/assets/work-${i + 1}.jpeg`);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--beige)', color: 'var(--charcoal)' }}>
      
      {/* HERO SECTION - Dark Theme */}
      <div style={{ position: 'relative', paddingTop: '180px', paddingBottom: '100px', background: 'var(--charcoal)', color: '#fff', overflow: 'hidden' }}>
        {/* Background Image with Overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img 
            src="/assets/live-performance.png" 
            alt="Concert Background" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2, mixBlendMode: 'luminosity' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, var(--charcoal) 0%, transparent 40%, rgba(29,29,29,0.6) 100%)' }}></div>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <Reveal>
            <Eyebrow light>Our Portfolio</Eyebrow>
            <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(50px, 9vw, 120px)', fontWeight: '900', lineHeight: '0.9', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '28px' }}>
              OUR <span style={{ color: 'var(--red)' }}>WORK</span>
            </h1>
            <p style={{ fontSize: 'clamp(17px, 1.5vw, 20px)', color: 'rgba(242,232,220,0.7)', maxWidth: '600px', lineHeight: '1.6', margin: 0 }}>
              A glimpse into the extraordinary live experiences, corporate galas, and musical events we've brought to life across India.
            </p>
          </Reveal>
        </div>
      </div>

      {/* GALLERY SECTION */}
      <div className="container" style={{ padding: 'clamp(60px, 8vw, 100px) 0' }}>
        <Reveal>
          <div style={{ marginBottom: '50px', borderBottom: '1px solid var(--border-medium)', paddingBottom: '40px' }}>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.02em', color: 'var(--charcoal)', margin: 0 }}>
              FEATURED <span style={{ color: 'var(--red)' }}>MOMENTS</span>
            </h2>
          </div>
        </Reveal>

        <div style={{ columnCount: 3, columnGap: '20px' }}>
          {images.map((src, idx) => (
            <Reveal key={idx} delay={Math.min(idx * 0.05, 0.4)}>
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '10px', background: 'var(--charcoal)', marginBottom: '20px', breakInside: 'avoid' }}>
                <motion.img 
                  src={src} 
                  alt={`Event Moment ${idx + 1}`} 
                  style={{ width: '100%', height: 'auto', objectFit: 'cover', opacity: 0.9, display: 'block', transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1)' }}
                  loading="lazy"
                  whileHover={{ scale: 1.04, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* CTA SECTION */}
      <div style={{ background: 'var(--red)', padding: 'clamp(60px, 8vw, 100px) 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Reveal>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(36px, 5vw, 70px)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.02em', color: 'var(--off-white)', marginBottom: '24px', lineHeight: '0.95' }}>
                READY TO BE OUR NEXT <span style={{ opacity: 0.6 }}>MASTERPIECE?</span>
              </h2>
              <p style={{ fontSize: '17px', color: 'rgba(255,253,252,0.7)', lineHeight: '1.7', maxWidth: '550px', margin: '0 auto 36px' }}>
                Let's turn your vision into an unforgettable experience. Our team is ready to bring your ideas to life.
              </p>
              <Link to="/#contact" className="button primary" style={{ background: 'var(--off-white)', color: 'var(--red)' }}>
                Plan your event <ArrowUpRight size={18} />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>

    </div>
  );
}
