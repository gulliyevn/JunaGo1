import React, { useState } from 'react';
import '../../styles/SalaryCalculator.css';

const SalaryCalculator = () => {
    const [profession, setProfession] = useState('Frontend Developer');
    const [experience, setExperience] = useState('0');
    const [language, setLanguage] = useState('0.05');
    const [result, setResult] = useState('Select values to see result');

    // Базовые зарплаты для разных профессий
    const baseSalaries = {
        'Frontend Developer': 3000,
        'Backend Developer': 3200,
        'Full Stack Developer': 3500,
        'DevOps Engineer': 3800,
        'Data Scientist': 4000,
        'Mobile Developer': 3300,
        'UI/UX Designer': 2800,
        'QA Engineer': 2500,
        'Cybersecurity Analyst': 4200
    };

    const calculateSalary = () => {
        // Получаем базовую зарплату для выбранной профессии
        const baseSalary = baseSalaries[profession];

        // Рассчитываем надбавку за опыт работы
        const experienceBonus = baseSalary * parseFloat(experience);

        // Рассчитываем надбавку за знание языка
        const languageBonus = baseSalary * parseFloat(language);

        // Рассчитываем итоговую зарплату
        const totalSalary = baseSalary + experienceBonus + languageBonus;

        // Форматируем результат
        setResult(`$${totalSalary.toFixed(0)}`);
    };

    return (
        <section className="calculator-section">
            <div className="calculator-form">
                <h2 className="calculator-title">💼 IT Salary Calculator</h2>

                <div className="form-group">
                    <label className="form-label">Select IT Professions:</label>
                    <select
                        className="form-select"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                    >
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="Full Stack Developer">Full Stack Developer</option>
                        <option value="DevOps Engineer">DevOps Engineer</option>
                        <option value="Data Scientist">Data Scientist</option>
                        <option value="Mobile Developer">Mobile Developer</option>
                        <option value="UI/UX Designer">UI/UX Designer</option>
                        <option value="QA Engineer">QA Engineer</option>
                        <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Years of Experience:</label>
                    <select
                        className="form-select"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                    >
                        <option value="0">0-1 years</option>
                        <option value="0.1">1-2 years</option>
                        <option value="0.2">2-3 years</option>
                        <option value="0.3">3-4 years</option>
                        <option value="0.4">4-5 years</option>
                        <option value="0.5">5+ years</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Language Knowledge:</label>
                    <select
                        className="form-select"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="0.05">English</option>
                        <option value="0.03">German</option>
                        <option value="0.03">French</option>
                        <option value="0.02">Russian</option>
                        <option value="0.02">Turkish</option>
                    </select>
                </div>

                <button
                    onClick={calculateSalary}
                    className="calculator-button"
                >
                    Calculate Monthly Salary
                </button>
            </div>

            <div className="calculator-result">
                <h3 className="result-title">📊 Estimated Salary</h3>
                <div className="result-value">{result}</div>
            </div>
        </section>
    );
};

export default SalaryCalculator;