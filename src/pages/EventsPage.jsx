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

  return (
    <div className="pt-[120px] pb-24 min-h-screen bg-[var(--navy)] text-white">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="eyebrow eyebrow-light justify-center mb-6"><span></span>Upcoming Events</div>
          <h1 className="font-[var(--display)] text-5xl md:text-7xl uppercase tracking-wider">
            Experience <span className="gradient-text">The Magic</span>
          </h1>
          <p className="text-[#aaaabd] mt-4 max-w-2xl mx-auto">
            Discover our upcoming premium events and book your tickets now.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyEvents.map((event, i) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#090c25] rounded-xl overflow-hidden border border-white/10 group flex flex-col h-full"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090c25] to-transparent"></div>
                {event.sellingFast && (
                  <div className="absolute top-4 right-4 bg-[var(--pink)] text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider">
                    SELLING FAST
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-[var(--display)] text-3xl uppercase mb-4 text-white group-hover:text-[var(--pink)] transition-colors">
                  {event.title}
                </h3>
                
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-center gap-3 text-[#b6b5c4] text-sm">
                    <Calendar size={16} className="text-[var(--blue)]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#b6b5c4] text-sm">
                    <Clock size={16} className="text-[var(--purple)]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#b6b5c4] text-sm">
                    <MapPin size={16} className="text-[var(--pink)]" />
                    <span>{event.venue}</span>
                  </div>
                </div>
                
                <div className="flex items-end justify-between mt-auto pt-6 border-t border-white/10">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#777991] block mb-1">Tickets From</span>
                    <span className="text-2xl font-bold text-white">₹{event.price}</span>
                  </div>
                  <button 
                    onClick={() => navigate(`/events/${event.id}`)}
                    className="flex items-center gap-2 bg-white/5 hover:bg-white hover:text-[var(--navy)] border border-white/20 px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition-all duration-300"
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
