import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import OnboardingPage from './pages/Onboarding/OnboardingPage'
import FeedPage from './pages/Feed/FeedPage'
import ProfilePage from './pages/Profile/ProfilePage'
import HCAPage from './pages/HCA/HCAPage'
import PlayerPage from './pages/Player/PlayerPage'
import CourseDetailPage from './pages/Course/CourseDetailPage'
import AppShell from './components/layout/AppShell'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/player/:id" element={<PlayerPage />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
          <Route element={<AppShell />}>
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/hca" element={<HCAPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/feed" replace />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
