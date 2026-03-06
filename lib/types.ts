export interface Exercise {
  id: string;
  name: string;
  description: string;
  series: number;
  reps: string;
  rest: number; // in seconds
  location: 'Casa' | 'Gym';
  level: string;
  image: any;
}

export interface DayRoutine {
  day: string;
  title: string;
  exercises: Exercise[];
}

export interface UserProgress {
  completedExerciseIds: string[];
  currentDay: string; // e.g., 'Lunes'
}
