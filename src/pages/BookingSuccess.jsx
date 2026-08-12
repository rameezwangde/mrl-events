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
    <div className="min-h-screen bg-[var(--dark)] flex items-center justify-center py-24 pt-[120px] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--red)]/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container max-w-2xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[var(--dark2)] border border-[var(--red)]/30 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(198,40,40,0.15)] text-center relative overflow-hidden"
        >
          {/* Neon line top */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--red)] to-[var(--wine)]"></div>

          {/* Animated Checkmark */}
          <div className="mb-8 flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              className="w-24 h-24 rounded-full bg-[var(--red)]/20 flex items-center justify-center border-2 border-[var(--red)] relative"
            >
              <div className="absolute inset-0 rounded-full animate-ping bg-[var(--red)]/20"></div>
              <svg className="w-12 h-12 text-[var(--red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            className="font-[var(--display)] text-5xl md:text-7xl uppercase mb-4 text-white"
          >
            You're In!
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[#aaaabd] text-lg mb-10 max-w-md mx-auto"
          >
            Your booking for <span className="text-white font-bold">{selectedEvent.title}</span> has been confirmed.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#1a1210] border border-[var(--beige)]/5 rounded-xl p-6 text-left mb-10"
          >
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-[#777991] mb-1">Booking ID</span>
                <span className="font-bold text-[var(--red)]">{bookingId}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-[#777991] mb-1">Date & Time</span>
                <span className="text-white">{selectedEvent.date}, {selectedEvent.time}</span>
              </div>
              <div className="col-span-2">
                <span className="block text-[10px] uppercase tracking-widest text-[#777991] mb-1">Venue</span>
                <span className="text-white">{selectedEvent.venue}</span>
              </div>
              <div className="col-span-2 py-3 border-y border-white/5 my-1">
                <span className="block text-[10px] uppercase tracking-widest text-[#777991] mb-2">Tickets</span>
                {selectedTickets.map(t => (
                  <div key={t.id} className="flex justify-between text-white font-medium mb-1 last:mb-0">
                    <span>{t.name}</span>
                    <span>× {t.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="col-span-2 flex justify-between items-end">
                <span className="text-xs uppercase tracking-widest text-[#777991]">Total Paid</span>
                <span className="text-2xl font-[var(--display)] text-white">₹{totalAmount}</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => navigate('/ticket')}
              className="w-full sm:w-auto button primary py-4 px-8"
            >
              VIEW MY TICKET <ArrowRight />
            </button>
            <button 
              onClick={() => navigate('/events')}
              className="w-full sm:w-auto button secondary py-4 px-8"
            >
              <ArrowLeft size={16} className="mr-2" /> Back to Events
            </button>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
