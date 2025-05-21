import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../components/layout/MainLayout';
import styles from './ContactPage.module.css';

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form and show success message
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError('An error occurred while sending your message. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className={styles.contactPage}>
        <div className={styles.container}>
          <div className={styles.contactHeader}>
            <h1 className={styles.title}>{t('contact_us')}</h1>
            <p className={styles.subtitle}>
              {t('contact_description')}
            </p>
          </div>
          
          <div className={styles.contactContent}>
            <div className={styles.contactInfo}>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  📍
                </div>
                <div className={styles.infoContent}>
                  <h3>{t('our_office')}</h3>
                  <p>123 Developer Way</p>
                  <p>San Francisco, CA 94107</p>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  📞
                </div>
                <div className={styles.infoContent}>
                  <h3>{t('phone')}</h3>
                  <p>+1 (123) 456-7890</p>
                  <p>+1 (987) 654-3210</p>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  ✉️
                </div>
                <div className={styles.infoContent}>
                  <h3>{t('email')}</h3>
                  <p>info@junago.com</p>
                  <p>support@junago.com</p>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  🕒
                </div>
                <div className={styles.infoContent}>
                  <h3>{t('working_hours')}</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday - Sunday: Closed</p>
                </div>
              </div>
              
              <div className={styles.socialLinks}>
                <a href="https://facebook.com/junago" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  FB
                </a>
                <a href="https://twitter.com/junago" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  TW
                </a>
                <a href="https://linkedin.com/company/junago" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  LI
                </a>
                <a href="https://instagram.com/junago" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  IG
                </a>
              </div>
            </div>
            
            <div className={styles.contactForm}>
              <h2 className={styles.formTitle}>{t('send_message')}</h2>
              
              {submitSuccess ? (
                <div className={styles.successMessage}>
                  ✅
                  <p>{t('contact_success')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">{t('name')}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="email">{t('email')}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="subject">{t('subject')}</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="message">{t('message')}</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  
                  {submitError && (
                    <div className={styles.errorMessage}>
                      {submitError}
                    </div>
                  )}
                  
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('sending') : t('send')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage; 