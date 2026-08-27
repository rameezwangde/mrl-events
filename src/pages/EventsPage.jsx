import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Calendar, MapPin, Clock } from 'lucide-react';

export const dummyEvents = [
  {
    id: 'mrl-live-2026',
    title: 'MRL LIVE EXPERIENCE',
    date: '28 September 2026',
    time: '7:00 PM',
    venue: 'Grand Arena, Mumbai',
    price: 999,
    image: '/assets/live-performance.png',
    sellingFast: true,
    description: 'Experience an unforgettable night of music, lights, and energy. MRL Live Experience brings together top artists for a spectacular showcase of talent and production value.',
    about: 'Join us for the most anticipated live music event of the year. Featuring a carefully curated lineup of performers, state-of-the-art sound systems, and a visual spectacle that will leave you breathless.',
    information: ['Gates open at 5:00 PM', 'All ages welcome', 'Food and beverages available inside'],
    tickets: [
      { id: 'standard', name: 'STANDARD', price: 999, benefits: ['General Admission', 'Standard Entry'], available: true },
      { id: 'vip', name: 'VIP', price: 1999, benefits: ['Priority Entry', 'Premium Viewing Area', 'VIP Access'], available: true },
      { id: 'vvip', name: 'VVIP', price: 3499, benefits: ['Priority Entry', 'Best Viewing Area', 'Exclusive Access', 'Premium Experience'], available: true },
    ]
  },
  {
    id: 'corp-exp-2026',
    title: 'CORPORATE EXPERIENCE NIGHT',
    date: '12 October 2026',
    time: '6:30 PM',
    venue: 'Convention Centre, Mumbai',
    price: 1499,
    image: '/assets/corporate-gala.png',
    sellingFast: false,
    description: 'A premium networking and entertainment event designed exclusively for corporate professionals and industry leaders.',
    about: 'Connect with peers, enjoy premium entertainment, and experience MRL Events\' signature corporate hospitality in an elegant setting.',
    information: ['Formal attire required', 'Business card exchange session', 'Gourmet dinner included'],
    tickets: [
      { id: 'standard', name: 'STANDARD', price: 1499, benefits: ['Event Access', 'Dinner included'], available: true },
      { id: 'vip', name: 'VIP', price: 2999, benefits: ['Priority Entry', 'Reserved Seating', 'Premium Drinks'], available: true },
      { id: 'vvip', name: 'VVIP', price: 4999, benefits: ['Exclusive Lounge', 'Speaker Meet & Greet', 'Dedicated Concierge'], available: true },
    ]
  },
  {
    id: 'grand-stage-2026',
    title: 'THE GRAND STAGE',
    date: '24 October 2026',
    time: '7:30 PM',
    venue: 'Premium Arena, Mumbai',
    price: 799,
    image: '/assets/luxury-celebration.png',
    sellingFast: true,
    description: 'A theatrical and musical masterpiece featuring stunning performances, intricate set designs, and a captivating story.',
    about: 'Step into a world of wonder. The Grand Stage is a multi-sensory journey combining live music, acrobatics, and visual arts.',
    information: ['Doors close 15 mins before showtime', 'Photography prohibited during performance', 'Merchandise available'],
    tickets: [
      { id: 'standard', name: 'STANDARD', price: 799, benefits: ['Balcony Seating', 'Standard Entry'], available: true },
      { id: 'vip', name: 'VIP', price: 1599, benefits: ['Lower Tier Seating', 'Dedicated Entry'], available: true },
      { id: 'vvip', name: 'VVIP', price: 2499, benefits: ['Front Row Access', 'Backstage Tour', 'Artist Interaction'], available: true },
    ]
  }
];

