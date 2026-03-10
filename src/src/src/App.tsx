// App.tsx
import React, { useState } from 'react';
import { UserProfile, TrainingPlan } from './types';
import { MuayThaiTrainer } from './muayThaiTrainer';
import UserFormComponent from './components/UserFormComponent';
import TrainingPlanDisplay from './components/TrainingPlanDisplay';
import './App.css';

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [trainingPlan, setTrainingPlan] = useState<TrainingPlan | null>(null);
  const [showPlan, setShowPlan] = useState(false);

  const handleUserProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    const plan = MuayThaiTrainer.generateTrainingPlan(profile);
    setTrainingPlan(plan);
    setShowPlan(true);
  };

  const handleResetPlan = () => {
    setUserProfile(null);
    setTrainingPlan(null);
    setShowPlan(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🥋 Muay Thai Personal Trainer</h1>
        <p>Erstelle deinen personalisierten Trainingsplan</p>
      </header>

      {!showPlan ? (
        <UserFormComponent onSubmit={handleUserProfileSubmit} />
      ) : (
        <>
          {userProfile && trainingPlan && (
            <TrainingPlanDisplay
              userProfile={userProfile}
              trainingPlan={trainingPlan}
              onReset={handleResetPlan}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
