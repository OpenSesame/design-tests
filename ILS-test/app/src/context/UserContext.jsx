import { createContext, useContext, useState } from 'react'

const defaultUser = {
  id: 'u-001',
  name: 'Alex Rivera',
  role: 'manager',
  industry: 'technology',
  aspiration: 'build high-performing teams',
  aspirationIndex: 0,
  onboardingComplete: true,
  streak: 6,
  hoursThisMonth: 4.6,
  totalSkills: 4,
  industryInsights: 6,
  completedCourseIds: ['f-002', 'f-007', 'f-011'],
}

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(defaultUser)
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export function useUser() {
  return useContext(UserContext)
}
