// types.ts
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  weight: number; // in kg
  height: number; // in cm
  experience: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  injuries: string[];
  trainingDaysPerWeek: number;
  sessionDurationMinutes: number;
  preferences: {
    footworkFocus: number; // 1-5
    clinchWork: number; // 1-5
    padWork: number; // 1-5
    sparring: number; // 1-5
    strengthTraining: number; // 1-5
  };
  createdAt: Date;
}

export interface TrainingSession {
  id: string;
  day: number;
  title: string;
  warmup: Exercise[];
  main: Exercise[];
  cool: Exercise[];
  focusAreas: string[];
  difficulty: 'easy' | 'moderate' | 'hard';
  estimatedDuration: number;
}

export interface Exercise {
  name: string;
  duration: number; // in seconds
  reps?: number;
  sets?: number;
  description: string;
  intensity: 'low' | 'medium' | 'high';
  technique: string;
}

export interface TrainingPlan {
  id: string;
  userId: string;
  name: string;
  duration: number; // in weeks
  sessions: TrainingSession[];
  tips: string[];
  nutritionAdvice: string[];
  createdAt: Date;
  createdBy: string;
}

export interface TrainingTip {
  category: string;
  title: string;
  content: string;
  difficulty: string;
}
