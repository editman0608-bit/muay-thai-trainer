// muayThaiTrainer.ts
import { UserProfile, TrainingPlan, TrainingSession, Exercise } from './types';

export class MuayThaiTrainer {
  private static readonly WARMUP_EXERCISES: Exercise[] = [
    {
      name: 'Jumping Jacks',
      duration: 60,
      description: 'Klassische Ganzkörper-Aufwärmung',
      intensity: 'low',
      technique: 'Koordination und Herzfrequenz erhöhen'
    },
    {
      name: 'Arm Circles',
      duration: 120,
      reps: 20,
      description: 'Schultervorbereitung',
      intensity: 'low',
      technique: 'Langsam nach vorne und hinten drehen'
    },
    {
      name: 'High Knees',
      duration: 120,
      description: 'Beine aktivieren',
      intensity: 'medium',
      technique: 'Zügig an Stelle laufen mit hohen Knien'
    },
    {
      name: 'Shadowboxing',
      duration: 180,
      description: 'Muay Thai spezifisches Aufwärmen',
      intensity: 'medium',
      technique: 'Langsam mit korrekter Technik beginnen'
    }
  ];

  private static readonly COOL_DOWN_EXERCISES: Exercise[] = [
    {
      name: 'Leichte Dehnungen',
      duration: 300,
      description: 'Ganzkörper dehnen',
      intensity: 'low',
      technique: '30 Sekunden pro Muskelgruppe'
    },
    {
      name: 'Atemübungen',
      duration: 120,
      description: 'Herzfrequenz normalisieren',
      intensity: 'low',
      technique: 'Tiefe, langsame Atemzüge'
    }
  ];

  static generateTrainingPlan(userProfile: UserProfile): TrainingPlan {
    const sessions: TrainingSession[] = [];

    for (let day = 1; day <= userProfile.trainingDaysPerWeek; day++) {
      sessions.push(
        this.generateTrainingSession(day, userProfile)
      );
    }

    return {
      id: `plan_${Date.now()}`,
      userId: userProfile.id,
      name: `Muay Thai Plan für ${userProfile.name}`,
      duration: 8, // 8 Wochen
      sessions,
      tips: this.generateTips(userProfile),
      nutritionAdvice: this.generateNutritionAdvice(userProfile),
      createdAt: new Date(),
      createdBy: 'MuayThaiTrainer AI'
    };
  }

  private static generateTrainingSession(
    day: number,
    profile: UserProfile
  ): TrainingSession {
    const difficulty = this.calculateDifficulty(profile.experience, day);
    const focusAreas = this.selectFocusAreas(profile, day);

    const mainExercises = this.generateMainExercises(
      profile,
      focusAreas,
      difficulty
    );

    return {
      id: `session_${day}_${Date.now()}`,
      day,
      title: `Tag ${day} - ${focusAreas.join(', ')}`,
      warmup: [...this.WARMUP_EXERCISES],
      main: mainExercises,
      cool: [...this.COOL_DOWN_EXERCISES],
      focusAreas,
      difficulty,
      estimatedDuration: this.calculateSessionDuration(
        profile.sessionDurationMinutes,
        difficulty
      )
    };
  }

  private static selectFocusAreas(
    profile: UserProfile,
    day: number
  ): string[] {
    const areas: string[] = [];

    if (profile.preferences.footworkFocus >= 3 && day % 2 === 1) {
      areas.push('Footwork & Bewegung');
    }
    if (profile.preferences.clinchWork >= 3 && day % 3 === 1) {
      areas.push('Clinch Techniken');
    }
    if (profile.preferences.padWork >= 4) {
      areas.push('Pad Work');
    }
    if (profile.preferences.sparring >= 4 && day % 4 === 0) {
      areas.push('Sparring Vorbereitung');
    }
    if (profile.preferences.strengthTraining >= 3) {
      areas.push('Kraft & Kondition');
    }

    return areas.length > 0 ? areas : ['Grundtechniken'];
  }

  private static generateMainExercises(
    profile: UserProfile,
    focusAreas: string[],
    difficulty: 'easy' | 'moderate' | 'hard'
  ): Exercise[] {
    const exercises: Exercise[] = [];

    if (focusAreas.includes('Footwork & Bewegung')) {
      exercises.push(
        ...this.getFootworkExercises(difficulty)
      );
    }

    if (focusAreas.includes('Pad Work')) {
      exercises.push(
        ...this.getPadWorkExercises(profile.preferences.padWork, difficulty)
      );
    }

    if (focusAreas.includes('Clinch Techniken')) {
      exercises.push(
        ...this.getClinchExercises(difficulty)
      );
    }

    if (focusAreas.includes('Kraft & Kondition')) {
      exercises.push(
        ...this.getStrengthExercises(profile.weight, difficulty)
      );
    }

    if (focusAreas.includes('Sparring Vorbereitung')) {
      exercises.push(
        ...this.getSparringPrep(difficulty)
      );
    }

    return exercises;
  }

