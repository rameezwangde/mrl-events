import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const cardStyle = {
    background: 'var(--off-white)',
    padding: '40px',
    borderRadius: '18px',
    textAlign: 'center',
    border: '1px solid var(--border-light)',
    transition: 'all 0.4s ease',
  };

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '80px', background: 'var(--red)', color: 'var(--off-white)', minHeight: '100vh' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 70px)', fontFamily: 'var(--display)', fontWeight: '900', color: 'var(--off-white)', letterSpacing: '-0.02em' }}>
            Get in <span style={{ opacity: 0.6 }}>Touch</span>
          </h1>
          <p style={{ color: 'rgba(255,253,252,0.8)', maxWidth: '550px', margin: '16px auto 0', fontSize: '17px', lineHeight: '1.7' }}>
            We'd love to hear from you. Reach out to discuss your next big event or to simply say hello.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', marginBottom: '60px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={cardStyle}
            whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,0,0,0.12)' }}
          >
            <div style={{ width: '56px', height: '56px', background: 'rgba(183, 25, 46, 0.08)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--red)' }}>
              <Phone size={26} />
            </div>
            <h3 style={{ fontSize: '22px', fontFamily: 'var(--display)', fontWeight: '800', marginBottom: '12px', color: 'var(--charcoal)' }}>Phone</h3>
            <p style={{ color: 'var(--charcoal-muted)', marginBottom: '16px', fontSize: '14px', lineHeight: '1.6' }}>Call us to speak with a member of our team.</p>
            <a href="tel:+919819866075" style={{ fontSize: '18px', color: 'var(--red)', fontWeight: '700', textDecoration: 'none' }}>+91 98198 66075</a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={cardStyle}
            whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,0,0,0.12)' }}
          >
            <div style={{ width: '56px', height: '56px', background: 'rgba(183, 25, 46, 0.08)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--red)' }}>
              <Mail size={26} />
            </div>
            <h3 style={{ fontSize: '22px', fontFamily: 'var(--display)', fontWeight: '800', marginBottom: '12px', color: 'var(--charcoal)' }}>Email</h3>
            <p style={{ color: 'var(--charcoal-muted)', marginBottom: '16px', fontSize: '14px', lineHeight: '1.6' }}>Send us an email and we'll get back to you.</p>
            <a href="mailto:mrlevents2023@gmail.com" style={{ fontSize: '16px', color: 'var(--red)', fontWeight: '700', textDecoration: 'none' }}>mrlevents2023@gmail.com</a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={cardStyle}
            whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,0,0,0.12)' }}
          >
            <div style={{ width: '56px', height: '56px', background: 'rgba(183, 25, 46, 0.08)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--red)' }}>
              <MapPin size={26} />
            </div>
            <h3 style={{ fontSize: '22px', fontFamily: 'var(--display)', fontWeight: '800', marginBottom: '12px', color: 'var(--charcoal)' }}>Office</h3>
            <p style={{ color: 'var(--charcoal-muted)', marginBottom: '0', lineHeight: '1.7', fontSize: '14px' }}>
              1/18, Lotus CHS Ltd.,<br />
              Bhawani Nagar, Marol,<br />
              Andheri (E), Mumbai – 400059
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ width: '100%', height: '450px', borderRadius: '18px', overflow: 'hidden', border: '3px solid rgba(255,253,252,0.2)' }}
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.75787680004!2d72.88094621535492!3d19.11826048706371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c86ce3c62179%3A0x868b472e3612cd4e!2sBhawani%20Nagar%2C%20Marol%2C%20Andheri%20East%2C%20Mumbai%2C%20Maharashtra%20400059!5e0!3m2!1sen!2sin!4v1708945620853!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="MRL Events Office Location"
          ></iframe>
        </motion.div>
      </div>
    </main>
  );
}
