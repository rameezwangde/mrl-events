import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ArrowLeft, Menu, X, Sparkles, UserRound, ShieldCheck, UsersRound, MapPin, Trophy } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const nav = [['Home', '/#home'], ['About', '/about'], ['Services', '/#services'], ['Our Work', '/work'], ['Testimonials', '/#testimonials'], ['Events', '/events'], ['Contact', '/contact']];
const services = [
  ['01', 'Corporate Events', 'Conferences, launches, award nights and brand experiences designed around your business objectives.'],
  ['02', 'Weddings & Celebrations', 'Beautifully curated celebrations managed from creative direction through flawless on-ground execution.'],
  ['03', 'Live Entertainment', 'Artists, performances, concerts and entertainment experiences curated for the right audience.'],
  ['04', 'Exhibitions & Brand Activations', 'Immersive spaces and activations designed to attract attention and create meaningful audience interaction.'],
  ['05', 'Event Production', 'Stage, lighting, sound, AV, fabrication and technical production managed under one coordinated team.'],
  ['06', 'Private & Social Events', 'Personal celebrations transformed into memorable experiences through thoughtful design and planning.']
];
const testimonials = [
  { quote: 'The entire event was organised with incredible attention to detail. The team handled every moving part professionally and made the whole experience seamless.', name: 'Rahul Mehta', type: 'Corporate Event' },
  { quote: 'From the first concept meeting to the final execution, the team brought energy, creativity and complete control to the production.', name: 'Priya Shah', type: 'Private Celebration' },
  { quote: 'What impressed us most was how smoothly everything came together. Our guests experienced the magic — we never saw the complexity behind it.', name: 'Arjun Kapoor', type: 'Brand Activation' }
];

const Reveal = ({ children, className = '', delay = 0 }) => <motion.div className={className} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .8, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
const Eyebrow = ({ children, light = false, dark = false }) => <div className={`eyebrow ${light ? 'eyebrow-light' : ''} ${dark ? 'eyebrow-dark' : ''}`}><span />{children}</div>;

function Logo() { return <Link className="logo" to="/#home" aria-label="MRL Events home" style={{ padding: 0, background: 'none', border: 'none' }}><img src="/assets/mrl-logo.png" alt="MRL Events" style={{ height: '50px', width: 'auto', objectFit: 'contain', display: 'block' }} /></Link> }

function Navbar() {
  const [scrolled, setScrolled] = useState(false), [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { const on = () => setScrolled(scrollY > 30); on(); addEventListener('scroll', on, { passive: true }); return () => removeEventListener('scroll', on) }, []);
  const go = () => setOpen(false);
  return <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}><div className="nav-inner"><Logo /><nav className="desktop-nav">{nav.map(([n, path], i) => {
    const isActive = location.pathname === path || (location.pathname === '/' && path === '/#home');
    return path.startsWith('/') && !path.includes('#') ? <Link className={isActive ? 'active' : ''} key={path} to={path}>{n}</Link> : <a className={isActive ? 'active' : ''} key={path} href={path}>{n}</a>
  })}<Link to="/#contact" className="nav-cta">Plan your event <ArrowUpRight size={14} /></Link></nav><button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button></div><AnimatePresence>{open && <motion.nav className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>{nav.map(([n, path], i) => {
    return path.startsWith('/') && !path.includes('#') ? <Link key={path} to={path} onClick={go}><motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .06 }} className="flex justify-between w-full">{n}<ArrowUpRight /></motion.span></Link> : <motion.a key={path} href={path} onClick={go} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .06 }}>{n}<ArrowUpRight /></motion.a>
  })}</motion.nav>}</AnimatePresence></header>
}

