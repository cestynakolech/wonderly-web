// src/data/vlna-6-denik-cesty/entries.ts
export interface Entry {
  id: number;
  location: string;
  title: string;
  description: string;
  physicsTopics: string[];
  author: string;
  date: string;
  image: string;
  likes: number;
  qrCode?: string;
  coordinates?: { lat: number; lng: number };
}

export const sampleEntries: Entry[] = [
  {
    id: 1,
    location: 'Praha - Petřín',
    title: 'Kde vidím gravitaci?',
    description: 'Pozorování vlivu tíhové síly v přírodě. Jsem na zámku Petřín a podívám se, jak padají listy z stromů a jak gravitace mění jejich dráhu...',
    physicsTopics: ['Gravitace', 'Pohyb', 'Padání'],
    author: 'Jana K.',
    date: '24. srp 2026',
    image: '🏰',
    likes: 42,
    coordinates: { lat: 50.0833, lng: 14.4 },
  },
  {
    id: 2,
    location: 'Krkonoše - Pec pod Sněžkou',
    title: 'Energie ve výšce - skok z balvanu',
    description: 'Jak se mění potenciální energie na kinetickou? Měřím si výšku a padám dolů. Fyzika v praxi! Energie se zachovává.',
    physicsTopics: ['Energie', 'Dynamika', 'Pohyb'],
    author: 'Petr N.',
    date: '22. srp 2026',
    image: '⛰️',
    likes: 58,
    coordinates: { lat: 50.7364, lng: 15.7161 },
  },
  {
    id: 3,
    location: 'Vltava - Malá Strana',
    title: 'Voda a vlnění - případ řeky',
    description: 'Studuju, jak se tvoří vlny ve vodě. Házím kameny a měřím periodu kmitů. Zajímavé chování vlnění v tekutině.',
    physicsTopics: ['Vlnění', 'Optika', 'Akustika'],
    author: 'Marie V.',
    date: '20. srp 2026',
    image: '💧',
    likes: 35,
    coordinates: { lat: 50.0909, lng: 14.405 },
  },
];

export const achievements = [
  { id: 'first-entry', name: '🚀 Prvopoutník', description: 'Napsal jsi svůj první příspěvek' },
  { id: 'five-entries', name: '📝 Pilný cestovatel', description: 'Sepsals 5 příspěvků' },
  { id: 'physics-lover', name: '🔬 Fyzikář', description: 'Odhalils 10 fyzikálních konceptů' },
  { id: 'map-explorer', name: '🗺️ Průzkumce', description: 'Navštívils 5 míst na mapě' },
  { id: 'leaderboard-top10', name: '🏆 Hvězda', description: 'Dostal jsi se do TOP 10' },
];

export const physicsTopics = [
  'Gravitace',
  'Pohyb',
  'Energie',
  'Vlnění',
  'Síla',
  'Dynamika',
  'Optika',
  'Akustika',
  'Teplo',
  'Elektřina',
];
