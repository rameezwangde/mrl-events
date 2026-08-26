import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="contact-page page-padding" style={{ paddingTop: '120px', paddingBottom: '80px', background: 'var(--red)', color: 'var(--beige)', minHeight: '100vh' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="contact-header"
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 70px)', fontFamily: 'var(--display)', color: 'var(--beige)', letterSpacing: '0.02em' }}>
            Get in <span style={{ color: 'var(--beige2)' }}>Touch</span>
          </h1>
          <p style={{ color: 'var(--beige)', maxWidth: '600px', margin: '20px auto 0', fontSize: '18px', opacity: 0.9 }}>
            We'd love to hear from you. Reach out to discuss your next big event or to simply say hello.
          </p>
        </motion.div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '80px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="contact-card"
            style={{ background: 'var(--beige)', padding: '40px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}
          >
            <div style={{ width: '60px', height: '60px', background: 'rgba(198, 40, 40, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--red)' }}>
              <Phone size={28} />
            </div>
            <h3 style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--dark)' }}>Phone</h3>
            <p style={{ color: '#5e514a', marginBottom: '16px' }}>Call us to speak with a member of our team.</p>
            <a href="tel:+919819866075" style={{ fontSize: '20px', color: 'var(--red)', fontWeight: '600', textDecoration: 'none' }}>+91 98198 66075</a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="contact-card"
            style={{ background: 'var(--beige)', padding: '40px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}
          >
            <div style={{ width: '60px', height: '60px', background: 'rgba(198, 40, 40, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--red)' }}>
              <Mail size={28} />
            </div>
            <h3 style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--dark)' }}>Email</h3>
            <p style={{ color: '#5e514a', marginBottom: '16px' }}>Send us an email and we'll get back to you.</p>
            <a href="mailto:mrlevents2023@gmail.com" style={{ fontSize: '20px', color: 'var(--red)', fontWeight: '600', textDecoration: 'none' }}>mrlevents2023@gmail.com</a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="contact-card"
            style={{ background: 'var(--beige)', padding: '40px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}
          >
            <div style={{ width: '60px', height: '60px', background: 'rgba(198, 40, 40, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--red)' }}>
              <MapPin size={28} />
            </div>
            <h3 style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--dark)' }}>Office</h3>
            <p style={{ color: '#5e514a', marginBottom: '16px', lineHeight: '1.6' }}>
              1/18, Lotus CHS Ltd.,<br />
              Bhawani Nagar, Marol,<br />
              Andheri (E), Mumbai – 400059
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="map-container"
          style={{ width: '100%', height: '500px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', border: '4px solid var(--beige)' }}
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
