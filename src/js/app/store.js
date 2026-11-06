import { storage } from "../core/storage.js";
import { defaultStudent, seedNotes } from "../data/student.js";

/** Frontend state kept in this browser only (localStorage). Never holds passwords or payment details. */
const K = { profile: "nv-student", notes: "nv-notes", read: "nv-notifs-read" };
const read = (k, fallback) => { try { return JSON.parse(storage.get(k)) ?? fallback; } catch { return fallback; } };
const write = (k, v) => storage.set(k, JSON.stringify(v));

/** "-5" / "+7" (days from today) to an ISO date. */
export const daysFromToday = (n) => { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + Number(n)); return d.toISOString(); };
export const asDate = (v) => (/^[+-]\d+$/.test(String(v)) ? new Date(daysFromToday(v)) : new Date(v));

export const store = {
  getProfile: () => ({ ...defaultStudent, ...read(K.profile, {}) }),
  saveProfile: (p) => write(K.profile, p),
  getNotes() {
    let notes = read(K.notes, null);
    if (!notes) { notes = seedNotes.map((n) => ({ ...n, date: daysFromToday(n.date) })); write(K.notes, notes); }
    return notes;
  },
  saveNotes: (n) => write(K.notes, n),
  notificationsRead: () => read(K.read, false) === true,
  markNotificationsRead: () => write(K.read, true),
};
