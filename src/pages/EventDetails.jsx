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
      <div className="pt-32 pb-24 min-h-screen text-center">
        <h2 className="text-3xl text-white">Event not found</h2>
        <Link to="/events" className="text-[var(--red)] mt-4 inline-block">Back to Events</Link>
      </div>
    );
  }

  const handleBookClick = () => {
    setSelectedEvent(event);
    navigate(`/book/${event.id}`);
  };

  return (
    <div className="bg-[var(--dark)] text-[var(--beige)] min-h-screen pb-24">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full">
        <div className="absolute inset-0">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark)] via-[rgba(26,18,16,0.7)] to-[rgba(26,18,16,0.4)]"></div>
        </div>
        
        <div className="absolute inset-0 flex items-end pb-16">
          <div className="container relative z-10">
            <Link to="/events" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 uppercase tracking-wider font-semibold transition-colors">
              <ArrowLeft size={16} /> Back to Events
            </Link>
            
            {event.sellingFast && (
              <div className="mb-4 inline-block bg-[var(--red)] text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider animate-pulse">
                TICKETS SELLING FAST
              </div>
            )}
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-[var(--display)] text-5xl md:text-8xl lg:text-9xl uppercase leading-[0.85] tracking-wide mb-6"
            >
              {event.title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center gap-x-8 gap-y-4 text-[#d8d7e2]"
            >
              <div className="flex items-center gap-3">
                <Calendar className="text-[var(--terracotta)]" />
                <span className="text-lg font-medium">{event.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-[var(--wine)]" />
                <span className="text-lg font-medium">{event.time}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-[var(--red)]" />
                <span className="text-lg font-medium">{event.venue}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-invert max-w-none"
          >
            <h2 className="text-3xl font-[var(--display)] uppercase tracking-wider text-[var(--beige)] mb-6 border-b border-[var(--beige)]/10 pb-4">About The Event</h2>
            <p className="text-lg text-[#a89888] leading-relaxed">{event.about}</p>
            <p className="text-lg text-[#a89888] leading-relaxed mt-4">{event.description}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-[var(--display)] uppercase tracking-wider text-[var(--beige)] mb-6 border-b border-[var(--beige)]/10 pb-4">Event Information</h2>
            <ul className="space-y-4">
              {event.information.map((info, i) => (
                <li key={i} className="flex items-start gap-3 text-[#aaaabd]">
                  <CheckCircle2 className="text-[var(--terracotta)] shrink-0 mt-0.5" size={20} />
                  <span>{info}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Sidebar / Sticky Booking panel */}
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="sticky top-28 bg-[var(--dark2)] border border-[var(--beige)]/10 rounded-xl p-8 shadow-2xl shadow-red-900/10"
          >
            <h3 className="text-2xl font-[var(--display)] uppercase tracking-wider mb-6 text-white">Ticket Prices</h3>
            
            <div className="space-y-4 mb-8">
              {event.tickets.map(ticket => (
                <div key={ticket.id} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                  <div>
                    <span className="block font-bold tracking-widest uppercase text-sm mb-1 text-[#d8d7e2]">{ticket.name}</span>
                    <span className="text-xs text-[#777991]">From ₹{ticket.price}</span>
                  </div>
                  <div className="text-[var(--red)] font-bold">
                    ₹{ticket.price}
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={handleBookClick}
              className="w-full button primary py-4 text-base shadow-[0_0_20px_rgba(198,40,40,0.3)] hover:shadow-[0_0_30px_rgba(198,40,40,0.5)]"
            >
              Book Tickets <ArrowRight />
            </button>
            
            <div className="mt-4 flex items-start gap-2 text-xs text-[#777991] bg-white/5 p-3 rounded">
              <Info size={16} className="shrink-0 text-[var(--terracotta)]" />
              <p>For demo purposes only. No real transactions will occur.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
