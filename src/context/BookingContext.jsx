import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  // Try to load state from localStorage first to survive refreshes
  const loadInitialState = (key, defaultValue) => {
    try {
      const saved = localStorage.getItem(`mrl_demo_${key}`);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  };

  const [selectedEvent, setSelectedEvent] = useState(() => loadInitialState('event', null));
  
  // Array of { type: 'VIP', quantity: 2, price: 1999 }
  const [selectedTickets, setSelectedTickets] = useState(() => loadInitialState('tickets', []));
  
  const [customerDetails, setCustomerDetails] = useState(() => loadInitialState('customer', {
    fullName: '',
    email: '',
    mobile: '',
    city: ''
  }));

  const [bookingId, setBookingId] = useState(() => loadInitialState('bookingId', null));

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mrl_demo_event', JSON.stringify(selectedEvent));
  }, [selectedEvent]);

  useEffect(() => {
    localStorage.setItem('mrl_demo_tickets', JSON.stringify(selectedTickets));
  }, [selectedTickets]);

  useEffect(() => {
    localStorage.setItem('mrl_demo_customer', JSON.stringify(customerDetails));
  }, [customerDetails]);

  useEffect(() => {
    localStorage.setItem('mrl_demo_bookingId', JSON.stringify(bookingId));
  }, [bookingId]);

  const totalAmount = selectedTickets.reduce((acc, ticket) => acc + (ticket.price * ticket.quantity), 0);

  const clearBooking = () => {
    setSelectedEvent(null);
    setSelectedTickets([]);
    setCustomerDetails({
      fullName: '',
      email: '',
      mobile: '',
      city: ''
    });
    setBookingId(null);
    localStorage.removeItem('mrl_demo_event');
    localStorage.removeItem('mrl_demo_tickets');
    localStorage.removeItem('mrl_demo_customer');
    localStorage.removeItem('mrl_demo_bookingId');
  };

  return (
    <BookingContext.Provider value={{
      selectedEvent,
      setSelectedEvent,
      selectedTickets,
      setSelectedTickets,
      customerDetails,
      setCustomerDetails,
      bookingId,
      setBookingId,
      totalAmount,
      clearBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
};
