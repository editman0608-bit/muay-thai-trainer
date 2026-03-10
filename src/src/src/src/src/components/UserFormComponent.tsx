// components/UserFormComponent.tsx
import React, { useState } from 'react';
import { UserProfile } from '../types';
import './UserFormComponent.css';

interface Props {
  onSubmit: (profile: UserProfile) => void;
}

const UserFormComponent: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: 25,
    weight: 70,
    height: 180,
    experience: 'beginner' as const,
    goals: [] as string[],
    injuries: [] as string[],
    trainingDaysPerWeek: 3,
    sessionDurationMinutes: 60,
    preferences: {
      footworkFocus: 3,
      clinchWork: 3,
      padWork: 3,
      sparring: 3,
      strengthTraining: 3
    }
  });

  const goalOptions = [
    'Gewichtsverlust',
    'Muskelaufbau',
    'Kampfvorbereitung',
    'Fitness',
    'Selbstverteidigung',
    'Stress abbau'
  ];

  const injuryOptions = [
    'Schulterverletzung',
    'Knieverletzung',
    'Rückenschmerzen',
    'Handgelenkverletzung',
    'Keine'
  ];

  const handleToggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleToggleInjury = (injury: string) => {
    setFormData(prev => ({
      ...prev,
      injuries: prev.injuries.includes(injury)
        ? prev.injuries.filter(i => i !== injury)
        : [...prev.injuries, injury]
    }));
  };

  const handlePreferenceChange = (
    key: keyof typeof formData.preferences,
    value: number
  ) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const profile: UserProfile = {
      id: `user_${Date.now()}`,
      ...formData,
      createdAt: new Date()
    };

    onSubmit(profile);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="user-form">
        {/* Persönliche Informationen */}
        <fieldset>
          <legend>📋 Persönliche Informationen</legend>

          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              placeholder="Dein Name"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Alter *</label>
              <input
                type="number"
                id="age"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: parseInt(e.target.value) })
                }
                min="15"
                max="100"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="weight">Gewicht (kg) *</label>
              <input
                type="number"
                id="weight"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: parseFloat(e.target.value) })
                }
                min="40"
                max="200"
                step="0.5"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="height">Größe (cm) *</label>
              <input
                type="number"
                id="height"
                value={formData.height}
                onChange={(e) =>
                  setFormData({ ...formData, height: parseInt(e.target.value) })
                }
                min="140"
                max="230"
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Erfahrung und Ziele */}
        <fieldset>
          <legend>🎯 Erfahrung & Ziele</legend>

          <div className="form-group">
            <label htmlFor="experience">Erfahrung *</label>
            <select
              id="experience"
              value={formData.experience}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  experience: e.target.value as 'beginner' | 'intermediate' | 'advanced'
                })
              }
              required
            >
              <option value="beginner">Anfänger</option>
              <option value="intermediate">Fortgeschrittener</option>
              <option value="advanced">Profi</option>
            </select>
          </div>

          <div className="form-group">
            <label>Deine Ziele *</label>
            <div className="checkbox-group">
              {goalOptions.map(goal => (
                <label key={goal} className="checkbox">
                  <input
                    type="checkbox"
                    checked={formData.goals.includes(goal)}
                    onChange={() => handleToggleGoal(goal)}
                  />
                  <span>{goal}</span>
                </label>
              ))}
            </div>
          </div>
        </fieldset>

        {/* Verletzungen */}
        <fieldset>
          <legend>🩹 Verletzungshistorie</legend>
          <div className="form-group">
            <label>Hast du Verletzungen?</label>
            <div className="checkbox-group">
              {injuryOptions.map(injury => (
                <label key={injury} className="checkbox">
                  <input
                    type="checkbox"
                    checked={formData.injuries.includes(injury)}
                    onChange={() => handleToggleInjury(injury)}
                  />
                  <span>{injury}</span>
                </label>
              ))}
            </div>
          </div>
        </fieldset>

        {/* Training Einstellungen */}
        <fieldset>
          <legend>⏱️ Training Einstellungen</legend>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="trainingDays">
                Trainingstage pro Woche: {formData.trainingDaysPerWeek}
              </label>
              <input
                type="range"
                id="trainingDays"
                min="1"
                max="7"
                value={formData.trainingDaysPerWeek}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    trainingDaysPerWeek: parseInt(e.target.value)
                  })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="duration">
                Session Dauer (min): {formData.sessionDurationMinutes}
              </label>
              <input
                type="range"
                id="duration"
                min="30"
                max="180"
                step="15"
                value={formData.sessionDurationMinutes}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sessionDurationMinutes: parseInt(e.target.value)
                  })
                }
              />
            </div>
          </div>
        </fieldset>

        {/* Vorlieben */}
        <fieldset>
          <legend>❤️ Trainingsvorlieben</legend>
          <p className="preference-hint">
            Bewerte deine Vorlieben von 1 (gar nicht) bis 5 (sehr gerne)
          </p>

          <div className="preference-grid">
            {[
              { key: 'footworkFocus' as const, label: '🦶 Footwork' },
              { key: 'clinchWork' as const, label: '🔗 Clinch' },
              { key: 'padWork' as const, label: '👊 Pad Work' },
              { key: 'sparring' as const, label: '🥊 Sparring' },
              { key: 'strengthTraining' as const, label: '💪 Kraft' }
            ].map(({ key, label }) => (
              <div key={key} className="preference-item">
                <label>{label}</label>
                <div className="rating">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <button
                      key={rating}
                      type="button"
                      className={`rating-btn ${
                        formData.preferences[key] === rating ? 'active' : ''
                      }`}
                      onClick={() => handlePreferenceChange(key, rating)}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="submit-btn">
          🎯 Trainingsplan generieren
        </button>
      </form>
    </div>
  );
};

export default UserFormComponent;
