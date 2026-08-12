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
    <div className="min-h-screen bg-[var(--dark)] py-24 pt-[100px] relative overflow-hidden flex flex-col items-center">
      
      {/* Background glow */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[500px] bg-[var(--wine)]/10 rounded-[100%] blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md px-4 relative z-10">
        
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/booking-success')}
            className="text-[#878897] hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2"
          >
            <ArrowLeft size={14} /> Back
          </button>
          
          <button 
            onClick={handleDownload}
            className="text-[var(--red)] hover:text-[var(--beige)] text-xs font-bold uppercase tracking-widest flex items-center gap-2 bg-[var(--red)]/10 hover:bg-[var(--red)]/30 px-3 py-1.5 rounded transition-colors"
          >
            <Download size={14} /> Download
          </button>
        </div>

        {/* Ticket Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTicketIndex}
              initial={{ opacity: 0, x: 20, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -20, rotateY: 10 }}
              transition={{ duration: 0.4 }}
              className="w-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              
              {/* Top Half: Event Details */}
              <div className="bg-[var(--dark2)] rounded-t-2xl border border-[var(--beige)]/10 border-b-0 overflow-hidden relative">
                
                {/* Brand Header */}
                <div className="bg-[var(--dark)] border-b border-[var(--beige)]/10 px-6 py-4 flex justify-between items-center">
                  <div className="logo scale-75 origin-left">
                    <span className="logo-mark text-2xl">𝄞</span>
                    <span><b className="text-xl">MRL</b><small className="text-[8px] mt-1">EVENTS</small></span>
                  </div>
                  <div className="text-[10px] font-bold tracking-widest text-[#878897]">DIGITAL PASS</div>
                </div>

                {/* Event Image */}
                <div className="h-40 relative">
                  <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark2)] to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-[var(--beige)]/20 text-[var(--beige)] font-[var(--display)] tracking-widest px-4 py-1 text-xl rounded">
                    {currentTicket.name}
                  </div>
                </div>

                <div className="px-8 pb-8 pt-4">
                  <h2 className="font-[var(--display)] text-3xl uppercase leading-none mb-6 text-white">{selectedEvent.title}</h2>
                  
                  <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest text-[#777991] mb-1">Date</span>
                      <span className="text-sm font-bold text-[#d8d7e2] uppercase">{selectedEvent.date}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest text-[#777991] mb-1">Time</span>
                      <span className="text-sm font-bold text-[#d8d7e2] uppercase">{selectedEvent.time}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-[9px] uppercase tracking-widest text-[#777991] mb-1">Venue</span>
                      <span className="text-sm font-bold text-[#d8d7e2] uppercase">{selectedEvent.venue}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Perforation Line */}
              <div className="flex bg-[var(--dark2)] items-center px-2">
                <div className="w-4 h-8 bg-[var(--dark)] rounded-r-full -ml-2 border border-[var(--beige)]/10 border-l-0 border-y-0"></div>
                <div className="flex-1 h-[2px] border-b-2 border-dashed border-[var(--beige)]/20"></div>
                <div className="w-4 h-8 bg-[var(--dark)] rounded-l-full -mr-2 border border-[var(--beige)]/10 border-r-0 border-y-0"></div>
              </div>

              {/* Bottom Half: Attendee & QR */}
              <div className="bg-[var(--dark2)] rounded-b-2xl border border-[var(--beige)]/10 border-t-0 p-8 pt-6 relative overflow-hidden">
                {/* Glow behind QR */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-[var(--red)]/20 blur-[40px]"></div>

                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-4 flex-1">
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest text-[#777991] mb-1">Attendee</span>
                      <span className="text-base font-bold text-white uppercase">{customerDetails.fullName || 'Guest User'}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest text-[#777991] mb-1">Booking ID</span>
                      <span className="text-xs font-mono text-[#d8d7e2]">{bookingId}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest text-[#777991] mb-1">Ticket</span>
                      <span className="text-xs font-bold text-[#d8d7e2]">{currentTicketIndex + 1} OF {allTickets.length}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-white p-2 rounded-lg flex items-center justify-center">
                      {/* Fake QR Code using Lucide icon and grid */}
                      <div className="w-full h-full border-[3px] border-black p-1 relative flex items-center justify-center">
                        <div className="absolute top-0 left-0 w-3 h-3 bg-black"></div>
                        <div className="absolute top-0 right-0 w-3 h-3 bg-black"></div>
                        <div className="absolute bottom-0 left-0 w-3 h-3 bg-black"></div>
                        <QrCode size={40} className="text-black" strokeWidth={1} />
                      </div>
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-[#777991] mt-2 font-bold">Scan at entry</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation for multiple tickets */}
        {allTickets.length > 1 && (
          <div className="flex justify-between items-center mt-8">
            <button 
              onClick={() => setCurrentTicketIndex(Math.max(0, currentTicketIndex - 1))}
              disabled={currentTicketIndex === 0}
              className="text-[#878897] hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 disabled:opacity-30 transition-colors"
            >
              <ArrowLeft size={14} /> Previous
            </button>
            <span className="text-xs font-bold text-[#d8d7e2] tracking-widest">
              TICKET {currentTicketIndex + 1} OF {allTickets.length}
            </span>
            <button 
              onClick={() => setCurrentTicketIndex(Math.min(allTickets.length - 1, currentTicketIndex + 1))}
              disabled={currentTicketIndex === allTickets.length - 1}
              className="text-[#878897] hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 disabled:opacity-30 transition-colors"
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
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[var(--dark2)] border border-[var(--beige)]/20 text-[var(--beige)] px-6 py-3 rounded-full text-sm font-medium shadow-2xl z-50 whitespace-nowrap"
          >
            Ticket download will be enabled in the production version.
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
