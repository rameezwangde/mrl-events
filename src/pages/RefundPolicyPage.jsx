import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, CheckCircle2, AlertCircle, Clock, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RefundPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionStyle = {
    background: 'var(--off-white)',
    padding: '36px',
    borderRadius: '16px',
    border: '1px solid var(--border-light)',
    marginBottom: '28px',
  };

  const headingStyle = {
    fontSize: '22px',
    fontFamily: 'var(--display)',
    fontWeight: '800',
    color: 'var(--charcoal)',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const pStyle = {
    color: 'var(--charcoal-muted)',
    fontSize: '15px',
    lineHeight: '1.8',
    marginBottom: '14px',
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--beige)' }}>
      {/* HEADER SECTION */}
      <div style={{ position: 'relative', paddingTop: '160px', paddingBottom: '70px', background: 'var(--charcoal)', color: '#fff', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(255,255,255,0.08)', borderRadius: '30px', color: 'var(--red)', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              <RefreshCw size={16} /> Cancellation & Returns
            </div>
            <h1 style={{ fontSize: 'clamp(38px, 6vw, 72px)', fontFamily: 'var(--display)', fontWeight: '900', color: '#fff', letterSpacing: '-0.02em', textTransform: 'uppercase', margin: 0, marginBottom: '14px' }}>
              Cancellation & <span style={{ color: 'var(--red)' }}>Refund Policy</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '650px', margin: '0 auto', fontSize: '16px', lineHeight: '1.6' }}>
              Clear guidelines on ticket cancellations, event rescheduling, refund processing, and timelines.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '12px' }}>
              Last updated: September 10, 2026
            </p>
          </motion.div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container" style={{ padding: '60px 20px 100px', maxWidth: '960px', margin: '0 auto' }}>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={sectionStyle}>
          <h2 style={headingStyle}><CheckCircle2 size={22} color="var(--red)" /> 1. Standard Ticket Booking Policy</h2>
          <p style={pStyle}>
            All ticket sales made through MRL Events for live concerts, musical shows, and corporate events are generally <strong>final and non-transferable / non-refundable</strong> once successfully confirmed, except in the specific circumstances outlined below.
          </p>
          <p style={pStyle}>
            Please review your event date, venue location, seating category, and ticket count carefully prior to completing payment.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={sectionStyle}>
          <h2 style={headingStyle}><AlertCircle size={22} color="var(--red)" /> 2. Event Cancellation or Rescheduling</h2>
          <ul style={{ ...pStyle, paddingLeft: '20px', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '10px' }}>
              <strong>Event Cancellation by Organizers:</strong> If an event is cancelled by MRL Events or due to artist unavailability without a rescheduled date, buyers will be eligible for a <strong>100% full refund</strong> of the ticket face value.
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Event Rescheduling / Venue Change:</strong> If an event is postponed or moved to a different date/venue, your existing tickets will remain automatically valid for the rescheduled date. If you are unable to attend the rescheduled date, you may request a refund within <strong>48 hours</strong> of the postponement notification.
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Force Majeure:</strong> In events disrupted by unavoidable circumstances (such as government directives, natural calamities, national mourning, or extreme force majeure), MRL Events will prioritize either a full refund or an alternative scheduled show pass based on advisory guidelines.
            </li>
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={sectionStyle}>
          <h2 style={headingStyle}><Clock size={22} color="var(--red)" /> 3. Refund Timelines & Payment Mode</h2>
          <p style={pStyle}>
            When a refund is approved by MRL Events:
          </p>
          <ul style={{ ...pStyle, paddingLeft: '20px', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '8px' }}>Refunds are automatically processed back to the <strong>original payment method</strong> (PhonePe, UPI account, Debit/Credit Card, or Net Banking) used at the time of purchase.</li>
            <li style={{ marginBottom: '8px' }}>Once initiated by our finance team, refunds typically reflect in your bank account or payment app within <strong>5 to 7 business days</strong>, depending on your issuing bank's settlement cycle.</li>
            <li style={{ marginBottom: '8px' }}>Convenience charges or payment gateway processing fees may be non-refundable if stipulated at the checkout gateway.</li>
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} style={sectionStyle}>
          <h2 style={headingStyle}><ShieldCheck size={22} color="var(--red)" /> 4. Duplicate or Failed Transactions</h2>
          <p style={pStyle}>
            If money was debited from your account but you did not receive a booking confirmation or QR e-ticket:
          </p>
          <ul style={{ ...pStyle, paddingLeft: '20px', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '8px' }}>Your payment is usually auto-reversed by your bank / PhonePe within <strong>24 to 48 hours</strong>.</li>
            <li style={{ marginBottom: '8px' }}>If the amount is not reversed within 48 hours, please email us at <strong>mrlevents2023@gmail.com</strong> with your PhonePe Transaction ID and payment screenshot, and our support team will resolve it promptly.</li>
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={sectionStyle}>
          <h2 style={headingStyle}><CheckCircle2 size={22} color="var(--red)" /> 5. Corporate & Custom Event Contracts</h2>
          <p style={pStyle}>
            For custom corporate event management, wedding planning, and live stage fabrication services, cancellation terms and milestone payment schedules are governed by the specific Service Level Agreement (SLA) signed between MRL Events and the client.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={sectionStyle}>
          <h2 style={headingStyle}><Mail size={22} color="var(--red)" /> 6. How to Request a Refund or Support</h2>
          <p style={pStyle}>
            To submit a cancellation or refund inquiry, please reach out to our customer support team with your Booking ID:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--charcoal)', fontSize: '15px' }}><Mail size={16} color="var(--red)" /> <strong>Email:</strong> mrlevents2023@gmail.com</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--charcoal)', fontSize: '15px' }}><Phone size={16} color="var(--red)" /> <strong>Support Line:</strong> +91 98198 66075</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--charcoal)', fontSize: '15px' }}><MapPin size={16} color="var(--red)" /> <strong>Office Address:</strong> 1/1/18, Lotus CHS Ltd., Bhawani Nagar, Marol, Andheri (E), Mumbai – 400059</span>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
