import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, CreditCard, Smartphone } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { dummyEvents } from './EventsPage';

export default function BookingFlow() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { 
    selectedEvent, setSelectedEvent, 
    selectedTickets, setSelectedTickets, 
    customerDetails, setCustomerDetails,
    totalAmount, setBookingId
  } = useBooking();
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Load event if missing
  useEffect(() => {
    if (!selectedEvent && eventId) {
      const event = dummyEvents.find(e => e.id === eventId);
      if (event) {
        setSelectedEvent(event);
      } else {
        navigate('/events');
      }
    }
  }, [eventId, selectedEvent, setSelectedEvent, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  if (!selectedEvent) return null;

  const handleTicketQuantity = (ticket, change) => {
    const existing = selectedTickets.find(t => t.id === ticket.id);
    let newQuantity = existing ? existing.quantity + change : change;
    
    // Limits
    if (newQuantity < 0) newQuantity = 0;
    if (newQuantity > 6) newQuantity = 6;
    
    let updated;
    if (newQuantity === 0) {
      updated = selectedTickets.filter(t => t.id !== ticket.id);
    } else if (existing) {
      updated = selectedTickets.map(t => t.id === ticket.id ? { ...t, quantity: newQuantity } : t);
    } else {
      updated = [...selectedTickets, { ...ticket, quantity: newQuantity }];
    }
    
    setSelectedTickets(updated);
  };

  const getQuantity = (ticketId) => {
    const t = selectedTickets.find(t => t.id === ticketId);
    return t ? t.quantity : 0;
  };

  const handleDetailsChange = (e) => {
    setCustomerDetails({
      ...customerDetails,
      [e.target.name]: e.target.value
    });
  };

  const isDetailsValid = customerDetails.fullName.trim() !== '' && 
                         customerDetails.email.trim() !== '' && 
                         customerDetails.mobile.trim() !== '';

  const processPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBookingId(`MRL-DEMO-2026-${Math.floor(100 + Math.random() * 900)}`);
      navigate('/booking-success');
    }, 2000);
  };

  const progressSteps = ['TICKETS', 'DETAILS', 'PAYMENT', 'CONFIRMED'];

  const inputStyle = {
    width: '100%', background: 'var(--beige)', border: '1.5px solid var(--border-light)',
    borderRadius: '10px', padding: '14px 18px', fontSize: '14px', color: 'var(--charcoal)',
    outline: 'none', transition: 'border-color 0.25s ease', fontFamily: 'var(--body)',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--beige)', color: 'var(--charcoal)', paddingTop: '110px', paddingBottom: '100px' }}>
      {/* Progress Bar */}
      <div className="container" style={{ marginBottom: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '550px', margin: '0 auto', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '100%', height: '2px', background: 'var(--border-light)', zIndex: 0 }}></div>
          {progressSteps.map((s, i) => {
            const current = i + 1 === step;
            const past = i + 1 < step;
            return (
              <div key={s} style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: 'var(--beige)', padding: '0 8px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: '800', transition: 'all 0.3s ease',
                  background: current ? 'var(--red)' : past ? 'var(--charcoal)' : 'var(--off-white)',
                  color: current || past ? '#fff' : 'var(--charcoal-muted)',
                  border: current ? 'none' : past ? 'none' : '1.5px solid var(--border-medium)',
                  boxShadow: current ? '0 4px 16px rgba(183,25,46,0.3)' : 'none',
                }}>
                  {past ? <CheckCircle2 size={16} /> : i + 1}
                </div>
                <span style={{ fontSize: '9px', letterSpacing: '0.15em', fontWeight: '800', color: current ? 'var(--red)' : past ? 'var(--charcoal)' : 'var(--charcoal-muted)' }}>
                  {s}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '40px' }}>
        
        {/* Main Content Area */}
        <div>
          
          {/* STEP 1: TICKETS */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                  <h2 style={{ fontSize: '28px', fontFamily: 'var(--display)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.01em', marginBottom: '6px' }}>Select Your Experience</h2>
                  <p style={{ color: 'var(--charcoal-muted)', fontSize: '14px' }}>{selectedEvent.title}</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {selectedEvent.tickets.map((ticket) => {
                  const qty = getQuantity(ticket.id);
                  const selected = qty > 0;
                  
                  return (
                    <div 
                      key={ticket.id}
                      style={{
                        position: 'relative', borderRadius: '14px', padding: '28px', transition: 'all 0.3s ease', overflow: 'hidden',
                        background: selected ? 'var(--off-white)' : 'var(--off-white)',
                        border: selected ? '2px solid var(--red)' : '1.5px solid var(--border-light)',
                        boxShadow: selected ? '0 8px 30px rgba(183,25,46,0.08)' : 'none',
                      }}
                    >
                      {selected && (
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--red)', borderRadius: '2px 0 0 2px' }}></div>
                      )}
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <h3 style={{ fontFamily: 'var(--display)', fontSize: '22px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.02em', color: selected ? 'var(--red)' : 'var(--charcoal)' }}>
                              {ticket.name}
                            </h3>
                            <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--red)', fontFamily: 'var(--display)' }}>₹{ticket.price}</span>
                          </div>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {ticket.benefits.map((b, i) => <li key={i} style={{ fontSize: '13px', color: 'var(--charcoal-muted)' }}>• {b}</li>)}
                          </ul>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--beige)', borderRadius: '10px', padding: '6px', border: '1px solid var(--border-light)' }}>
                          <button 
                            onClick={() => handleTicketQuantity(ticket, -1)}
                            disabled={qty === 0}
                            style={{
                              width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontWeight: '700', fontSize: '18px', border: 'none', cursor: qty > 0 ? 'pointer' : 'not-allowed',
                              background: qty > 0 ? 'var(--off-white)' : 'transparent', color: qty > 0 ? 'var(--charcoal)' : 'var(--charcoal-muted)', opacity: qty > 0 ? 1 : 0.3,
                              transition: 'all 0.2s ease',
                            }}
                          >−</button>
                          <span style={{ width: '28px', textAlign: 'center', fontWeight: '800', fontSize: '16px' }}>{qty}</span>
                          <button 
                            onClick={() => handleTicketQuantity(ticket, 1)}
                            disabled={qty >= 6}
                            style={{
                              width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontWeight: '700', fontSize: '18px', border: 'none', cursor: qty < 6 ? 'pointer' : 'not-allowed',
                              background: qty < 6 ? 'var(--off-white)' : 'transparent', color: qty < 6 ? 'var(--charcoal)' : 'var(--charcoal-muted)', opacity: qty < 6 ? 1 : 0.3,
                              transition: 'all 0.2s ease',
                            }}
                          >+</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: DETAILS */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div style={{ marginBottom: '32px' }}>
                <button onClick={() => setStep(1)} style={{ color: 'var(--charcoal-muted)', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <ArrowLeft size={14} /> Back to Tickets
                </button>
                <h2 style={{ fontSize: '28px', fontFamily: 'var(--display)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.01em', marginBottom: '6px' }}>Your Details</h2>
                <p style={{ color: 'var(--charcoal-muted)', fontSize: '14px' }}>Please provide your information for the digital ticket.</p>
              </div>

              <div style={{ background: 'var(--off-white)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '36px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--charcoal-muted)' }}>Full Name *</label>
                    <input type="text" name="fullName" value={customerDetails.fullName} onChange={handleDetailsChange} style={inputStyle} placeholder="John Doe"
                      onFocus={(e) => e.target.style.borderColor = 'var(--red)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--charcoal-muted)' }}>Email Address *</label>
                    <input type="email" name="email" value={customerDetails.email} onChange={handleDetailsChange} style={inputStyle} placeholder="john@example.com"
                      onFocus={(e) => e.target.style.borderColor = 'var(--red)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--charcoal-muted)' }}>Mobile Number *</label>
                    <input type="tel" name="mobile" value={customerDetails.mobile} onChange={handleDetailsChange} style={inputStyle} placeholder="+91 98765 43210"
                      onFocus={(e) => e.target.style.borderColor = 'var(--red)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--charcoal-muted)' }}>City (Optional)</label>
                    <input type="text" name="city" value={customerDetails.city} onChange={handleDetailsChange} style={inputStyle} placeholder="Mumbai"
                      onFocus={(e) => e.target.style.borderColor = 'var(--red)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div style={{ marginBottom: '32px' }}>
                <button onClick={() => setStep(2)} disabled={isProcessing} style={{ color: 'var(--charcoal-muted)', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', background: 'none', border: 'none', cursor: 'pointer', opacity: isProcessing ? 0.5 : 1 }}>
                  <ArrowLeft size={14} /> Back to Details
                </button>
                <h2 style={{ fontSize: '28px', fontFamily: 'var(--display)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.01em', marginBottom: '6px' }}>Complete Your Booking</h2>
                <div style={{ display: 'inline-block', background: 'rgba(183,25,46,0.08)', border: '1px solid rgba(183,25,46,0.2)', color: 'var(--red)', fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '4px 10px', borderRadius: '4px', marginTop: '8px' }}>
                  Demo Mode
                </div>
              </div>

              <div style={{ background: 'var(--off-white)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '36px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid var(--border-light)' }}>
                  <div>
                    <p style={{ fontSize: '13px', color: 'var(--charcoal-muted)', marginBottom: '4px' }}>Amount to pay</p>
                    <h3 style={{ fontSize: '36px', fontFamily: 'var(--display)', fontWeight: '900', color: 'var(--red)', margin: 0 }}>₹{totalAmount}</h3>
                  </div>
                  <ShieldCheck size={36} style={{ color: 'var(--border-light)' }} />
                </div>

                <div style={{ marginBottom: '28px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--charcoal-muted)', display: 'block', marginBottom: '14px' }}>Payment Method</label>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <button 
                      onClick={() => setPaymentMethod('card')}
                      style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '18px', borderRadius: '10px',
                        border: paymentMethod === 'card' ? '2px solid var(--red)' : '1.5px solid var(--border-light)',
                        background: paymentMethod === 'card' ? 'rgba(183,25,46,0.04)' : 'var(--beige)',
                        color: paymentMethod === 'card' ? 'var(--charcoal)' : 'var(--charcoal-muted)',
                        cursor: 'pointer', transition: 'all 0.25s ease',
                      }}
                    >
                      <CreditCard size={22} style={{ color: paymentMethod === 'card' ? 'var(--red)' : 'inherit' }} />
                      <span style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '0.12em' }}>CARD</span>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('upi')}
                      style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '18px', borderRadius: '10px',
                        border: paymentMethod === 'upi' ? '2px solid var(--red)' : '1.5px solid var(--border-light)',
                        background: paymentMethod === 'upi' ? 'rgba(183,25,46,0.04)' : 'var(--beige)',
                        color: paymentMethod === 'upi' ? 'var(--charcoal)' : 'var(--charcoal-muted)',
                        cursor: 'pointer', transition: 'all 0.25s ease',
                      }}
                    >
                      <Smartphone size={22} style={{ color: paymentMethod === 'upi' ? 'var(--red)' : 'inherit' }} />
                      <span style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '0.12em' }}>UPI</span>
                    </button>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                    <input type="text" placeholder="Card Number" style={inputStyle} defaultValue="4111 1111 1111 1111" onFocus={(e) => e.target.style.borderColor = 'var(--red)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <input type="text" placeholder="MM/YY" style={inputStyle} defaultValue="12/28" onFocus={(e) => e.target.style.borderColor = 'var(--red)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'} />
                      <input type="text" placeholder="CVV" style={inputStyle} defaultValue="123" onFocus={(e) => e.target.style.borderColor = 'var(--red)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'} />
                    </div>
                    <input type="text" placeholder="Name on Card" style={inputStyle} defaultValue={customerDetails.fullName} onFocus={(e) => e.target.style.borderColor = 'var(--red)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'} />
                  </motion.div>
                )}

                {paymentMethod === 'upi' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                    <input type="text" placeholder="Enter UPI ID (e.g., name@upi)" style={inputStyle} defaultValue="demo@upi" onFocus={(e) => e.target.style.borderColor = 'var(--red)'} onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'} />
                  </motion.div>
                )}

                <div style={{ background: 'var(--beige)', borderRadius: '10px', padding: '14px', marginBottom: '28px', textAlign: 'center', border: '1px solid var(--border-light)' }}>
                  <p style={{ fontSize: '12px', color: 'var(--charcoal-muted)', margin: 0 }}>No real payment will be processed. This is for demonstration purposes only.</p>
                </div>

                <button 
                  onClick={processPayment}
                  disabled={isProcessing}
                  className="button primary"
                  style={{ width: '100%', padding: '18px', fontSize: '14px', borderRadius: '10px', opacity: isProcessing ? 0.7 : 1, cursor: isProcessing ? 'wait' : 'pointer', position: 'relative', overflow: 'hidden' }}
                >
                  <AnimatePresence mode="wait">
                    {isProcessing ? (
                      <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                        <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
                        PROCESSING PAYMENT...
                      </motion.div>
                    ) : (
                      <motion.div key="pay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        PAY ₹{totalAmount}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </motion.div>
          )}

        </div>

        {/* ORDER SUMMARY (Sticky Sidebar) */}
        <div>
          <div style={{ position: 'sticky', top: '100px', background: 'var(--off-white)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '28px', boxShadow: '0 8px 30px rgba(183,25,46,0.04)' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--charcoal-muted)', marginBottom: '24px' }}>Your Booking</h3>
            
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                <img src={selectedEvent.image} alt={selectedEvent.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h4 style={{ fontWeight: '700', color: 'var(--charcoal)', lineHeight: '1.2', margin: 0, fontSize: '14px' }}>{selectedEvent.title}</h4>
                <p style={{ fontSize: '12px', color: 'var(--charcoal-muted)', marginTop: '4px' }}>{selectedEvent.date}</p>
              </div>
            </div>

            {selectedTickets.length === 0 ? (
              <p style={{ fontSize: '13px', color: 'var(--charcoal-muted)', padding: '16px 0', textAlign: 'center' }}>No tickets selected yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border-light)' }}>
                {selectedTickets.map(t => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: 'var(--charcoal-light)' }}>{t.name} × {t.quantity}</span>
                    <span style={{ color: 'var(--charcoal)', fontWeight: '600' }}>₹{t.price * t.quantity}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--charcoal-muted)' }}>
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--charcoal-muted)' }}>
                <span>Convenience Fee</span>
                <span>₹0</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--charcoal)' }}>Total</span>
              <span style={{ fontSize: '26px', fontFamily: 'var(--display)', fontWeight: '900', color: 'var(--red)' }}>₹{totalAmount}</span>
            </div>

            {step === 1 && (
              <button 
                onClick={() => setStep(2)}
                disabled={totalAmount === 0}
                className="button primary"
                style={{ width: '100%', padding: '16px', borderRadius: '8px', opacity: totalAmount === 0 ? 0.5 : 1, cursor: totalAmount === 0 ? 'not-allowed' : 'pointer' }}
              >
                CONTINUE <ArrowRight />
              </button>
            )}
            
            {step === 2 && (
              <button 
                onClick={() => setStep(3)}
                disabled={!isDetailsValid}
                className="button primary"
                style={{ width: '100%', padding: '16px', borderRadius: '8px', opacity: !isDetailsValid ? 0.5 : 1, cursor: !isDetailsValid ? 'not-allowed' : 'pointer' }}
              >
                CONTINUE TO PAYMENT <ArrowRight />
              </button>
            )}
          </div>
        </div>

      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
