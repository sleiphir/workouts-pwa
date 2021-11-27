export type Workout = {
  id: string;
  name: string;
  exercises: Exercise[];
}

export type Exercise = {
  name: string;
  media: string;
  sets: Set[];
}

export type Set = {
  reps: number;
  weight: number;
}

export default Workout;