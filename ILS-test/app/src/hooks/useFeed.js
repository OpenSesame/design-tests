import { feedItems } from '../data/mockFeed'

export function useFeed(user) {
  if (!user?.role) return feedItems.slice(0, 8)

  const role = user.role
  const industry = user.industry || 'all'

  const matches = (item) => {
    const roleMatch = item.matchedRoles?.includes('all') || item.matchedRoles?.includes(role)
    const industryMatch = item.matchedIndustries?.includes('all') || item.matchedIndustries?.includes(industry)
    return roleMatch && industryMatch
  }

  const matched = feedItems.filter(matches)
  const sorted = [...matched].sort((a, b) => (b.weight || 0) - (a.weight || 0))

  const micro          = sorted.filter(i => i.type === 'micro-content')
  const courses        = sorted.filter(i => i.type === 'course')
  const featuredSocial = sorted.filter(i => i.type === 'social-proof' && i.featured)
  const ambientSocial  = sorted.filter(i => i.type === 'social-proof' && !i.featured)
  const nudges         = sorted.filter(i => i.type === 'nudge')

  // Hero positions (0–1): top micro-content + top course
  // Position 2: featured social proof CTA (trend signal + linked course)
  // Then: ambient social, more courses, more micro, nudge at natural break
  return [
    micro[0],
    courses[0],
    ...featuredSocial,
    ambientSocial[0],
    ...courses.slice(1, 3),
    ...micro.slice(1, 3),
    nudges[0],
    ...courses.slice(3),
    ...micro.slice(3),
    ...ambientSocial.slice(1),
    ...nudges.slice(1),
  ].filter(Boolean)
}
