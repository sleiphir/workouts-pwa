import Session from "./Session";
import Workout from "./Workout";

export interface IStore {
  sessions: Session[];
  workouts: Workout[];

  getSession(id: string): Session | undefined;
  getWorkout(id: string): Workout | undefined;
  insertSession(session: Session): void;
  insertWorkout(workout: Workout): void;
  deleteSession(id: string): void;
  deleteWorkout(id: string): void;
}

export default IStore;