  private static getFootworkExercises(
    difficulty: 'easy' | 'moderate' | 'hard'
  ): Exercise[] {
    const baseExercises: Exercise[] = [
      {
        name: 'Basic Stance & Footwork',
        duration: 300,
        description: 'Grundposition und Seitbewegungen',
        intensity: 'low',
        technique: 'Schulterbreiter Stand, kleine schnelle Schritte'
      },
      {
        name: 'Switch Stance',
        duration: 240,
        description: 'Seitenwechsel trainieren',
        intensity: 'medium',
        technique: 'Flüssiger Übergang zwischen southpaw und orthodox'
      },
      {
        name: 'Circular Movement',
        duration: 300,
        description: 'Kreisbewegungen um Gegner',
        intensity: 'medium',
        technique: 'Mit Gegner imaginär um Ring bewegen'
      }
    ];

    if (difficulty === 'hard') {
      baseExercises.push({
        name: 'Advance & Retreat Drills',
        duration: 240,
        description: 'Angreifen und Zurückweichen',
        intensity: 'high',
        technique: 'Schnelle Positionswechsel mit Angriffen kombinieren'
      });
    }

    return baseExercises;
  }

  private static getPadWorkExercises(
    intensity: number,
    difficulty: 'easy' | 'moderate' | 'hard'
  ): Exercise[] {
    return [
      {
        name: 'Basic Combo Drills',
        duration: 240,
        sets: 3,
        description: 'Grundkombinationen auf Pads',
        intensity: difficulty === 'easy' ? 'low' : 'medium',
        technique: '1-2, 1-2-3, 4-2-3 Kombinationen'
      },
      {
        name: 'Heavy Pad Work',
        duration: 180,
        sets: intensity >= 4 ? 4 : 3,
        description: 'Kraft und Technik kombinieren',
        intensity: 'high',
        technique: 'Mit Power schlagen, Technik beibehalten'
      },
      {
        name: 'Speed Rounds',
        duration: 150,
        sets: 3,
        description: 'Schnelligkeitstraining',
        intensity: 'medium',
        technique: 'Schnelle Kombinationen mit Genauigkeit'
      }
    ];
  }

  private static getClinchExercises(
    difficulty: 'easy' | 'moderate' | 'hard'
  ): Exercise[] {
    return [
      {
        name: 'Clinch Position',
        duration: 180,
        description: 'Korrekte Clinch Haltung',
        intensity: 'low',
        technique: 'Arme über Kopf, eng zusammen'
      },
      {
        name: 'Clinch Knees',
        duration: 240,
        reps: 20,
        sets: 3,
        description: 'Knie aus dem Clinch',
        intensity: 'medium',
        technique: 'Hüfte drehen, Kraft von unten'
      },
      {
        name: 'Clinch Combinations',
        duration: 300,
        sets: difficulty === 'hard' ? 4 : 3,
        description: 'Komplexe Clinch Techniken',
        intensity: difficulty === 'hard' ? 'high' : 'medium',
        technique: 'Knees, Elbows, Trips kombinieren'
      }
    ];
  }

  private static getStrengthExercises(
    weight: number,
    difficulty: 'easy' | 'moderate' | 'hard'
  ): Exercise[] {
    const exercises: Exercise[] = [
      {
        name: 'Push-ups',
        duration: 120,
        reps: weight > 80 ? 15 : 20,
        sets: 3,
        description: 'Kraft für Schläge',
        intensity: 'medium',
        technique: 'Korrektes Form beibehalten'
      },
      {
        name: 'Planks',
        duration: 180,
        sets: 3,
        description: 'Kernstabilität',
        intensity: 'medium',
        technique: 'Gerade Linie vom Kopf zu Fersen'
      },
      {
        name: 'Squats',
        duration: 120,
        reps: 20,
        sets: 3,
        description: 'Beinarbeit stärken',
        intensity: 'medium',
        technique: 'Tiefe beibehalten'
      }
    ];

    if (difficulty === 'hard') {
      exercises.push({
        name: 'Explosive Plyometrics',
        duration: 240,
        reps: 15,
        sets: 3,
        description: 'Explosive Kraft',
        intensity: 'high',
        technique: 'Explosive Bewegungen, kontrollierte Landung'
      });
    }

    return exercises;
  }

