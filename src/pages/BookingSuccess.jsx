import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function BookingSuccess() {
  const navigate = useNavigate();
  const { selectedEvent, selectedTickets, totalAmount, bookingId } = useBooking();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Redirect if accessed directly without booking
    if (!selectedEvent || !bookingId) {
      navigate('/events');
    }
  }, [selectedEvent, bookingId, navigate]);

  if (!selectedEvent || !bookingId) return null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--beige)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 20px 80px', position: 'relative', overflow: 'hidden' }}>
      {/* Background accent */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', height: '500px', background: 'rgba(183,25,46,0.04)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }}></div>
      
      <div className="container" style={{ maxWidth: '600px', position: 'relative', zIndex: 10 }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'var(--off-white)', border: '1px solid var(--border-light)',
            borderRadius: '20px', padding: '48px', textAlign: 'center', position: 'relative', overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(183,25,46,0.06)',
          }}
        >
          {/* Red accent line top */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: 'var(--red)' }}></div>

          {/* Animated Checkmark */}
          <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(183,25,46,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--red)' }}
            >
              <svg style={{ width: '40px', height: '40px', color: 'var(--red)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="3" 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </motion.div>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ fontFamily: 'var(--display)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: '900', textTransform: 'uppercase', marginBottom: '12px', color: 'var(--charcoal)', letterSpacing: '-0.02em' }}
          >
            You're In!
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ color: 'var(--charcoal-muted)', fontSize: '16px', marginBottom: '36px', maxWidth: '400px', margin: '0 auto 36px', lineHeight: '1.6' }}
          >
            Your booking for <span style={{ color: 'var(--charcoal)', fontWeight: '700' }}>{selectedEvent.title}</span> has been confirmed.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ background: 'var(--beige)', border: '1px solid var(--border-light)', borderRadius: '14px', padding: '24px', textAlign: 'left', marginBottom: '36px' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 20px', fontSize: '14px' }}>
              <div>
                <span style={{ display: 'block', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--charcoal-muted)', marginBottom: '4px' }}>Booking ID</span>
                <span style={{ fontWeight: '700', color: 'var(--red)' }}>{bookingId}</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--charcoal-muted)', marginBottom: '4px' }}>Date & Time</span>
                <span style={{ color: 'var(--charcoal)' }}>{selectedEvent.date}, {selectedEvent.time}</span>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <span style={{ display: 'block', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--charcoal-muted)', marginBottom: '4px' }}>Venue</span>
                <span style={{ color: 'var(--charcoal)' }}>{selectedEvent.venue}</span>
              </div>
              <div style={{ gridColumn: 'span 2', padding: '14px 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', margin: '4px 0' }}>
                <span style={{ display: 'block', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--charcoal-muted)', marginBottom: '8px' }}>Tickets</span>
                {selectedTickets.map(t => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--charcoal)', fontWeight: '600', marginBottom: '4px' }}>
                    <span>{t.name}</span>
                    <span>× {t.quantity}</span>
                  </div>
                ))}
              </div>
              <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--charcoal-muted)' }}>Total Paid</span>
                <span style={{ fontSize: '24px', fontFamily: 'var(--display)', fontWeight: '900', color: 'var(--charcoal)' }}>₹{totalAmount}</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}
          >
            <button 
              onClick={() => navigate('/ticket')}
              className="button primary"
              style={{ width: '100%', padding: '16px', borderRadius: '10px', fontSize: '13px' }}
            >
              VIEW MY TICKET <ArrowRight />
            </button>
            <button 
              onClick={() => navigate('/events')}
              className="button secondary"
              style={{ width: '100%', padding: '16px', borderRadius: '10px', fontSize: '13px' }}
            >
              <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Back to Events
            </button>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
