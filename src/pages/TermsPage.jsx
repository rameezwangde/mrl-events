import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, FileText, CheckCircle2, Clock, MapPin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
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
              <FileText size={16} /> Legal & Compliance
            </div>
            <h1 style={{ fontSize: 'clamp(38px, 6vw, 72px)', fontFamily: 'var(--display)', fontWeight: '900', color: '#fff', letterSpacing: '-0.02em', textTransform: 'uppercase', margin: 0, marginBottom: '14px' }}>
              Terms & <span style={{ color: 'var(--red)' }}>Conditions</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '650px', margin: '0 auto', fontSize: '16px', lineHeight: '1.6' }}>
              Please read these terms and conditions carefully before booking tickets or engaging services with MRL Events.
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
          <h2 style={headingStyle}><CheckCircle2 size={22} color="var(--red)" /> 1. Introduction & Overview</h2>
          <p style={pStyle}>
            Welcome to <strong>MRL Events</strong> ("we", "our", "us"). These Terms and Conditions govern your use of our website (including ticket booking, inquiries, and digital passes) and our event management / production services.
          </p>
          <p style={pStyle}>
            By accessing our website, purchasing an event pass, or contracting event services with MRL Events, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services or purchase tickets through our platform.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={sectionStyle}>
          <h2 style={headingStyle}><CheckCircle2 size={22} color="var(--red)" /> 2. Business Information</h2>
          <p style={pStyle}>
            <strong>Entity Name:</strong> MRL Events<br />
            <strong>Founded:</strong> 2023 by Mr. Laxaman Patel and Mr. Ramesh Mor<br />
            <strong>Registered Address:</strong> 1/1/18, Lotus CHS Ltd., Bhawani Nagar, Marol, Andheri (E), Mumbai – 400059, Maharashtra, India.<br />
            <strong>Email:</strong> mrlevents2023@gmail.com<br />
            <strong>Phone / Support:</strong> +91 98198 66075
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={sectionStyle}>
          <h2 style={headingStyle}><CheckCircle2 size={22} color="var(--red)" /> 3. Event Ticket Booking & Entry Rules</h2>
          <ul style={{ ...pStyle, paddingLeft: '20px', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '8px' }}><strong>Digital Tickets:</strong> Each ticket/e-pass is valid for admission of one person only unless specified as a group/VIP pass. Digital QR tickets are delivered instantly upon successful payment.</li>
            <li style={{ marginBottom: '8px' }}><strong>Identification:</strong> Attendees must carry a valid Government-issued photo ID (Aadhaar Card, Driving License, Passport, or PAN Card) matching the booking name when entering the venue.</li>
            <li style={{ marginBottom: '8px' }}><strong>Age Restrictions:</strong> Specific concerts or venues may carry age restrictions (e.g. 18+ or parental guidance). Attendees must adhere to venue guidelines.</li>
            <li style={{ marginBottom: '8px' }}><strong>Right of Admission:</strong> MRL Events and the event venue management reserve the strict right of admission. Misbehavior, intoxication, possession of dangerous items, or failure to comply with security rules may lead to immediate eviction without refund.</li>
            <li style={{ marginBottom: '8px' }}><strong>Prohibited Items:</strong> Arms, weapons, sharp objects, outside food/beverages, illegal substances, and unauthorized professional recording equipment are strictly prohibited.</li>
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} style={sectionStyle}>
          <h2 style={headingStyle}><CheckCircle2 size={22} color="var(--red)" /> 4. Payments & Billing</h2>
          <p style={pStyle}>
            All ticket prices are listed in Indian Rupees (INR) and are inclusive of applicable GST and convenience fees unless explicitly noted. Payments are processed securely via authorized Indian payment gateways including <strong>PhonePe</strong>, UPI, Net Banking, Credit/Debit Cards, and Wallets.
          </p>
          <p style={pStyle}>
            MRL Events does not store your sensitive banking credentials or card details. All transactions are encrypted with bank-grade 128/256-bit SSL protocols.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={sectionStyle}>
          <h2 style={headingStyle}><CheckCircle2 size={22} color="var(--red)" /> 5. Event Modification, Postponement & Force Majeure</h2>
          <p style={pStyle}>
            MRL Events reserves the right to make changes to event artist lineups, seating arrangements, schedule, or venue layout due to unforeseen operational or logistical needs.
          </p>
          <p style={pStyle}>
            In the event of cancellation, postponement, or rescheduling caused by Acts of God, extreme weather conditions, government restrictions, pandemic measures, artist illness, or force majeure events, our <Link to="/refund-policy" style={{ color: 'var(--red)', fontWeight: '700' }}>Refund & Cancellation Policy</Link> shall apply.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={sectionStyle}>
          <h2 style={headingStyle}><CheckCircle2 size={22} color="var(--red)" /> 6. Intellectual Property</h2>
          <p style={pStyle}>
            All trademarks, logos, event brand designs, banners, and website assets are the exclusive intellectual property of MRL Events or its respective artist partners. You may not copy, reproduce, distribute, or create derivative works without prior written consent.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={sectionStyle}>
          <h2 style={headingStyle}><CheckCircle2 size={22} color="var(--red)" /> 7. Governing Law & Jurisdiction</h2>
          <p style={pStyle}>
            These Terms & Conditions are governed by and construed in accordance with the laws of the Republic of India. Any disputes arising out of or in connection with these terms, ticketing, or services shall be subject to the exclusive jurisdiction of the competent courts in <strong>Mumbai, Maharashtra, India</strong>.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={sectionStyle}>
          <h2 style={headingStyle}><CheckCircle2 size={22} color="var(--red)" /> 8. Contact & Grievance Redressal</h2>
          <p style={pStyle}>
            If you have questions, feedback, or grievances regarding our Terms and Conditions, you can contact our nodal team at:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--charcoal)', fontSize: '15px' }}><Mail size={16} color="var(--red)" /> <strong>Email:</strong> mrlevents2023@gmail.com</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--charcoal)', fontSize: '15px' }}><Phone size={16} color="var(--red)" /> <strong>Phone:</strong> +91 98198 66075</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--charcoal)', fontSize: '15px' }}><MapPin size={16} color="var(--red)" /> <strong>Office:</strong> 1/1/18, Lotus CHS Ltd., Bhawani Nagar, Marol, Andheri (E), Mumbai – 400059</span>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