export default function EventsPage() {
  const navigate = useNavigate();
  const featured = dummyEvents[0];
  const others = dummyEvents.slice(1);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--beige)' }}>
      
      {/* HERO SECTION */}
      <div style={{ position: 'relative', paddingTop: '180px', paddingBottom: '100px', background: 'var(--charcoal)', color: '#fff', overflow: 'hidden', marginBottom: '60px' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img 
            src="/assets/events_hero.jpg" 
            alt="Events Background" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, mixBlendMode: 'luminosity' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, var(--charcoal) 0%, transparent 40%, rgba(29,29,29,0.6) 100%)' }}></div>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="eyebrow eyebrow-light" style={{ marginBottom: '20px' }}><span></span>Upcoming Events</div>
            <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(48px, 7vw, 100px)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: '0.9', margin: 0, marginBottom: '20px' }}>
              Experience <span style={{ color: 'var(--red)' }}>The Magic</span>
            </h1>
            <p style={{ opacity: 0.9, maxWidth: '500px', fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: '1.5', margin: 0 }}>
              Discover our upcoming premium events and book your tickets now.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        {/* Featured Event — Large Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate(`/events/${featured.id}`)}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            background: 'var(--off-white)',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid var(--border-light)',
            cursor: 'pointer',
            marginBottom: '40px',
            transition: 'box-shadow 0.4s ease, transform 0.4s ease',
          }}
          whileHover={{ y: -4, boxShadow: '0 20px 50px rgba(183, 25, 46, 0.08)' }}
        >
          <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
            <motion.img 
              src={featured.image} alt={featured.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.7 }}
            />
            {featured.sellingFast && (
              <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'var(--red)', color: '#fff', fontSize: '10px', fontWeight: '800', padding: '6px 14px', borderRadius: '4px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Selling Fast
              </div>
            )}
          </div>
          <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--red)', marginBottom: '16px' }}>Featured Event</div>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(32px, 3vw, 48px)', fontWeight: '900', textTransform: 'uppercase', lineHeight: '0.95', color: 'var(--charcoal)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
              {featured.title}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--charcoal-muted)', fontSize: '14px' }}>
                <Calendar size={16} style={{ color: 'var(--red)' }} />
                <span>{featured.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--charcoal-muted)', fontSize: '14px' }}>
                <Clock size={16} style={{ color: 'var(--red)', opacity: 0.7 }} />
                <span>{featured.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--charcoal-muted)', fontSize: '14px' }}>
                <MapPin size={16} style={{ color: 'var(--red)', opacity: 0.5 }} />
                <span>{featured.venue}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '24px' }}>
              <div>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--charcoal-muted)', display: 'block', marginBottom: '4px' }}>Tickets From</span>
                <span style={{ fontSize: '28px', fontFamily: 'var(--display)', fontWeight: '800', color: 'var(--charcoal)' }}>₹{featured.price}</span>
              </div>
              <button 
                className="button primary"
                onClick={(e) => { e.stopPropagation(); navigate(`/events/${featured.id}`); }}
              >
                View Event <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Other Events — Smaller Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '28px' }}>
          {others.map((event, i) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              onClick={() => navigate(`/events/${event.id}`)}
              style={{
                background: 'var(--off-white)',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid var(--border-light)',
                cursor: 'pointer',
                transition: 'box-shadow 0.4s ease, transform 0.4s ease',
              }}
              whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(183, 25, 46, 0.06)' }}
            >
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <motion.img 
                  src={event.image} alt={event.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.7 }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(29,29,29,0.3) 0%, transparent 50%)' }}></div>
                {event.sellingFast && (
                  <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'var(--red)', color: '#fff', fontSize: '9px', fontWeight: '800', padding: '5px 12px', borderRadius: '4px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Selling Fast
                  </div>
                )}
              </div>
              
              <div style={{ padding: '28px' }}>
                <h3 style={{ fontFamily: 'var(--display)', fontSize: '26px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '16px', color: 'var(--charcoal)', lineHeight: '1', letterSpacing: '-0.01em' }}>
                  {event.title}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--charcoal-muted)', fontSize: '13px' }}>
                    <Calendar size={14} style={{ color: 'var(--red)' }} />
                    <span>{event.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--charcoal-muted)', fontSize: '13px' }}>
                    <Clock size={14} style={{ color: 'var(--red)', opacity: 0.7 }} />
                    <span>{event.time}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--charcoal-muted)', fontSize: '13px' }}>
                    <MapPin size={14} style={{ color: 'var(--red)', opacity: 0.5 }} />
                    <span>{event.venue}</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
                  <div>
                    <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--charcoal-muted)', display: 'block', marginBottom: '3px' }}>Tickets From</span>
                    <span style={{ fontSize: '22px', fontFamily: 'var(--display)', fontWeight: '800', color: 'var(--charcoal)' }}>₹{event.price}</span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigate(`/events/${event.id}`); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      background: 'transparent', border: '1.5px solid var(--border-medium)',
                      padding: '10px 20px', fontSize: '11px', fontWeight: '700',
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                      borderRadius: '6px', color: 'var(--charcoal)',
                      cursor: 'pointer', transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border-medium)'; e.currentTarget.style.color = 'var(--charcoal)'; }}
                  >
                    View Event <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
