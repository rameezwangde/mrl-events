import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, CheckCircle2, Eye, Database, Share2, Mail, Phone, MapPin } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
              <Lock size={16} /> Privacy & Security
            </div>
            <h1 style={{ fontSize: 'clamp(38px, 6vw, 72px)', fontFamily: 'var(--display)', fontWeight: '900', color: '#fff', letterSpacing: '-0.02em', textTransform: 'uppercase', margin: 0, marginBottom: '14px' }}>
              Privacy <span style={{ color: 'var(--red)' }}>Policy</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '650px', margin: '0 auto', fontSize: '16px', lineHeight: '1.6' }}>
              How MRL Events collects, protects, uses, and safeguards your personal information and transaction data.
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
          <h2 style={headingStyle}><ShieldCheck size={22} color="var(--red)" /> 1. Commitment to Privacy</h2>
          <p style={pStyle}>
            At <strong>MRL Events</strong> (founded by Mr. Laxaman Patel and Mr. Ramesh Mor), we value the trust you place in us. This Privacy Policy describes the types of personal information we collect through our website, event booking system, and digital ticket portal, and how we utilize and protect that information.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={sectionStyle}>
          <h2 style={headingStyle}><Database size={22} color="var(--red)" /> 2. Information We Collect</h2>
          <p style={pStyle}>
            When you interact with our website, book concert passes, or inquire about event services, we may collect the following details:
          </p>
          <ul style={{ ...pStyle, paddingLeft: '20px', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '8px' }}><strong>Contact Details:</strong> Full Name, Email Address, Phone / WhatsApp Number.</li>
            <li style={{ marginBottom: '8px' }}><strong>Booking Details:</strong> Selected event, ticket tier, attendee count, unique digital QR ticket ID, and order timestamp.</li>
            <li style={{ marginBottom: '8px' }}><strong>Payment Transaction Identifiers:</strong> Payment status, PhonePe transaction IDs, UPI reference numbers, or order IDs (Note: We do NOT store credit/debit card numbers, CVVs, or bank account passwords).</li>
            <li style={{ marginBottom: '8px' }}><strong>Technical Data:</strong> Browser type, IP address, device information, and site interaction metrics to improve speed and user experience.</li>
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={sectionStyle}>
          <h2 style={headingStyle}><Eye size={22} color="var(--red)" /> 3. How We Use Your Information</h2>
          <p style={pStyle}>
            The information collected is used strictly for legitimate business and customer service purposes:
          </p>
          <ul style={{ ...pStyle, paddingLeft: '20px', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '8px' }}>Generating and delivering your verified digital QR tickets via email, WhatsApp, and on-screen download.</li>
            <li style={{ marginBottom: '8px' }}>Processing payment transactions securely via authorized payment gateways (e.g., PhonePe).</li>
            <li style={{ marginBottom: '8px' }}>Sending vital event updates, entry gate instructions, venue directions, or postponement notices.</li>
            <li style={{ marginBottom: '8px' }}>Providing dedicated customer support and processing authorized refunds.</li>
            <li style={{ marginBottom: '8px' }}>Complying with statutory tax, regulatory, and venue safety regulations in India.</li>
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} style={sectionStyle}>
          <h2 style={headingStyle}><Share2 size={22} color="var(--red)" /> 4. Information Sharing & Third Parties</h2>
          <p style={pStyle}>
            We do <strong>not</strong> sell, rent, or trade your personal information to third-party advertisers. Information is only shared with trusted service partners under confidentiality agreements:
          </p>
          <ul style={{ ...pStyle, paddingLeft: '20px', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '8px' }}><strong>Payment Gateways (PhonePe / Banks):</strong> To verify and settle your transaction.</li>
            <li style={{ marginBottom: '8px' }}><strong>Venue Security & Ticketing Scanners:</strong> To validate attendee QR passes at stadium/hall entry gates.</li>
            <li style={{ marginBottom: '8px' }}><strong>Legal Authorities:</strong> When required by Indian law, court subpoena, or emergency law enforcement requests.</li>
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={sectionStyle}>
          <h2 style={headingStyle}><Lock size={22} color="var(--red)" /> 5. Data Security</h2>
          <p style={pStyle}>
            We implement industry-standard administrative, technical, and physical safeguards to protect your personal information against unauthorized access, loss, or alteration. All web communications utilize HTTPS with SSL encryption.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={sectionStyle}>
          <h2 style={headingStyle}><Mail size={22} color="var(--red)" /> 6. Grievance Officer & Contact Details</h2>
          <p style={pStyle}>
            In accordance with the Information Technology Act, 2000 and rules made thereunder, if you have any questions, concerns, or requests regarding your data, please contact our designated Grievance Officer:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--charcoal)', fontSize: '15px' }}><Mail size={16} color="var(--red)" /> <strong>Email:</strong> mrlevents2023@gmail.com</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--charcoal)', fontSize: '15px' }}><Phone size={16} color="var(--red)" /> <strong>Phone:</strong> +91 98198 66075</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--charcoal)', fontSize: '15px' }}><MapPin size={16} color="var(--red)" /> <strong>Address:</strong> 1/1/18, Lotus CHS Ltd., Bhawani Nagar, Marol, Andheri (E), Mumbai – 400059, India</span>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
