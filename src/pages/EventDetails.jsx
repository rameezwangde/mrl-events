import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, MapPin, Clock, Info, CheckCircle2 } from 'lucide-react';
import { dummyEvents } from './EventsPage';
import { useBooking } from '../context/BookingContext';

export default function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { setSelectedEvent } = useBooking();
  
  const event = dummyEvents.find(e => e.id === eventId);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [eventId]);

  if (!event) {
    return (
      <div style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh', textAlign: 'center', background: 'var(--beige)' }}>
        <h2 style={{ fontSize: '32px', color: 'var(--charcoal)' }}>Event not found</h2>
        <Link to="/events" style={{ color: 'var(--red)', marginTop: '16px', display: 'inline-block' }}>Back to Events</Link>
      </div>
    );
  }

  const handleBookClick = () => {
    setSelectedEvent(event);
    navigate(`/book/${event.id}`);
  };

  return (
    <div style={{ background: 'var(--beige)', color: 'var(--charcoal)', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Hero Section */}
      <div style={{ position: 'relative', height: '60vh', minHeight: '480px', width: '100%' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, var(--beige) 0%, rgba(242,232,220,0.4) 40%, rgba(29,29,29,0.3) 100%)' }}></div>
        </div>
        
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', paddingBottom: '50px' }}>
          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            <Link to="/events" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.8)', fontSize: '12px', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', transition: 'color 0.25s' }}>
              <ArrowLeft size={16} /> Back to Events
            </Link>
            
            {event.sellingFast && (
              <div style={{ marginBottom: '16px', display: 'inline-block', background: 'var(--red)', color: '#fff', fontSize: '10px', fontWeight: '800', padding: '6px 16px', borderRadius: '4px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                TICKETS SELLING FAST
              </div>
            )}
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontFamily: 'var(--display)', fontSize: 'clamp(42px, 7vw, 100px)', fontWeight: '900', textTransform: 'uppercase', lineHeight: '0.9', letterSpacing: '-0.02em', marginBottom: '24px', color: '#fff', textShadow: '0 4px 30px rgba(0,0,0,0.3)' }}
            >
              {event.title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '24px', color: 'rgba(255,255,255,0.9)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '600' }}>
                <Calendar size={16} />
                <span>{event.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '600' }}>
                <Clock size={16} />
                <span>{event.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '600' }}>
                <MapPin size={16} />
                <span>{event.venue}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container" style={{ marginTop: '50px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '50px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '24px', fontFamily: 'var(--display)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.02em', color: 'var(--charcoal)', marginBottom: '20px', paddingBottom: '16px', borderBottom: '2px solid var(--border-light)' }}>About The Event</h2>
            <p style={{ fontSize: '16px', color: 'var(--charcoal-muted)', lineHeight: '1.75' }}>{event.about}</p>
            <p style={{ fontSize: '16px', color: 'var(--charcoal-muted)', lineHeight: '1.75', marginTop: '16px' }}>{event.description}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '24px', fontFamily: 'var(--display)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.02em', color: 'var(--charcoal)', marginBottom: '20px', paddingBottom: '16px', borderBottom: '2px solid var(--border-light)' }}>Event Information</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {event.information.map((info, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--charcoal-muted)', fontSize: '15px' }}>
                  <CheckCircle2 style={{ color: 'var(--red)', flexShrink: 0, marginTop: '2px' }} size={18} />
                  <span>{info}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Sidebar / Sticky Booking panel */}
        <div style={{ position: 'relative' }}>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              position: 'sticky', top: '100px',
              background: 'var(--off-white)', border: '1px solid var(--border-light)',
              borderRadius: '16px', padding: '32px',
              boxShadow: '0 10px 40px rgba(183, 25, 46, 0.06)',
            }}
          >
            <h3 style={{ fontSize: '20px', fontFamily: 'var(--display)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '24px', color: 'var(--charcoal)' }}>Ticket Prices</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '28px' }}>
              {event.tickets.map(ticket => (
                <div key={ticket.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <div>
                    <span style={{ display: 'block', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '13px', marginBottom: '2px', color: 'var(--charcoal)' }}>{ticket.name}</span>
                    <span style={{ fontSize: '11px', color: 'var(--charcoal-muted)' }}>From ₹{ticket.price}</span>
                  </div>
                  <div style={{ color: 'var(--red)', fontWeight: '800', fontFamily: 'var(--display)', fontSize: '20px' }}>
                    ₹{ticket.price}
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={handleBookClick}
              className="button primary"
              style={{ width: '100%', padding: '16px', fontSize: '13px', borderRadius: '8px' }}
            >
              Book Tickets <ArrowRight />
            </button>
            
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: 'var(--charcoal-muted)', background: 'var(--beige)', padding: '12px', borderRadius: '8px' }}>
              <Info size={16} style={{ flexShrink: 0, color: 'var(--red)', opacity: 0.6 }} />
              <p style={{ margin: 0 }}>For demo purposes only. No real transactions will occur.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
