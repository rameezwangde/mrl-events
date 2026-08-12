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

  return (
    <div className="min-h-screen bg-[var(--dark)] text-[var(--beige)] pt-[100px] pb-24">
      {/* Progress Bar */}
      <div className="container mb-12">
        <div className="flex justify-between items-center max-w-3xl mx-auto relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-[var(--beige)]/10 z-0"></div>
          {progressSteps.map((s, i) => {
            const current = i + 1 === step;
            const past = i + 1 < step;
            return (
              <div key={s} className="relative z-10 flex flex-col items-center gap-2 bg-[var(--dark)] px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  current ? 'bg-[var(--red)] text-white shadow-[0_0_15px_rgba(198,40,40,0.5)]' : 
                  past ? 'bg-[var(--terracotta)] text-white' : 'bg-[#2a1f1a] text-[#7a6a5e]'
                }`}>
                  {past ? <CheckCircle2 size={16} /> : i + 1}
                </div>
                <span className={`text-[10px] tracking-widest font-bold ${current ? 'text-[var(--red)]' : past ? 'text-[var(--beige)]' : 'text-[#7a6a5e]'}`}>
                  {s}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          
          {/* STEP 1: TICKETS */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-[var(--display)] uppercase tracking-wider mb-2">Select Your Experience</h2>
                  <p className="text-[#aaaabd] text-sm">{selectedEvent.title}</p>
                </div>
              </div>

              <div className="space-y-4">
                {selectedEvent.tickets.map((ticket) => {
                  const qty = getQuantity(ticket.id);
                  const selected = qty > 0;
                  
                  return (
                    <div 
                      key={ticket.id}
                      className={`relative border rounded-xl p-6 transition-all duration-300 overflow-hidden ${
                        selected 
                        ? 'bg-[rgba(198,40,40,0.05)] border-[var(--red)] shadow-[0_0_30px_rgba(198,40,40,0.15)]' 
                        : 'bg-[var(--dark2)] border-[var(--beige)]/10 hover:border-[var(--beige)]/30'
                      }`}
                    >
                      {/* Neon glow effect for selected */}
                      {selected && (
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[var(--red)] to-[var(--wine)]"></div>
                      )}
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className={`font-[var(--display)] text-2xl uppercase tracking-wider ${selected ? 'text-white' : 'text-[#d8d7e2]'}`}>
                              {ticket.name}
                            </h3>
                            <span className="text-xl font-bold text-[var(--red)]">₹{ticket.price}</span>
                          </div>
                          <ul className="text-sm text-[#878897] space-y-1 mb-4 sm:mb-0">
                            {ticket.benefits.map((b, i) => <li key={i}>• {b}</li>)}
                          </ul>
                        </div>
                        
                        <div className="flex items-center gap-4 bg-[#2a1f1a] rounded-lg p-2 border border-[var(--beige)]/5">
                          <button 
                            onClick={() => handleTicketQuantity(ticket, -1)}
                            disabled={qty === 0}
                            className={`w-10 h-10 rounded flex items-center justify-center font-bold text-lg transition-colors ${
                              qty > 0 ? 'bg-[var(--beige)]/10 hover:bg-[var(--beige)]/20 text-[var(--beige)]' : 'text-[var(--beige)]/20 cursor-not-allowed'
                            }`}
                          >
                            −
                          </button>
                          <span className="w-6 text-center font-bold">{qty}</span>
                          <button 
                            onClick={() => handleTicketQuantity(ticket, 1)}
                            disabled={qty >= 6}
                            className={`w-10 h-10 rounded flex items-center justify-center font-bold text-lg transition-colors ${
                              qty < 6 ? 'bg-[var(--beige)]/10 hover:bg-[var(--beige)]/20 text-[var(--beige)]' : 'text-[var(--beige)]/20 cursor-not-allowed'
                            }`}
                          >
                            +
                          </button>
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
              <div className="mb-8">
                <button onClick={() => setStep(1)} className="text-[#878897] hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-6">
                  <ArrowLeft size={14} /> Back to Tickets
                </button>
                <h2 className="text-3xl font-[var(--display)] uppercase tracking-wider mb-2">Your Details</h2>
                <p className="text-[#aaaabd] text-sm">Please provide your information for the digital ticket.</p>
              </div>

              <div className="bg-[var(--dark2)] border border-[var(--beige)]/10 rounded-xl p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#878897]">Full Name *</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={customerDetails.fullName}
                      onChange={handleDetailsChange}
                      className="w-full bg-[#2a1f1a] border border-[var(--beige)]/10 rounded-lg px-4 py-3 text-[var(--beige)] focus:outline-none focus:border-[var(--red)] transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#878897]">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={customerDetails.email}
                      onChange={handleDetailsChange}
                      className="w-full bg-[#2a1f1a] border border-[var(--beige)]/10 rounded-lg px-4 py-3 text-[var(--beige)] focus:outline-none focus:border-[var(--red)] transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#878897]">Mobile Number *</label>
                    <input 
                      type="tel" 
                      name="mobile"
                      value={customerDetails.mobile}
                      onChange={handleDetailsChange}
                      className="w-full bg-[#2a1f1a] border border-[var(--beige)]/10 rounded-lg px-4 py-3 text-[var(--beige)] focus:outline-none focus:border-[var(--red)] transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#878897]">City (Optional)</label>
                    <input 
                      type="text" 
                      name="city"
                      value={customerDetails.city}
                      onChange={handleDetailsChange}
                      className="w-full bg-[#2a1f1a] border border-[var(--beige)]/10 rounded-lg px-4 py-3 text-[var(--beige)] focus:outline-none focus:border-[var(--red)] transition-colors"
                      placeholder="Mumbai"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="mb-8">
                <button onClick={() => setStep(2)} disabled={isProcessing} className="text-[#878897] hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-6 disabled:opacity-50">
                  <ArrowLeft size={14} /> Back to Details
                </button>
                <h2 className="text-3xl font-[var(--display)] uppercase tracking-wider mb-2">Complete Your Booking</h2>
                <div className="inline-block bg-[var(--terracotta)]/20 border border-[var(--terracotta)]/40 text-[var(--terracotta)] text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded mt-2">
                  Demo Mode
                </div>
              </div>

              <div className="bg-[var(--dark2)] border border-[var(--beige)]/10 rounded-xl p-8">
                <div className="flex justify-between items-center mb-8 pb-8 border-b border-[var(--beige)]/10">
                  <div>
                    <p className="text-sm text-[#878897] mb-1">Amount to pay</p>
                    <h3 className="text-4xl font-[var(--display)] text-[var(--red)]">₹{totalAmount}</h3>
                  </div>
                  <ShieldCheck size={40} className="text-[#2a1f1a]" />
                </div>

                <div className="space-y-4 mb-8">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#878897] block mb-4">Payment Method</label>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setPaymentMethod('card')}
                      className={`flex flex-col items-center gap-3 p-4 rounded-lg border transition-all ${
                        paymentMethod === 'card' 
                        ? 'bg-[var(--red)]/10 border-[var(--red)] text-[var(--beige)]' 
                        : 'bg-[#2a1f1a] border-[var(--beige)]/10 text-[#7a6a5e] hover:border-[var(--beige)]/30 hover:text-[var(--beige)]'
                      }`}
                    >
                      <CreditCard size={24} className={paymentMethod === 'card' ? 'text-[var(--red)]' : ''} />
                      <span className="text-xs font-bold tracking-widest">CARD</span>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('upi')}
                      className={`flex flex-col items-center gap-3 p-4 rounded-lg border transition-all ${
                        paymentMethod === 'upi' 
                        ? 'bg-[var(--red)]/10 border-[var(--red)] text-[var(--beige)]' 
                        : 'bg-[#2a1f1a] border-[var(--beige)]/10 text-[#7a6a5e] hover:border-[var(--beige)]/30 hover:text-[var(--beige)]'
                      }`}
                    >
                      <Smartphone size={24} className={paymentMethod === 'upi' ? 'text-[var(--red)]' : ''} />
                      <span className="text-xs font-bold tracking-widest">UPI</span>
                    </button>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 mb-8">
                    <input type="text" placeholder="Card Number" className="w-full bg-[#2a1f1a] border border-[var(--beige)]/10 rounded-lg px-4 py-3 text-[var(--beige)] focus:outline-none focus:border-[var(--red)]" defaultValue="4111 1111 1111 1111" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM/YY" className="w-full bg-[#2a1f1a] border border-[var(--beige)]/10 rounded-lg px-4 py-3 text-[var(--beige)] focus:outline-none focus:border-[var(--red)]" defaultValue="12/28" />
                      <input type="text" placeholder="CVV" className="w-full bg-[#2a1f1a] border border-[var(--beige)]/10 rounded-lg px-4 py-3 text-[var(--beige)] focus:outline-none focus:border-[var(--red)]" defaultValue="123" />
                    </div>
                    <input type="text" placeholder="Name on Card" className="w-full bg-[#2a1f1a] border border-[var(--beige)]/10 rounded-lg px-4 py-3 text-[var(--beige)] focus:outline-none focus:border-[var(--red)]" defaultValue={customerDetails.fullName} />
                  </motion.div>
                )}

                {paymentMethod === 'upi' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 mb-8">
                    <input type="text" placeholder="Enter UPI ID (e.g., name@upi)" className="w-full bg-[#2a1f1a] border border-[var(--beige)]/10 rounded-lg px-4 py-3 text-[var(--beige)] focus:outline-none focus:border-[var(--red)]" defaultValue="demo@upi" />
                  </motion.div>
                )}

                <div className="bg-[#2a1f1a] rounded-lg p-4 mb-8 text-center border border-[var(--beige)]/5">
                  <p className="text-xs text-[#878897]">No real payment will be processed. This is for demonstration purposes only.</p>
                </div>

                <button 
                  onClick={processPayment}
                  disabled={isProcessing}
                  className="w-full button primary py-4 shadow-[0_0_20px_rgba(198,40,40,0.3)] disabled:opacity-70 disabled:cursor-wait relative overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {isProcessing ? (
                      <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-3">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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
        <div className="lg:col-span-1">
          <div className="sticky top-[120px] bg-[var(--dark2)] border border-[var(--beige)]/10 rounded-xl p-6 shadow-2xl">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#878897] mb-6">Your Booking</h3>
            
            <div className="flex gap-4 items-center mb-6 pb-6 border-b border-white/10">
              <div className="w-16 h-16 rounded overflow-hidden shrink-0 border border-[var(--beige)]/20">
                <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-white leading-tight">{selectedEvent.title}</h4>
                <p className="text-xs text-[#878897] mt-1">{selectedEvent.date}</p>
              </div>
            </div>

            {selectedTickets.length === 0 ? (
              <p className="text-sm text-[#878897] py-4 text-center">No tickets selected yet.</p>
            ) : (
              <div className="space-y-4 mb-6 pb-6 border-b border-[var(--beige)]/10">
                {selectedTickets.map(t => (
                  <div key={t.id} className="flex justify-between text-sm">
                    <span className="text-[#d8d7e2]">{t.name} × {t.quantity}</span>
                    <span className="text-white">₹{t.price * t.quantity}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm text-[#878897]">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between text-sm text-[#878897]">
                <span>Convenience Fee</span>
                <span>₹0</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8 pt-4 border-t border-[var(--beige)]/10">
              <span className="text-sm font-bold uppercase tracking-widest text-[var(--beige)]">Total</span>
              <span className="text-2xl font-[var(--display)] text-[var(--red)]">₹{totalAmount}</span>
            </div>

            {step === 1 && (
              <button 
                onClick={() => setStep(2)}
                disabled={totalAmount === 0}
                className="w-full button primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                CONTINUE <ArrowRight />
              </button>
            )}
            
            {step === 2 && (
              <button 
                onClick={() => setStep(3)}
                disabled={!isDetailsValid}
                className="w-full button primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                CONTINUE TO PAYMENT <ArrowRight />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
