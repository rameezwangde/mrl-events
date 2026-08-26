import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft, ArrowRight, Download, QrCode } from 'lucide-react';

export default function DigitalTicket() {
  const navigate = useNavigate();
  const { selectedEvent, selectedTickets, customerDetails, bookingId } = useBooking();
  
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);

  // Flatten tickets into individual items
  const allTickets = selectedTickets.flatMap(ticket => 
    Array(ticket.quantity).fill({ ...ticket, quantity: 1 })
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!selectedEvent || allTickets.length === 0) {
      navigate('/events');
    }
  }, [selectedEvent, allTickets.length, navigate]);

  if (!selectedEvent || allTickets.length === 0) return null;

  const handleDownload = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const currentTicket = allTickets[currentTicketIndex];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--beige)', padding: '100px 20px 80px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'rgba(183,25,46,0.03)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }}></div>

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 10 }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <button 
            onClick={() => navigate('/booking-success')}
            style={{ color: 'var(--charcoal-muted)', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <ArrowLeft size={14} /> Back
          </button>
          
          <button 
            onClick={handleDownload}
            style={{
              color: 'var(--red)', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em',
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'rgba(183,25,46,0.06)', border: '1px solid rgba(183,25,46,0.15)',
              padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.25s ease',
            }}
          >
            <Download size={14} /> Download
          </button>
        </div>

        {/* Ticket Container */}
        <div style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTicketIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', boxShadow: '0 20px 60px rgba(29,29,29,0.12)' }}
            >
              
              {/* Top Half: Event Details */}
              <div style={{ background: 'var(--off-white)', borderRadius: '18px 18px 0 0', border: '1px solid var(--border-light)', borderBottom: 'none', overflow: 'hidden', position: 'relative' }}>
                
                {/* Brand Header */}
                <div style={{ background: 'var(--red)', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src="/assets/mrl-logo.png" alt="MRL Events" style={{ height: '28px', width: 'auto', filter: 'brightness(10)' }} />
                  </div>
                  <div style={{ fontSize: '9px', fontWeight: '800', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>DIGITAL PASS</div>
                </div>

                {/* Event Image */}
                <div style={{ height: '160px', position: 'relative' }}>
                  <img src={selectedEvent.image} alt={selectedEvent.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, var(--off-white) 0%, transparent 60%)' }}></div>
                  
                  {/* Category Badge */}
                  <div style={{ position: 'absolute', bottom: '14px', right: '14px', background: 'var(--charcoal)', color: 'var(--off-white)', fontFamily: 'var(--display)', fontWeight: '800', letterSpacing: '0.08em', padding: '6px 14px', fontSize: '16px', borderRadius: '6px' }}>
                    {currentTicket.name}
                  </div>
                </div>

                <div style={{ padding: '20px 28px 28px' }}>
                  <h2 style={{ fontFamily: 'var(--display)', fontSize: '28px', fontWeight: '900', textTransform: 'uppercase', lineHeight: '1', marginBottom: '20px', color: 'var(--charcoal)', letterSpacing: '-0.01em' }}>{selectedEvent.title}</h2>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 16px' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--charcoal-muted)', marginBottom: '3px' }}>Date</span>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--charcoal)', textTransform: 'uppercase' }}>{selectedEvent.date}</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--charcoal-muted)', marginBottom: '3px' }}>Time</span>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--charcoal)', textTransform: 'uppercase' }}>{selectedEvent.time}</span>
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <span style={{ display: 'block', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--charcoal-muted)', marginBottom: '3px' }}>Venue</span>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--charcoal)', textTransform: 'uppercase' }}>{selectedEvent.venue}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Perforation Line */}
              <div style={{ display: 'flex', background: 'var(--off-white)', alignItems: 'center', padding: '0 4px' }}>
                <div style={{ width: '16px', height: '32px', background: 'var(--beige)', borderRadius: '0 16px 16px 0', marginLeft: '-4px' }}></div>
                <div style={{ flex: 1, height: '2px', borderBottom: '2px dashed var(--border-medium)' }}></div>
                <div style={{ width: '16px', height: '32px', background: 'var(--beige)', borderRadius: '16px 0 0 16px', marginRight: '-4px' }}></div>
              </div>

              {/* Bottom Half: Attendee & QR */}
              <div style={{ background: 'var(--off-white)', borderRadius: '0 0 18px 18px', border: '1px solid var(--border-light)', borderTop: 'none', padding: '24px 28px 28px', position: 'relative', overflow: 'hidden' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--charcoal-muted)', marginBottom: '3px' }}>Attendee</span>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--charcoal)', textTransform: 'uppercase' }}>{customerDetails.fullName || 'Guest User'}</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--charcoal-muted)', marginBottom: '3px' }}>Booking ID</span>
                      <span style={{ fontSize: '12px', fontFamily: 'monospace', color: 'var(--charcoal-light)' }}>{bookingId}</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--charcoal-muted)', marginBottom: '3px' }}>Ticket</span>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--charcoal)' }}>{currentTicketIndex + 1} OF {allTickets.length}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '88px', height: '88px', background: '#fff', padding: '8px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-light)' }}>
                      <div style={{ width: '100%', height: '100%', border: '3px solid var(--charcoal)', padding: '4px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '12px', height: '12px', background: 'var(--charcoal)' }}></div>
                        <div style={{ position: 'absolute', top: 0, right: 0, width: '12px', height: '12px', background: 'var(--charcoal)' }}></div>
                        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '12px', height: '12px', background: 'var(--charcoal)' }}></div>
                        <QrCode size={36} style={{ color: 'var(--charcoal)' }} strokeWidth={1} />
                      </div>
                    </div>
                    <span style={{ fontSize: '7px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--charcoal-muted)', marginTop: '8px', fontWeight: '700' }}>Scan at entry</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation for multiple tickets */}
        {allTickets.length > 1 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px' }}>
            <button 
              onClick={() => setCurrentTicketIndex(Math.max(0, currentTicketIndex - 1))}
              disabled={currentTicketIndex === 0}
              style={{ color: 'var(--charcoal-muted)', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', opacity: currentTicketIndex === 0 ? 0.3 : 1, transition: 'opacity 0.25s' }}
            >
              <ArrowLeft size={14} /> Previous
            </button>
            <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--charcoal)', letterSpacing: '0.1em' }}>
              TICKET {currentTicketIndex + 1} OF {allTickets.length}
            </span>
            <button 
              onClick={() => setCurrentTicketIndex(Math.min(allTickets.length - 1, currentTicketIndex + 1))}
              disabled={currentTicketIndex === allTickets.length - 1}
              style={{ color: 'var(--charcoal-muted)', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', opacity: currentTicketIndex === allTickets.length - 1 ? 0.3 : 1, transition: 'opacity 0.25s' }}
            >
              Next <ArrowRight size={14} />
            </button>
          </div>
        )}

      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            style={{
              position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
              background: 'var(--charcoal)', color: 'var(--off-white)',
              padding: '14px 24px', borderRadius: '10px', fontSize: '13px', fontWeight: '600',
              boxShadow: '0 10px 30px rgba(29,29,29,0.2)', zIndex: 50, whiteSpace: 'nowrap',
            }}
          >
            Ticket download will be enabled in the production version.
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
