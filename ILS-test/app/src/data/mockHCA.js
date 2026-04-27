export const hcaData = {
  orgName: 'OpenSesame Technologies',
  overallScore: 73,
  previousScore: 68,
  readinessTier: 'Silver',
  nextTier: 'Gold',
  nextTierThreshold: 75,

  velocityData: [
    { month: 'Nov', score: 61 },
    { month: 'Dec', score: 64 },
    { month: 'Jan', score: 66 },
    { month: 'Feb', score: 68 },
    { month: 'Mar', score: 71 },
    { month: 'Apr', score: 73 },
  ],

  skillGaps: [
    { skill: 'AI & Machine Learning', gapPercent: 67, atRisk: '$3.2M', department: 'Product & Engineering' },
    { skill: 'Data Analysis & Visualization', gapPercent: 54, atRisk: '$2.3M', department: 'Sales & Marketing' },
    { skill: 'Change Management', gapPercent: 48, atRisk: '$1.8M', department: 'Operations' },
    { skill: 'Cybersecurity Fundamentals', gapPercent: 41, atRisk: '$2.1M', department: 'All Departments' },
    { skill: 'Executive Communication', gapPercent: 35, atRisk: '$900K', department: 'Leadership' },
  ],

  leadingIndicators: [
    { label: 'Voluntary learning rate', value: '68%', delta: '+4pp', positive: true },
    { label: 'Skill acquisition velocity', value: '2.3 / mo', delta: '+0.4', positive: true },
    { label: 'Manager engagement rate', value: '41%', delta: '−3pp', positive: false },
  ],

  laggingIndicators: [
    { label: 'Required training compliance', value: '94%', delta: '+2pp', positive: true },
    { label: 'Turnover in critical roles', value: '11%', delta: '+1pp', positive: false },
    { label: 'Avg time-to-productivity', value: '47 days', delta: '−6 days', positive: true },
  ],
}

export const tierConfig = {
  Bronze:   { color: '#b87333', range: [0, 59] },
  Silver:   { color: '#8a8a9a', range: [60, 74] },
  Gold:     { color: '#f28132', range: [75, 89] },
  Platinum: { color: '#007dff', range: [90, 100] },
}
