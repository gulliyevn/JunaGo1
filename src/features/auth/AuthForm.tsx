import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/common/Button/Button';
import styles from './AuthForm.module.scss';
import { useTranslation } from 'react-i18next';

export const AuthForm: React.FC = () => {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t, i18n } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{t('login')}</h2>
      <input
        type="email"
        placeholder={t('email')}
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder={t('password')}
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {error && <div className={styles.error}>{error}</div>}
      <Button type="submit" isLoading={isLoading} fullWidth>
        {t('login')}
      </Button>
      <div style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button type="button" onClick={() => i18n.changeLanguage('en')}>EN</button>
        <button type="button" onClick={() => i18n.changeLanguage('ru')}>RU</button>
        <button type="button" onClick={() => i18n.changeLanguage('az')}>AZ</button>
      </div>
    </form>
  );
}; 