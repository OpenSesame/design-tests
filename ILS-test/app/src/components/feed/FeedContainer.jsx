import CourseCard from './CourseCard'
import MicroContentCard from './MicroContentCard'
import SocialProofCard from './SocialProofCard'
import NudgeCard from './NudgeCard'
import FeedDivider from './FeedDivider'

const DIVIDER_POSITIONS = [5, 9]

export default function FeedContainer({ items }) {
  const rendered = []

  items.forEach((item, i) => {
    if (DIVIDER_POSITIONS.includes(i)) {
      rendered.push(
        <FeedDivider key={`divider-${i}`} label={i === 9 ? "You've seen today's top picks" : undefined} />
      )
    }

    let card
    switch (item.type) {
      case 'micro-content': card = <MicroContentCard key={item.id} item={item} />; break
      case 'course':        card = <CourseCard key={item.id} item={item} />; break
      case 'social-proof':  card = <SocialProofCard key={item.id} item={item} />; break
      case 'nudge':         card = <NudgeCard key={item.id} item={item} />; break
      default:              card = null
    }

    if (card) rendered.push(card)
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {rendered}
    </div>
  )
}
