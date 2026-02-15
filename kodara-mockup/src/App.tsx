import { Sidebar } from './components/Sidebar'
import { MainContent } from './components/MainContent'
import { DemoProvider } from './context/DemoContext'

function App() {
  return (
    <DemoProvider>
      <div className="flex h-screen w-full bg-white overflow-hidden">
        <Sidebar />
        <MainContent />
      </div>
    </DemoProvider>
  )
}

export default App
