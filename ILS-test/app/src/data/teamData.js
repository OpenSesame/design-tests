export const team = {
  name: 'North America Sales',
  manager: 'Alex Rivera',
}

export const teamMembers = [
  {
    id: 1,
    name: 'Jordan Lee',
    role: 'Senior Analyst',
    avatar: 'https://i.pravatar.cc/150?img=3',
    streak: 4,
    status: 'on-track',
    assigned: [{ id: 'c1', title: 'Leading with Influence', progress: 80 }],
    skills: [
      { name: 'Leadership',    proficiency: 78 },
      { name: 'Finance',       proficiency: 60 },
      { name: 'Communication', proficiency: 52 },
      { name: 'Data Literacy', proficiency: 35 },
    ],
    skillGaps: [
      { name: 'Data Literacy', current: 35, target: 70 },
    ],
    trainingHistory: [
      { title: 'Effective 1:1s',         type: 'Course', date: 'Mar 2024', duration: '45 min', skill: 'Leadership' },
      { title: 'Finance Fundamentals',   type: 'Course', date: 'Feb 2024', duration: '2h',     skill: 'Finance' },
      { title: 'Leadership Foundations', type: 'Path',   date: 'Jan 2024', duration: '6h',     skill: 'Leadership' },
      { title: 'Conflict Resolution',    type: 'Course', date: 'Nov 2023', duration: '1h 20m', skill: 'Communication' },
    ],
  },
  {
    id: 2,
    name: 'Maya Chen',
    role: 'Product Analyst',
    avatar: 'https://i.pravatar.cc/150?img=5',
    streak: 0,
    status: 'at-risk',
    assigned: [{ id: 'c2', title: 'Data Storytelling', progress: 20 }],
    skills: [
      { name: 'Communication', proficiency: 45 },
      { name: 'Data Literacy', proficiency: 40 },
      { name: 'Leadership',    proficiency: 22 },
      { name: 'Finance',       proficiency: 30 },
    ],
    skillGaps: [
      { name: 'Leadership',    current: 22, target: 60 },
      { name: 'Finance',       current: 30, target: 55 },
    ],
    trainingHistory: [
      { title: 'Storytelling with Data', type: 'Course', date: 'Jan 2024', duration: '1h 30m', skill: 'Data Literacy' },
      { title: 'Excel Essentials',       type: 'Course', date: 'Oct 2023', duration: '3h',     skill: 'Data Literacy' },
    ],
  },
  {
    id: 3,
    name: 'Darius Webb',
    role: 'Operations Lead',
    avatar: 'https://i.pravatar.cc/150?img=7',
    streak: 12,
    status: 'on-track',
    assigned: [],
    skills: [
      { name: 'Leadership',    proficiency: 82 },
      { name: 'DEI',           proficiency: 75 },
      { name: 'Communication', proficiency: 70 },
      { name: 'Finance',       proficiency: 48 },
    ],
    skillGaps: [
      { name: 'Finance', current: 48, target: 65 },
    ],
    trainingHistory: [
      { title: 'Inclusive Leadership',   type: 'Course', date: 'Apr 2024', duration: '45 min', skill: 'Leadership' },
      { title: 'Managing Up',            type: 'Course', date: 'Mar 2024', duration: '1h',     skill: 'Leadership' },
      { title: 'Operations Strategy',    type: 'Path',   date: 'Feb 2024', duration: '4h',     skill: 'Communication' },
      { title: 'DEI in Practice',        type: 'Course', date: 'Dec 2023', duration: '2h',     skill: 'DEI' },
      { title: 'Team Dynamics',          type: 'Course', date: 'Oct 2023', duration: '1h 30m', skill: 'Leadership' },
    ],
  },
  {
    id: 4,
    name: 'Sofia Reyes',
    role: 'Business Analyst',
    avatar: 'https://i.pravatar.cc/150?img=9',
    streak: 2,
    status: 'behind',
    assigned: [{ id: 'c3', title: 'Financial Acumen', progress: 55 }],
    skills: [
      { name: 'Finance',       proficiency: 55 },
      { name: 'Data Literacy', proficiency: 42 },
      { name: 'Communication', proficiency: 38 },
      { name: 'Leadership',    proficiency: 28 },
    ],
    skillGaps: [
      { name: 'Leadership',        current: 28, target: 60 },
      { name: 'Communication',     current: 38, target: 65 },
      { name: 'Data Literacy',     current: 42, target: 70 },
      { name: 'Negotiation',       current: 20, target: 55 },
      { name: 'Strategic Thinking',current: 15, target: 50 },
    ],
    trainingHistory: [
      { title: 'Business Writing',    type: 'Course', date: 'Feb 2024', duration: '2h',  skill: 'Communication' },
      { title: 'SQL for Analysts',    type: 'Course', date: 'Jan 2024', duration: '3h',  skill: 'Data Literacy' },
    ],
  },
]