function Hero() {
  const stats = [
    [UsersRound, '15+', 'Concerts delivered', 'Successfully executed across India.'],
    [MapPin, '9+', 'Cities covered', 'Bringing our expertise to venues across the nation.'],
    [ShieldCheck, '100%', 'Client commitment', 'Dedicated to delivering flawless experiences every time.'],
    [Trophy, '3+', 'Years of experience', 'A decade of industry leadership and creative excellence.']
  ];
  return <section id="home" className="hero"><div className="hero-glow glow-one" /><div className="hero-glow glow-two" /><div className="hero-photo"><motion.img initial={{ scale: 1.06, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.6, ease: [.22, 1, .36, 1] }} src="/assets/hero-concert.png" alt="Audience watching a vibrant live performance" /><div className="hero-mask" /></div><div className="container hero-main"><div className="hero-copy"><motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15, duration: .6 }}><Eyebrow dark>Live Events & Experiences</Eyebrow></motion.div><h1><motion.span initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .8 }}>We create</motion.span><motion.span className="gradient-text" initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .38, duration: .8 }}>Experiences</motion.span></h1><motion.div className="script" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .58, duration: .7 }}>You'll Never Forget<svg viewBox="0 0 340 22"><motion.path d="M5 15 C 85 0, 220 4, 335 12" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: .9, duration: 1.1 }} /></svg></motion.div><motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .7 }}>From unforgettable celebrations to high-impact corporate experiences, we bring ideas to life through creativity, precision and flawless execution.</motion.p><motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .82 }}><a href="#contact" className="button primary">Plan your event <ArrowRight /></a><a href="#work" className="button secondary">Explore our work <ArrowUpRight /></a></motion.div><motion.div className="trust" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>{[[Sparkles, 'Creative Concepts'], [UserRound, 'End-to-End Management'], [ShieldCheck, 'Flawless Execution']].map(([Icon, t], i) => <div key={t}><span className={`trust-icon t${i}`}><Icon /></span>{t}</div>)}</motion.div></div></div><div className="container stats">{stats.map(([Icon, n, l, d], i) => <motion.div key={l} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .9 + i * .08 }}><Icon /><span className={`stat-num s${i}`}>{n}</span><span>{l}</span><p className="stat-desc">{d}</p></motion.div>)}</div></section>
}

function About() {
  const { scrollYProgress } = useScroll(); const drift = useTransform(scrollYProgress, [.08, .36], [-40, 40]);
  return <section id="about" className="about section-beige"><div className="container"><Reveal className="about-intro"><Eyebrow dark>More than events.</Eyebrow><p>We create moments people remember.</p></Reveal><motion.h2 style={{ x: drift }} className="mega-statement"><span>We turn ideas</span><em>into experiences.</em></motion.h2><div style={{ borderTop: '1px solid rgba(29,29,29,0.12)', paddingTop: '70px' }}><Reveal><h3 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: '900', textTransform: 'uppercase', textAlign: 'center', margin: '0 0 35px 0', letterSpacing: '-0.02em' }}>About <i style={{ fontStyle: 'normal', color: 'var(--red)' }}>MRL Events</i></h3></Reveal><Reveal delay={0.15}><div style={{ maxWidth: '900px', margin: '0 auto', color: 'var(--charcoal-muted)', fontSize: '16px', lineHeight: '1.75' }}><p className="lead" style={{ marginBottom: '20px', fontSize: 'clamp(19px, 1.8vw, 24px)', color: 'var(--charcoal)', lineHeight: '1.45', fontWeight: '500' }}>MRL Events is a vibrant and rapidly growing entertainment and event management company, founded in 2023 by Mr. Laxaman Patel and Mr. Ramesh Mor.</p><p style={{ marginBottom: '20px' }}>Since its inception, the company has established itself as a trusted name in the industry by curating and executing high-quality musical events across India. With a passion for delivering exceptional live experiences, MRL Events focuses on bringing legendary artists and unforgettable performances to audiences in a grand and memorable way.</p><p style={{ marginBottom: '20px' }}>In a short span, MRL Events has successfully organized iconic shows such as Raags of Rafi by Javed Ali and Aishwarya Majmudar Live in Concert in Mumbai. The company is currently managing a powerful lineup of live concerts, including Kumar Sanu Live in Concert in Ahmedabad and Pune, Salim-Sulaiman Live in Concert in Mumbai, and Sonu Nigam Live in Concert in Chandigarh.</p><p style={{ marginBottom: '35px' }}>With a vision to become a leading force in India's live entertainment space, MRL Events delivers excellence through seamless planning, creative concepts, artist-friendly management, and audience-centric execution. From celebrity concerts and cultural showcases to brand partnerships and corporate events, MRL Events provides comprehensive solutions backed by a talented team and a strong network within the industry. Whether it's managing technical production, ticketing, media outreach, or promotional strategies, MRL Events is committed to delivering experiences that captivate, inspire, and set new benchmarks in the world of live entertainment.</p><div style={{ textAlign: 'center' }}><a href="#contact" className="text-link">Start planning your event <ArrowUpRight /></a></div></div></Reveal></div></div></section>
}

