import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../components/layout/MainLayout';
import styles from './FeedbackPage.module.css';

type FeedbackType = 'bug' | 'feature' | 'improvement' | 'other';

interface FeedbackFormState {
  type: FeedbackType;
  title: string;
  description: string;
  email: string;
  rating: number;
}

const initialFormState: FeedbackFormState = {
  type: 'improvement',
  title: '',
  description: '',
  email: '',
  rating: 0,
};

const FeedbackPage: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FeedbackFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form and show success message
      setFormData(initialFormState);
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError('An error occurred while sending your feedback. Please try again.');
      console.error('Feedback form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const feedbackTypes = [
    { value: 'bug', label: t('bug_report') },
    { value: 'feature', label: t('feature_request') },
    { value: 'improvement', label: t('improvement_suggestion') },
    { value: 'other', label: t('other_feedback') },
  ];

  return (
    <MainLayout>
      <div className={styles.feedbackPage}>
        <div className={styles.container}>
          <div className={styles.feedbackHeader}>
            <h1 className={styles.title}>{t('feedback')}</h1>
            <p className={styles.subtitle}>
              {t('feedback_description')}
            </p>
          </div>

          <div className={styles.feedbackContent}>
            {submitSuccess ? (
              <div className={styles.successMessage}>
                ✅
                <h2>{t('thank_you')}</h2>
                <p>{t('feedback_success')}</p>
                <button 
                  className={styles.newFeedbackButton}
                  onClick={() => setSubmitSuccess(false)}
                >
                  {t('send_another_feedback')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.feedbackForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="type">{t('feedback_type')}</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    {feedbackTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="title">{t('feedback_title')}</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder={t('feedback_title_placeholder')}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="description">{t('feedback_description_label')}</label>
                  <textarea
                    id="description"
                    name="description"
                    rows={6}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder={t('feedback_description_placeholder')}
                    required
                  ></textarea>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">{t('email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('email_placeholder')}
                    required
                  />
                  <small className={styles.formHint}>{t('email_privacy_note')}</small>
                </div>

                <div className={styles.formGroup}>
                  <label>{t('rate_experience')}</label>
                  <div className={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map(rating => (
                      <button
                        key={rating}
                        type="button"
                        className={`${styles.ratingButton} ${formData.rating >= rating ? styles.active : ''}`}
                        onClick={() => handleRatingChange(rating)}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
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
                  {isSubmitting ? t('sending') : t('submit_feedback')}
                </button>
              </form>
            )}
            
            <div className={styles.feedbackAside}>
              <div className={styles.asideCard}>
                <h3>{t('frequently_asked_questions')}</h3>
                <ul className={styles.faqList}>
                  <li>
                    <h4>{t('faq_response_time')}</h4>
                    <p>{t('faq_response_time_answer')}</p>
                  </li>
                  <li>
                    <h4>{t('faq_feature_request')}</h4>
                    <p>{t('faq_feature_request_answer')}</p>
                  </li>
                  <li>
                    <h4>{t('faq_bug_report')}</h4>
                    <p>{t('faq_bug_report_answer')}</p>
                  </li>
                </ul>
              </div>
              
              <div className={styles.asideCard}>
                <h3>{t('need_help')}</h3>
                <p>{t('need_help_description')}</p>
                <a href="/contact" className={styles.contactLink}>
                  {t('contact_support')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FeedbackPage; 