export const teamSkillGaps = [
  { skill: 'Leadership',        weak: 3, total: 4, criticality: 9, criticalityLabel: 'Critical' },
  { skill: 'Data Literacy',     weak: 2, total: 4, criticality: 7, criticalityLabel: 'High' },
  { skill: 'Communication',     weak: 2, total: 4, criticality: 6, criticalityLabel: 'High' },
  { skill: 'Finance',           weak: 2, total: 4, criticality: 5, criticalityLabel: 'Medium' },
  { skill: 'Negotiation',       weak: 3, total: 4, criticality: 4, criticalityLabel: 'Medium' },
  { skill: 'Strategic Thinking',weak: 2, total: 4, criticality: 3, criticalityLabel: 'Medium' },
]

export const skillInfo = {
  Leadership: {
    description: 'Ability to inspire, guide, and develop individuals toward shared goals. Critical for retaining top talent and driving team performance in a competitive sales environment.',
    content: [
      { id: 'l1', title: 'Leading with Influence',   type: 'Course',      duration: '2h 10m', thumbnail: 'https://picsum.photos/seed/lead1/200/120' },
      { id: 'l2', title: 'Coaching for Performance', type: 'Course',      duration: '1h 45m', thumbnail: 'https://picsum.photos/seed/lead5/200/120' },
      { id: 'l3', title: 'Leadership Foundations',   type: 'Path',        duration: '6h',     thumbnail: 'https://picsum.photos/seed/lead3/200/120' },
      { id: 'l4', title: 'Managing Up',              type: 'Course',      duration: '1h',     thumbnail: 'https://picsum.photos/seed/lead6/200/120' },
    ],
  },
  'Data Literacy': {
    description: 'Proficiency in interpreting, analyzing, and communicating with data. Enables the team to make confident, evidence-based decisions and build credibility with stakeholders.',
    content: [
      { id: 'd1', title: 'Data Storytelling for Leaders',  type: 'Course', duration: '1h 30m', thumbnail: 'https://picsum.photos/seed/data2/200/120' },
      { id: 'd2', title: 'SQL for Business Analysts',      type: 'Course', duration: '3h',     thumbnail: 'https://picsum.photos/seed/data4/200/120' },
      { id: 'd3', title: 'Interpreting Business Metrics',  type: 'Course', duration: '45 min', thumbnail: 'https://picsum.photos/seed/data5/200/120' },
    ],
  },
  Communication: {
    description: 'Clear and persuasive verbal and written communication. Directly impacts client relationships, internal alignment, and the team\'s ability to present ideas with conviction.',
    content: [
      { id: 'c1', title: 'Business Writing Essentials',    type: 'Course', duration: '2h',     thumbnail: 'https://picsum.photos/seed/comm1/200/120' },
      { id: 'c2', title: 'Presenting with Confidence',     type: 'Course', duration: '1h 20m', thumbnail: 'https://picsum.photos/seed/comm2/200/120' },
      { id: 'c3', title: 'Difficult Conversations',        type: 'Course', duration: '1h',     thumbnail: 'https://picsum.photos/seed/comm3/200/120' },
    ],
  },
  Finance: {
    description: 'Understanding of financial concepts, budgeting, and P&L interpretation. Equips the team to speak the language of business and engage more meaningfully with finance stakeholders.',
    content: [
      { id: 'f1', title: 'Finance for Non-Finance Managers', type: 'Course', duration: '3h',     thumbnail: 'https://picsum.photos/seed/fin4/200/120' },
      { id: 'f2', title: 'Reading Financial Statements',     type: 'Course', duration: '1h 30m', thumbnail: 'https://picsum.photos/seed/fin2/200/120' },
      { id: 'f3', title: 'Financial Acumen',                 type: 'Path',   duration: '4h',     thumbnail: 'https://picsum.photos/seed/fin3/200/120' },
    ],
  },
}

export const catalogSuggestions = [
  { id: 's1', title: 'Leading with Influence',           type: 'Course', duration: '2h 10m', thumbnail: 'https://picsum.photos/seed/lead1/200/120' },
  { id: 's2', title: 'Data Storytelling for Leaders',    type: 'Course', duration: '1h 30m', thumbnail: 'https://picsum.photos/seed/data2/200/120' },
  { id: 's3', title: 'Inclusive Leadership',             type: 'Course', duration: '45 min', thumbnail: 'https://picsum.photos/seed/dei3/200/120' },
  { id: 's4', title: 'Finance for Non-Finance Managers', type: 'Course', duration: '3h',     thumbnail: 'https://picsum.photos/seed/fin4/200/120' },
]

export const activePrograms = [
  { id: 'p1', title: 'Leading with Influence', completed: 3, total: 4, thumbnail: 'https://picsum.photos/seed/lead1/96/96' },
  { id: 'p2', title: 'Data Storytelling',      completed: 1, total: 4, thumbnail: 'https://picsum.photos/seed/data2/96/96' },
  { id: 'p3', title: 'Financial Acumen',       completed: 2, total: 4, thumbnail: 'https://picsum.photos/seed/fin4/96/96' },
]

export const statusConfig = {
  'on-track': { label: 'On track', bg: 'rgba(0,180,130,0.15)',  color: '#00b482' },
  'at-risk':  { label: 'At risk',  bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' },
  'behind':   { label: 'Behind',   bg: 'rgba(239,68,68,0.15)',  color: '#ef4444' },
}
