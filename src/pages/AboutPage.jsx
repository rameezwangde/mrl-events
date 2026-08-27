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
  <div className="eyebrow eyebrow-dark" style={{ marginBottom: '20px' }}>
    <span></span>{children}
  </div>
);

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '130px', paddingBottom: '100px', minHeight: '100vh', background: 'var(--beige)', color: 'var(--charcoal)' }}>
      
      {/* HERO SECTION */}
      <div className="container" style={{ marginBottom: '60px' }}>
        <Reveal>
          <Eyebrow>About the company</Eyebrow>
          <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(50px, 8vw, 110px)', fontWeight: '900', lineHeight: '0.9', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '40px', color: 'var(--charcoal)' }}>
            ABOUT MRL <span style={{ color: 'var(--red)' }}>EVENTS</span>
          </h1>
          <div className="seo-content" style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--charcoal)', fontSize: 'clamp(17px, 1.5vw, 20px)', fontWeight: '500', lineHeight: '1.65' }}>
            <p style={{ margin: 0 }}>
              <strong>MRL Events</strong> is a vibrant and rapidly growing <strong>entertainment and event management company</strong> founded in 2023 by Mr. Laxaman Patel and Mr. Ramesh Mor. Since our inception, we have established ourselves as a trusted name in the Indian entertainment industry by conceptualising, organising, and executing high-quality <strong>musical concerts and live experiences</strong> across India.
            </p>
            <p style={{ margin: 0 }}>
              Driven by creativity, passion, and professional excellence, MRL Events specialises in bringing legendary artists and celebrated performers closer to their audiences. From <strong>artist management and event production</strong> to venue coordination, promotions, ticketing, and audience engagement, every aspect of an event is carefully planned and flawlessly executed.
            </p>
            <h2 style={{ fontSize: '24px', fontFamily: 'var(--display)', color: 'var(--charcoal)', marginTop: '20px', marginBottom: '10px' }}>Our Prestigious Concerts & Live Shows</h2>
            <p style={{ margin: 0 }}>
              We have successfully organised several large-scale productions featuring renowned artists at premium venues. Our portfolio includes:
            </p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>"Raagas of Rafi" by Javed Ali</strong> in Mumbai</li>
              <li><strong>Falguni Pathak</strong> – Two back-to-back sold-out shows at the Nita Mukesh Ambani Cultural Centre (NMACC), BKC, Mumbai</li>
              <li><strong>Viraj Ghelani Comedy Show Live</strong> at NMACC, Mumbai</li>
              <li><strong>Aditya Narayan</strong> – Sold-out live show in Mumbai</li>
              <li><strong>Kumar Sanu Live</strong> in Pune and Ahmedabad</li>
              <li><strong>Salim–Sulaiman Live</strong> in Mumbai</li>
              <li><strong>Mithoon Live in Concert</strong> in Mumbai</li>
              <li><strong>Papon Live in Concert</strong> in Surat</li>
              <li><strong>Aishwarya Majmudar Live in Concert</strong></li>
              <li><strong>Kavi Sammelan by Dr. Kumar Vishwas</strong> and many more shows</li>
            </ul>
            <p style={{ margin: 0, marginTop: '10px' }}>
              Through these successful events, MRL Events has demonstrated its ability to manage large-scale productions, renowned artists, premium venues, and diverse audiences. Every concert is designed to be more than just a performance—it is created as an unforgettable celebration of music, emotion, and togetherness.
            </p>
          </div>
        </Reveal>
      </div>

      {/* MISSION SECTION */}
      <div className="container" style={{ marginBottom: '100px' }}>
        <div style={{ borderTop: '1px solid var(--border-medium)', paddingTop: '60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'clamp(40px, 5vw, 80px)', alignItems: 'center' }}>
            <Reveal>
              <Eyebrow>Our Mission</Eyebrow>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(40px, 5vw, 80px)', fontWeight: '900', lineHeight: '0.9', textTransform: 'uppercase', letterSpacing: '-0.02em', color: 'var(--charcoal)', marginBottom: '28px' }}>
                EXTRAORDINARY <span style={{ color: 'var(--red)' }}>LIVE EXPERIENCES</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '17px', color: 'var(--charcoal)', fontWeight: '500', lineHeight: '1.7', maxWidth: '500px' }}>
                <p style={{ margin: 0 }}>
                  Our mission is to craft extraordinary live entertainment experiences that connect audiences with legendary artists through innovation, excellence, creativity, and heartfelt execution.
                </p>
                <p style={{ margin: 0 }}>
                  MRL Events is committed to maintaining the highest standards of professionalism while delivering memorable experiences for audiences, artists, sponsors, partners, and stakeholders. We aim to continuously expand our presence across India and create iconic entertainment properties that leave a lasting impression.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2} className="h-full">
              <img 
                src="/assets/live-performance.png" 
                alt="Live Event" 
                style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '14px', filter: 'grayscale(100%)', transition: 'filter 0.7s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0%)'}
                onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(100%)'}
              />
            </Reveal>
          </div>
        </div>
      </div>

      {/* VISION SECTION */}
      <div className="container" style={{ marginBottom: '100px' }}>
        <div style={{ borderTop: '1px solid var(--border-medium)', paddingTop: '60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'clamp(40px, 5vw, 80px)', alignItems: 'center' }}>
            <Reveal delay={0.2} className="h-full">
              <img 
                src="/assets/corporate-gala.png" 
                alt="Corporate Event" 
                style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '14px', filter: 'grayscale(100%)', transition: 'filter 0.7s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0%)'}
                onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(100%)'}
              />
            </Reveal>
            <Reveal>
              <Eyebrow>Our Vision</Eyebrow>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(40px, 5vw, 80px)', fontWeight: '900', lineHeight: '0.9', textTransform: 'uppercase', letterSpacing: '-0.02em', color: 'var(--charcoal)', marginBottom: '28px' }}>
                REDEFINING <span style={{ color: 'var(--red)' }}>LIVE EVENTS</span>
              </h2>
              <p style={{ fontSize: '17px', color: 'var(--charcoal)', fontWeight: '500', lineHeight: '1.7', maxWidth: '500px', margin: 0 }}>
                To emerge as one of India's premier entertainment companies, known for redefining live events with creativity, professionalism, and unforgettable performances.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* CORE VALUES */}
      <div className="container" style={{ marginBottom: '80px' }}>
        <div style={{ borderTop: '1px solid var(--border-medium)', paddingTop: '60px' }}>
          <Reveal>
            <Eyebrow>Why MRL Events</Eyebrow>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(44px, 6vw, 90px)', fontWeight: '900', lineHeight: '0.9', textTransform: 'uppercase', letterSpacing: '-0.02em', color: 'var(--charcoal)', marginBottom: '60px', maxWidth: '800px' }}>
              PASSION. QUALITY. <span style={{ color: 'var(--red)' }}>INNOVATION.</span>
            </h2>
          </Reveal>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 60px', borderTop: '1px solid var(--border-light)', paddingTop: '50px' }}>
            <Reveal delay={0.1}>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '28px', fontWeight: '800', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.01em', color: 'var(--charcoal)' }}><span style={{ color: 'var(--red)', marginRight: '8px' }}>01.</span>Passion for Performance</h3>
              <p style={{ fontSize: '15px', color: 'var(--charcoal-muted)', lineHeight: '1.7', margin: 0 }}>Fueling every event with energy, enthusiasm, and musical excellence.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '28px', fontWeight: '800', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.01em', color: 'var(--charcoal)' }}><span style={{ color: 'var(--red)', marginRight: '8px' }}>02.</span>Commitment to Quality</h3>
              <p style={{ fontSize: '15px', color: 'var(--charcoal-muted)', lineHeight: '1.7', margin: 0 }}>Ensuring flawless execution with attention to detail in every project.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '28px', fontWeight: '800', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.01em', color: 'var(--charcoal)' }}><span style={{ color: 'var(--red)', marginRight: '8px' }}>03.</span>Artist & Audience Centricity</h3>
              <p style={{ fontSize: '15px', color: 'var(--charcoal-muted)', lineHeight: '1.7', margin: 0 }}>Balancing the needs of performers and patrons for enriching experiences.</p>
            </Reveal>
            <Reveal delay={0.4}>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '28px', fontWeight: '800', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.01em', color: 'var(--charcoal)' }}><span style={{ color: 'var(--red)', marginRight: '8px' }}>04.</span>Innovation & Creativity</h3>
              <p style={{ fontSize: '15px', color: 'var(--charcoal-muted)', lineHeight: '1.7', margin: 0 }}>Continuously evolving concepts and formats to set new trends in live entertainment.</p>
            </Reveal>
            <Reveal delay={0.5} style={{ gridColumn: 'span 2' }}>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: '28px', fontWeight: '800', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.01em', color: 'var(--charcoal)' }}><span style={{ color: 'var(--red)', marginRight: '8px' }}>05.</span>Integrity & Professionalism</h3>
              <p style={{ fontSize: '15px', color: 'var(--charcoal-muted)', lineHeight: '1.7', margin: 0, maxWidth: '600px' }}>Building lasting relationships through trust, transparency, and respect.</p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container">
        <div style={{ borderTop: '1px solid var(--border-medium)', paddingTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Reveal>
            <a href="/#contact" className="button primary" style={{ marginTop: '16px' }}>
              Get in Touch <ArrowUpRight size={18} />
            </a>
          </Reveal>
        </div>
      </div>

    </div>
  );
}