  private static getSparringPrep(
    difficulty: 'easy' | 'moderate' | 'hard'
  ): Exercise[] {
    return [
      {
        name: 'Defense Drills',
        duration: 240,
        sets: 3,
        description: 'Defensivedynamiken trainieren',
        intensity: 'medium',
        technique: 'Gegen imaginäre Angriffe defensieren'
      },
      {
        name: 'Counter Practice',
        duration: 240,
        sets: 3,
        description: 'Konter trainieren',
        intensity: 'medium',
        technique: 'Angriff mit Kontern beantworten'
      },
      {
        name: 'Light Sparring Simulation',
        duration: difficulty === 'hard' ? 300 : 240,
        sets: difficulty === 'hard' ? 3 : 2,
        description: 'Leichtes Sparring simulieren',
        intensity: 'medium',
        technique: '30-50% Kraft, volle Technik'
      }
    ];
  }

  private static calculateDifficulty(
    experience: 'beginner' | 'intermediate' | 'advanced',
    day: number
  ): 'easy' | 'moderate' | 'hard' {
    if (experience === 'beginner') return day % 3 === 0 ? 'moderate' : 'easy';
    if (experience === 'intermediate') return day % 2 === 0 ? 'hard' : 'moderate';
    return 'hard';
  }

  private static calculateSessionDuration(
    baseMinutes: number,
    difficulty: 'easy' | 'moderate' | 'hard'
  ): number {
    const multipliers = {
      easy: 0.8,
      moderate: 1,
      hard: 1.2
    };
    return Math.round(baseMinutes * multipliers[difficulty]);
  }

  private static generateTips(profile: UserProfile): string[] {
    const tips: string[] = [
      '🥋 Immer auf korrektes Footwork konzentrieren - es ist die Basis allem!',
      '💪 Kraft ohne Technik ist wertlos - Technik ist Priorität',
      '🛡️ Ständig Ihre Kopfbewegung trainieren und Verteidigung verbessern',
      '🩹 Dehnen Sie mindestens 10 Minuten täglich um Verletzungen zu vermeiden',
      '⏰ Konsistenz schlägt Intensität - regelmäßiges Training ist wichtiger als wilde Tage'
    ];

    if (profile.experience === 'beginner') {
      tips.push(
        '📚 Mit einem Trainer arbeiten um schlechte Gewohnheiten zu vermeiden',
        '🎯 Fokus auf Grundlagen legen - kein komplexes Zeug noch'
      );
    }

    if (profile.preferences.clinchWork >= 4) {
      tips.push(
        '🔗 Clinch Arbeit erfordert starke Hüften und Kern - trainieren Sie diese!',
        '🦵 Knie aus dem Clinch kommen aus der Rotation, nicht nur den Hüften'
      );
    }

    if (profile.experience === 'advanced') {
      tips.push(
        '⚡ Integrieren Sie komplexere Kombinationen und Timing Arbeit',
        '🎪 Sparring ist wichtig - üben Sie in echten Szenarien'
      );
    }

    return tips;
  }

  private static generateNutritionAdvice(profile: UserProfile): string[] {
    const bmi = profile.weight / ((profile.height / 100) ** 2);
    const advice: string[] = [];

    advice.push(
      '🥗 Essen Sie ausreichend Protein für Muskelaufbau und Erholung (1.6-2g pro kg Körpergewicht)',
      '💧 Trinken Sie mindestens 3 Liter Wasser pro Tag',
      '🍌 Nehmen Sie vor dem Training komplexe Kohlenhydrate zu sich',
      '🥚 Nach dem Training: Protein + Kohlenhydrate innerhalb 30 Minuten'
    );

    if (bmi < 20) {
      advice.push(
        '⬆️ Sie könnten etwas Gewicht zulegen - essen Sie mehr Kalorien für Kraftaufbau'
      );
    } else if (bmi > 25) {
      advice.push(
        '⬇️ Leichtes Kaloriendefizit könnte helfen - fokus auf mageres Protein'
      );
    }

    if (profile.trainingDaysPerWeek >= 5) {
      advice.push(
        '⚡ Mit intensivem Training: zusätzliche Kohlenhydrate und Elektrolyte'
      );
    }

    return advice;
  }
}
