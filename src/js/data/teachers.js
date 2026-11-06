/** Single source for instructor profiles. Home 1, Home 2 and the Teachers page all render from this list.
 *
 *  PROVISIONAL SAMPLE CONTENT. Names, titles, biographies and teaching years are sample profiles written
 *  for this preview, not verified academy faculty. Replace them with real faculty details when supplied.
 *  No awards, credentials or named gurus are claimed anywhere in these profiles.
 *
 *  Images are TEMPORARY neutral photographs of museum objects (CC0). They are NOT portraits of these people and
 *  are deliberately not matched to each teacher's discipline.
 *  To use a real portrait later, change `image` and `alt` only. See ATTRIBUTION.md.
 *
 *  Fields
 *    id, name, role, discipline, experience, bio     – used by the Home 1 / Home 2 cards (short)
 *    specialization (string[])                       – chips on the Teachers page
 *    profile (string[])                              – full biography, one paragraph per entry
 *    approach                                        – one-sentence teaching approach (pull quote)
 *    teaches                                         – who / what the instructor teaches
 *    image, alt, imageFit                            – Teachers page photograph; imageFit is the CSS object-position
 *    imageHome1/altHome1, imageHome2/altHome2        – the photograph shown on Home 1 / Home 2 (a different file for each placement)
 */
export const teachers = [
  {
    id: "lakshmi-narayanan",
    name: "Vidushi Lakshmi Narayanan",
    role: "Head of Vocal",
    discipline: "Carnatic Vocal",
    experience: "28 years of teaching",
    bio: "Concert vocalist known for patient voice training and manodharma.",
    specialization: ["Voice culture", "Kritis and varnams", "Manodharma"],
    profile: [
      "Lakshmi leads the vocal programme. She is a concert vocalist who began teaching in her early twenties and has taught students of every age since.",
      "Her classes start with the voice: steady shruti, clear sahitya, and an ear that notices the smallest slip in pitch. Repertoire and raga elaboration grow from that base.",
    ],
    approach: "A steady voice first. Everything beautiful in a raga is built on it.",
    teaches: "Beginners to advanced vocal students, children and adults",
    image: "assets/images/photos/neutral-1.jpg",
    imageFit: "50% 50%",
    alt: "A hand drum with a patterned shell, photographed against a white background",
    // Home 1 and Home 2 each show their own photograph so no image repeats across the site.
    imageHome1: "assets/images/photos/teacher-h1-a.jpg", altHome1: "A decorated Tanjore tambura against a pale grey backdrop",
    imageHome2: "assets/images/photos/teacher-h2-a.jpg", altHome2: "A close view of the lashed bamboo neck and frets of a veena",
  },
  {
    id: "raghavan-sundar",
    name: "Vidwan Raghavan Sundar",
    role: "Founder and Lead Veena Guru",
    discipline: "Veena",
    experience: "40 years of teaching",
    bio: "Veena artist who builds technique through listening and repertoire.",
    specialization: ["Veena technique", "Advanced repertoire", "Raga and tala depth"],
    profile: [
      "Raghavan founded the academy and is its senior teacher for both the veena and advanced Carnatic study. He is a veena artist with four decades of teaching behind him.",
      "He teaches the veena as a singing instrument: students listen to a phrase, sing it, and only then play it. Senior vocal and veena students come to him for repertoire, raga depth and the discipline of laya.",
    ],
    approach: "Listen, sing it, then play it. The instrument should only repeat what the mind already hears.",
    teaches: "Intermediate and advanced veena; senior Carnatic students across vocal and instrument",
    image: "assets/images/photos/neutral-2.jpg",
    imageFit: "50% 50%",
    alt: "The ornately inlaid back of a Tanjore tambura",
    // Home 1 and Home 2 each show their own photograph so no image repeats across the site.
    imageHome1: "assets/images/photos/teacher-h1-b.jpg", altHome1: "A tall stringed instrument of the tambura family, photographed against a plain background",
    imageHome2: "assets/images/photos/teacher-h2-b.jpg", altHome2: "An old compound stringed instrument with a long neck and ornamental top",
  },
  {
    id: "meenakshi-subramanian",
    name: "Vidushi Meenakshi Subramanian",
    role: "Veena and Young Learners",
    discipline: "Veena",
    experience: "16 years of teaching",
    bio: "Specialises in gamaka technique and in first lessons for children.",
    specialization: ["Gamaka technique", "First lessons", "Young learners"],
    profile: [
      "Meenakshi teaches the veena to beginners and to young learners. She has spent sixteen years turning a first nervous pluck into a steady, confident sound.",
      "Her lessons are short, structured and cheerful: posture, fingering and a small piece to play at home every week. Gamakas are introduced early so that students learn how a raga should sound.",
    ],
    approach: "Small steps, played every day. A child who enjoys practice will keep playing.",
    teaches: "Beginner veena, children's first lessons, gamaka foundations",
    image: "assets/images/photos/neutral-3.jpg",
    imageFit: "50% 50%",
    alt: "A Tanjore tambura standing against a grey backdrop",
    // Home 1 and Home 2 each show their own photograph so no image repeats across the site.
    imageHome1: "assets/images/photos/teacher-h1-c.jpg", altHome1: "A carved peacock-head ornament on the end of a veena",
    imageHome2: "assets/images/photos/teacher-h2-c.jpg", altHome2: "The carved ornamental top of an old Indian stringed instrument",
  },
];
