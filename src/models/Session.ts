import Workout from "./Workout";

export type Session = {
  id: string;
  workout: Workout;
  date: Date;
  rating: number;
  comment: string;
}

export default Session;