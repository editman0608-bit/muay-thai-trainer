// components/TrainingPlanDisplay.tsx
import React, { useState } from 'react';
import { UserProfile, TrainingPlan, TrainingSession } from '../types';
import './TrainingPlanDisplay.css';

interface Props {
  userProfile: UserProfile;
  trainingPlan: TrainingPlan;
  onReset: () => void;
}

const TrainingPlanDisplay: React.FC<Props> = ({
  userProfile,
  trainingPlan,
  onReset
}) => {
  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(
    trainingPlan.sessions[0] || null
  );
  const [expandedTips, setExpandedTips] = useState<{ [key: string]: boolean }>({});

  const toggleTip = (index: number) => {
    setExpandedTips(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${minutes}:${secs.toString().padStart(2, '0')}` : `${minutes}m`;
  };

  return (
    <div className="plan-display">
      {/* Profil Zusammenfassung */}
      <div className="profile-summary">
        <div className="summary-card">
          <h2>👋 Willkommen, {userProfile.name}!</h2>
          <div className="summary-grid">
            <div className="stat">
              <span className="label">Alter:</span>
              <span className="value">{userProfile.age} Jahre</span>
            </div>
            <div className="stat">
              <span className="label">Gewicht:</span>
              <span className="value">{userProfile.weight} kg</span>
            </div>
            <div className="stat">
              <span className="label">Größe:</span>
              <span className="value">{userProfile.height} cm</span>
            </div>
            <div className="stat">
              <span className="label">Erfahrung:</span>
              <span className="value">{userProfile.experience}</span>
            </div>
            <div className="stat">
              <span className="label">Training:</span>
              <span className="value">{userProfile.trainingDaysPerWeek}x/Woche</span>
            </div>
            <div className="stat">
              <span className="label">Session:</span>
              <span className="value">{userProfile.sessionDurationMinutes} min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trainingswoche */}
      <div className="training-schedule">
        <h2>📅 Dein Wochenplan</h2>
        <div className="session-tabs">
          {trainingPlan.sessions.map((session) => (
            <button
              key={session.id}
              className={`session-tab ${
                selectedSession?.id === session.id ? 'active' : ''
              }`}
              onClick={() => setSelectedSession(session)}
            >
              <div className="tab-day">Tag {session.day}</div>
              <div className="tab-focus">{session.focusAreas[0]}</div>
            </button>
          ))}
        </div>

        {selectedSession && (
          <div className="session-detail">
            <h3>{selectedSession.title}</h3>
            <div className="session-meta">
              <span className={`difficulty ${selectedSession.difficulty}`}>
                {selectedSession.difficulty === 'easy' && '🟢 Einfach'}
                {selectedSession.difficulty === 'moderate' && '🟡 Moderat'}
                {selectedSession.difficulty === 'hard' && '🔴 Schwer'}
              </span>
              <span className="duration">⏱️ {selectedSession.estimatedDuration} min</span>
            </div>

            {/* Aufwärmung */}
            <div className="exercise-section">
              <h4>🔥 Aufwärmung (10 min)</h4>
              <div className="exercises">
                {selectedSession.warmup.map((exercise, idx) => (
                  <div key={idx} className="exercise-card">
                    <div className="exercise-header">
                      <h5>{exercise.name}</h5>
                      <span className="duration">{formatDuration(exercise.duration)}</span>
                    </div>
                    <p className="description">{exercise.description}</p>
                    <div className="exercise-meta">
                      <span className={`intensity ${exercise.intensity}`}>
                        {exercise.intensity === 'low' && '🟢'}
                        {exercise.intensity === 'medium' && '🟡'}
                        {exercise.intensity === 'high' && '🔴'}
                        {exercise.intensity}
                      </span>
                      <span className="technique">💡 {exercise.technique}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Haupttraining */}
            <div className="exercise-section">
              <h4>💪 Haupttraining</h4>
              <div className="exercises">
                {selectedSession.main.map((exercise, idx) => (
                  <div key={idx} className="exercise-card">
                    <div className="exercise-header">
                      <h5>{exercise.name}</h5>
                      <div className="exercise-reps">
                        {exercise.sets && <span>{exercise.sets}x</span>}
                        {exercise.reps && <span>{exercise.reps} Reps</span>}
                        {!exercise.sets && !exercise.reps && (
                          <span>{formatDuration(exercise.duration)}</span>
                        )}
                      </div>
                    </div>
                    <p className="description">{exercise.description}</p>
                    <div className="exercise-meta">
                      <span className={`intensity ${exercise.intensity}`}>
                        {exercise.intensity === 'low' && '🟢'}
                        {exercise.intensity === 'medium' && '🟡'}
                        {exercise.intensity === 'high' && '🔴'}
                        {exercise.intensity}
                      </span>
                      <span className="technique">💡 {exercise.technique}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cool Down */}
            <div className="exercise-section">
              <h4>❄️ Abkühlung & Dehnen</h4>
              <div className="exercises">
                {selectedSession.cool.map((exercise, idx) => (
                  <div key={idx} className="exercise-card">
                    <div className="exercise-header">
                      <h5>{exercise.name}</h5>
                      <span className="duration">{formatDuration(exercise.duration)}</span>
                    </div>
                    <p className="description">{exercise.description}</p>
                    <div className="exercise-meta">
                      <span className={`intensity ${exercise.intensity}`}>
                        {exercise.intensity === 'low' && '🟢'}
                        {exercise.intensity === 'medium' && '🟡'}
                        {exercise.intensity === 'high' && '🔴'}
                        {exercise.intensity}
                      </span>
                      <span className="technique">💡 {exercise.technique}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tipps & Ratschläge */}
      <div className="tips-section">
        <h2>💡 Trainingips & Ernährung</h2>

        <div className="tips-container">
          <div className="tips-subsection">
            <h3>🥋 Muay Thai Tipps</h3>
            {trainingPlan.tips.map((tip, idx) => (
              <div key={idx} className="tip-card">
                <p>{tip}</p>
              </div>
            ))}
          </div>

          <div className="tips-subsection">
            <h3>🍎 Ernährungsratschläge</h3>
            {trainingPlan.nutritionAdvice.map((advice, idx) => (
              <div key={idx} className="tip-card">
                <p>{advice}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="action-buttons">
        <button onClick={onReset} className="reset-btn">
          ↻ Neuen Plan erstellen
        </button>
        <button onClick={() => window.print()} className="print-btn">
          🖨️ Plan ausdrucken
        </button>
      </div>
    </div>
  );
};

export default TrainingPlanDisplay;
