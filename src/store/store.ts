import Session from "../models/Session";
import IStore from "../models/Store";
import Workout from "../models/Workout";

export class Store implements IStore {
  private _storage: Storage;
  public sessions: Session[];
  public workouts: Workout[];

  constructor(localStorage: Storage) {
    this._storage = localStorage;
    this.sessions = [];
    this.workouts = [];

    this.load();
  }

  /* Default Local Storage methods */

  private get(key: string): string | null {
    return this._storage.getItem(key);
  }

  private set(key: string, value: string): void {
    this._storage.setItem(key, value);
  }

  /* Custom methods */

  load(): void {
    const sessions = this.get("sessions");
    const workouts = this.get("workouts");

    if (sessions) {
      this.sessions = JSON.parse(sessions);
    }

    if (workouts) {
      this.workouts = JSON.parse(workouts);
    }
  }

  save(): void {
    this.set("sessions", JSON.stringify(this.sessions));
    this.set("workouts", JSON.stringify(this.workouts));
  }

  /* Getters & Setters */

  getSession(id: string): Session | undefined {
    return this.sessions.find(s => s.id === id);;
  }

  getWorkout(id: string): Workout | undefined {
    return this.workouts.find(w => w.id === id);
  }

  insertSession(session: Session): void {
    this.sessions.push(session);
  }

  insertWorkout(workout: Workout): void {
    this.workouts.push(workout);
  }

  deleteSession(id: string): void {
    this.sessions = this.sessions.filter(s => s.id !== id);
  }

  deleteWorkout(id: string): void {
    this.workouts = this.workouts.filter(w => w.id !== id);
  }
}

export default Store;