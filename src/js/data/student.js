/**
 * Student portal content: the single source for everything the dashboard shows.
 * PROVISIONAL CONTENT: the student, lessons, notes, payments and announcements are placeholders
 * written to complete the interface. Replace them with real records when a backend exists.
 * Instructors come from data/teachers.js so names stay consistent across the whole site.
 * Dates are generated relative to today so the portal never shows stale timetables.
 */
import { teachers } from "./teachers.js";

export const defaultStudent = {
  name: "Ananya Krishnan",
  email: "ananya.krishnan@example.com",
  phone: "+91 98765 00000",
  course: "veena", // "veena" | "vocal"
  joined: "June 2026",
};

const by = (id) => teachers.find((t) => t.id === id);

export const courses = {
  veena: {
    label: "Veena",
    level: "Level 2 · Intermediate",
    instructor: by("meenakshi-subramanian"),
    focus: "Mohanam varnam, second speed",
    progress: 62,
    milestones: [
      { title: "Posture and plucking", detail: "Holding the veena, tuning and a clean pluck", state: "done" },
      { title: "Sarali varisai and alankaras", detail: "Steady fingering in three speeds", state: "done" },
      { title: "Geethams", detail: "Simple songs in Malahari and Mohanam", state: "done" },
      { title: "Varnam in Mohanam", detail: "Second speed and gamakas", state: "current" },
      { title: "First kriti", detail: "Introduced once the varnam is secure", state: "next" },
    ],
    topics: ["Mohanam varnam: pallavi and anupallavi", "Gamaka practice on the second string", "Mohanam varnam: charanam", "Mohanam varnam: second speed, first half", "Tala practice with the hands", "Mohanam varnam: second speed, full", "Introduction to a kriti", "Revision and recording"],
  },
  vocal: {
    label: "Carnatic Vocal",
    level: "Level 2 · Intermediate",
    instructor: by("lakshmi-narayanan"),
    focus: "Mohanam varnam, second speed",
    progress: 62,
    milestones: [
      { title: "Voice culture and shruti", detail: "Holding the tonic and clear breath", state: "done" },
      { title: "Sarali varisai and alankaras", detail: "Steady pitch in three speeds", state: "done" },
      { title: "Geethams", detail: "Simple songs in Malahari and Mohanam", state: "done" },
      { title: "Varnam in Mohanam", detail: "Second speed and gamakas", state: "current" },
      { title: "First kriti", detail: "Introduced once the varnam is secure", state: "next" },
    ],
    topics: ["Mohanam varnam: pallavi and anupallavi", "Gamaka practice on long notes", "Mohanam varnam: charanam", "Mohanam varnam: second speed, first half", "Tala practice with the hands", "Mohanam varnam: second speed, full", "Introduction to a kriti", "Revision and recording"],
  },
};

/** Weekly lesson slot used to generate the timetable. */
export const slot = { dow: 6, time: "5:00 pm", length: "60 minutes" }; // Saturday

export function buildClasses(courseKey, now = new Date()) {
  const c = courses[courseKey];
  const at = new Date(now); at.setHours(17, 0, 0, 0);
  const next = new Date(at);
  next.setDate(at.getDate() + ((slot.dow - at.getDay() + 7) % 7 || 7));
  if (at.getDay() === slot.dow && now < at) next.setTime(at.getTime());
  const week = (n) => { const d = new Date(next); d.setDate(next.getDate() + 7 * n); return d; };
  const upcoming = [0, 1, 2, 3].map((n) => ({ date: week(n), topic: c.topics[4 + n], status: n === 0 ? "next" : "scheduled" }));
  const completed = [-1, -2, -3, -4].map((n, i) => ({ date: week(n), topic: c.topics[3 - i], status: "completed" }));
  return { upcoming, completed };
}

export const practiceWeek = [
  { day: "Mon", minutes: 25 }, { day: "Tue", minutes: 35 }, { day: "Wed", minutes: 0 }, { day: "Thu", minutes: 30 },
  { day: "Fri", minutes: 40 }, { day: "Sat", minutes: 20 }, { day: "Sun", minutes: 30 },
];
export const practiceGoal = 30; // minutes per day

export const seedNotes = [
  { id: "n1", title: "Mohanam varnam: second speed", topic: "Varnam", date: "-2", status: "pending",
    instructions: "Play the pallavi and anupallavi three times, slowly, then once at speed. Keep the tala with your left hand.",
    notes: "Rushing the gamaka on the second note. Slow down and let it settle." },
  { id: "n2", title: "Sarali varisai warm-up", topic: "Foundations", date: "-5", status: "completed",
    instructions: "Ten minutes of sarali varisai in three speeds before any other practice.",
    notes: "Steady in all three speeds. Keep this as a daily warm-up." },
  { id: "n3", title: "Malahari geetham revision", topic: "Geetham", date: "-9", status: "completed",
    instructions: "Sing or play the geetham from memory, then check against the recording.",
    notes: "Two small slips in the last line. Revisit once a week." },
  { id: "n4", title: "Tala practice: adi tala", topic: "Rhythm", date: "-12", status: "pending",
    instructions: "Keep adi tala with the hands while counting aloud. Add the Mohanam phrases once the tala feels automatic.",
    notes: "" },
];

export const payments = [
  { id: "INV-2026-0031", item: "Registration and admission", date: "-150", amount: 1000, status: "paid" },
  { id: "INV-2026-0036", item: "Monthly tuition: September", date: "-62", amount: 2500, status: "paid" },
  { id: "INV-2026-0041", item: "Monthly tuition: October", date: "-31", amount: 2500, status: "paid" },
  { id: "INV-2026-0047", item: "Monthly tuition: November", date: "+7", amount: 2500, status: "due" },
];

export const announcements = [
  { id: "a1", tone: "info", title: "Student recital", text: "Your instructor will share the date and the pieces to prepare for the next recital." },
  { id: "a2", tone: "muted", title: "Practice reminder", text: "A short daily practice is better than one long session. Aim for 30 minutes." },
  { id: "a3", tone: "muted", title: "Instrument care", text: "Wipe the strings after practice and keep the instrument away from damp walls." },
];

export const notifications = [
  { id: "x1", title: "Next class confirmed", text: "Your weekly lesson is confirmed.", time: "2 hours ago" },
  { id: "x2", title: "Practice note added", text: "Your instructor added a note: Mohanam varnam, second speed.", time: "Yesterday" },
  { id: "x3", title: "Payment due soon", text: "Your November tuition invoice is ready.", time: "2 days ago" },
];

export const activity = [
  { text: "Attended class: Mohanam varnam, second speed", when: "-7", icon: "classes" },
  { text: "Marked “Sarali varisai warm-up” as completed", when: "-5", icon: "check" },
  { text: "Payment received for October tuition", when: "-31", icon: "payments" },
  { text: "Instructor added a practice note", when: "-9", icon: "notes" },
];