function Services() {
  return (
    <section id="services" className="services section-white">
      <div className="container">
        <Reveal>
          <Eyebrow dark>What we do</Eyebrow>
          <div className="services-head">
            <h2 style={{ color: 'var(--charcoal)' }}>Ideas, <span className="gradient-text">brought to life.</span></h2>
            <p style={{ color: 'var(--charcoal-muted)' }}>From concept to curtain call, we manage every detail required to deliver memorable experiences.</p>
          </div>
        </Reveal>
        <div className="service-grid">
          {services.map(([num, title, desc], i) => (
            <motion.a
              href="#contact"
              className="service-card"
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * .1, duration: .6, ease: [.22, 1, .36, 1] }}
            >
              <span style={{ fontFamily: 'var(--display)', fontSize: '38px', fontWeight: '900', color: 'var(--red)', opacity: 0.15, lineHeight: '1' }}>{num}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
              <div className="s-link"><ArrowRight size={18} /></div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Work() { const works = [['Corporate Event', '/assets/corporate-gala.png', 'work-a'], ['Live Performance', '/assets/live-performance.png', 'work-b'], ['Luxury Celebration', '/assets/luxury-celebration.png', 'work-c']]; return <section id="work" className="work section-beige"><div className="container"><div className="work-top"><Reveal><Eyebrow dark>Selected moments</Eyebrow></Reveal><a href="#contact" className="text-link">View our work <ArrowUpRight /></a></div><div className="work-grid">{works.map(([name, img, cls], i) => <motion.figure className={cls} key={name} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8, delay: i * .1 }}><div className="image-wrap"><motion.img whileHover={{ scale: 1.035 }} transition={{ duration: .7 }} src={img} alt={name} /></div><figcaption><span>0{i + 1}</span>{name}</figcaption></motion.figure>)}</div></div></section> }

function Testimonials() { const [current, setCurrent] = useState(0); const move = (d) => setCurrent((current + d + testimonials.length) % testimonials.length); return <section id="testimonials" className="testimonials section-white"><div className="container"><Reveal><Eyebrow dark>Client voices</Eyebrow><h2>The experience<br /><span>speaks for itself.</span></h2></Reveal><div className="quote-layout"><div className="quote-mark">"</div><AnimatePresence mode="wait"><motion.blockquote key={current} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: .45 }}><p>{testimonials[current].quote}</p><footer><b>{testimonials[current].name}</b><span>{testimonials[current].type}</span></footer></motion.blockquote></AnimatePresence><div className="slider-nav"><button onClick={() => move(-1)} aria-label="Previous testimonial"><ArrowLeft /></button><span>{String(current + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}</span><button onClick={() => move(1)} aria-label="Next testimonial"><ArrowRight /></button></div></div></div></section> }

function CTA() { return <section id="contact" className="cta section-red"><div className="trail trail-a" /><div className="trail trail-b" /><div className="container"><Reveal><Eyebrow light>Start something memorable</Eyebrow><h2>Have an idea?<br /><span>Let's turn it<br />into an experience.</span></h2><p>Tell us what you're planning. We'll help shape the idea, manage the details and create an event worth remembering.</p><Link to="/contact" className="button primary big">Start planning your event <ArrowUpRight /></Link></Reveal></div></section> }

function Footer() { return <footer className="footer"><div className="container"><div className="footer-grid"><div><Logo /><p>Creating remarkable events and experiences from concept to execution.</p></div><div><h4>Explore</h4>{nav.slice(0, 5).map(([n, id]) => <a href={id.startsWith('/#') ? id.substring(1) : id} key={id}>{n}</a>)}</div><div><h4>Contact</h4><a href="tel:+919819866075">+91 98198 66075</a><a href="mailto:mrlevents2023@gmail.com">mrlevents2023@gmail.com</a><span>1/1/18, Lotus CHS Ltd., Bhawani Nagar, Marol, Andheri (E), Mumbai – 400059</span></div><div><h4>Social</h4>{['Instagram', 'Facebook', 'LinkedIn', 'YouTube'].map(n => <a href="#" key={n}>{n}<ArrowUpRight /></a>)}</div></div><div className="footer-bottom"><span>© 2026 MRL Events. All rights reserved.</span><div><a href="#">Privacy Policy</a><a href="#">Terms</a></div></div></div><div className="footer-line" /></footer> }

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import EventsPage from './pages/EventsPage';
import EventDetails from './pages/EventDetails';
import BookingFlow from './pages/BookingFlow';
import BookingSuccess from './pages/BookingSuccess';
import DigitalTicket from './pages/DigitalTicket';
import AboutPage from './pages/AboutPage';
import OurWorkPage from './pages/OurWorkPage';
import ContactPage from './pages/ContactPage';

// Existing Landing Page components
function LandingPage() {
  return (
    <>
      <main>
        <Hero />
        <Services />
        <Work />
        <Testimonials />
        <CTA />
      </main>
    </>
  );
}

// Layout wrapper to conditionally render Navbar
function Layout({ children }) {
  const location = useLocation();
  // We want the transparent auto-hide navbar everywhere, but maybe a solid one on some pages?
  // The existing Navbar component uses fixed positioning and scroll listeners, which is perfect.
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/work" element={<OurWorkPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route path="/book/:eventId" element={<BookingFlow />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/ticket" element={<DigitalTicket />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </BookingProvider>
  );
}
