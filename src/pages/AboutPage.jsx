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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '10px' }}>
              {[
                <><strong>"Raagas of Rafi" by Javed Ali</strong> in Mumbai</>,
                <><strong>Falguni Pathak</strong> – Two back-to-back sold-out shows at the Nita Mukesh Ambani Cultural Centre (NMACC), BKC, Mumbai</>,
                <><strong>Viraj Ghelani Comedy Show Live</strong> at NMACC, Mumbai</>,
                <><strong>Aditya Narayan</strong> – Sold-out live show in Mumbai</>,
                <><strong>Kumar Sanu Live</strong> in Pune and Ahmedabad</>,
                <><strong>Salim–Sulaiman Live</strong> in Mumbai</>,
                <><strong>Mithoon Live in Concert</strong> in Mumbai</>,
                <><strong>Papon Live in Concert</strong> in Surat</>,
                <><strong>Aishwarya Majmudar Live in Concert</strong></>,
                <><strong>Kavi Sammelan by Dr. Kumar Vishwas</strong> and many more shows</>
              ].map((item, idx) => (
                <div key={idx} style={{ 
                  background: 'rgba(255, 255, 255, 0.6)', 
                  padding: '14px 20px', 
                  borderRadius: '12px', 
                  border: '1px solid rgba(0,0,0,0.05)',
                  fontSize: '16px',
                  color: 'var(--charcoal)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--red)', flexShrink: 0 }} />
                  <span style={{ lineHeight: '1.4' }}>{item}</span>
                </div>
              ))}
            </div>
            <p style={{ margin: 0, marginTop: '10px' }}>
              Through these successful events, MRL Events has demonstrated its ability to manage large-scale productions, renowned artists, premium venues, and diverse audiences. Every concert is designed to be more than just a performance—it is created as an unforgettable celebration of music, emotion, and togetherness.
            </p>
          </div>
        </Reveal>
      </div>

      {/* MISSION SECTION */}
      <div className="container" style={{ marginBottom: '60px' }}>
        <div style={{ borderTop: '1px solid var(--border-medium)', paddingTop: '40px' }}>
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
      <div className="container" style={{ marginBottom: '60px' }}>
        <div style={{ borderTop: '1px solid var(--border-medium)', paddingTop: '40px' }}>
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
                To become one of India’s most admired and trusted entertainment companies, recognised for producing world-class live events, presenting exceptional talent, and creating experiences that audiences cherish for a lifetime.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* CORE VALUES */}
      <div className="container" style={{ marginBottom: '60px' }}>
        <div style={{ borderTop: '1px solid var(--border-medium)', paddingTop: '40px' }}>
          <Reveal>
            <Eyebrow>Why MRL Events</Eyebrow>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(44px, 6vw, 90px)', fontWeight: '900', lineHeight: '0.9', textTransform: 'uppercase', letterSpacing: '-0.02em', color: 'var(--charcoal)', marginBottom: '40px', maxWidth: '800px' }}>
              PASSION. QUALITY. <span style={{ color: 'var(--red)' }}>INNOVATION.</span>
            </h2>
          </Reveal>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 60px', borderTop: '1px solid var(--border-light)', paddingTop: '30px' }}>
            {[
              "Experience in organising premium musical concerts",
              "Strong association with renowned and legendary artists",
              "Expertise in large-scale event planning and execution",
              "Successful sold-out shows at prestigious venues",
              "Creative marketing and audience-engagement strategies",
              "Commitment to quality, innovation, and professionalism",
              "End-to-end event management solutions",
              "Growing presence across major Indian cities"
            ].map((text, i) => (
              <Reveal delay={0.1 * (i % 4)} key={i}>
                <h3 style={{ fontFamily: 'var(--display)', fontSize: '22px', fontWeight: '800', margin: 0, textTransform: 'uppercase', letterSpacing: '0.01em', color: 'var(--charcoal)', lineHeight: '1.4' }}>
                  <span style={{ color: 'var(--red)', marginRight: '12px' }}>{String(i + 1).padStart(2, '0')}.</span>
                  {text}
                </h3>
              </Reveal>
            ))}
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
