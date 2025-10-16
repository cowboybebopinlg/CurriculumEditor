import { useState } from 'react'
import { SystemHeader } from './components/SystemHeader'
import { SystemBody } from './components/SystemBody'
import { CreateProcedureModal } from './components/CreateProcedureModal'
import { Curriculum } from './types/curriculum'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isInEditMode, setIsInEditMode] = useState(false)
  const [curriculum, setCurriculum] = useState<Curriculum>({
    name: '',
    modules: []
  })

  const handleCreateProcedureAI = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleCreateCurriculum = () => {
    setIsInEditMode(true)
    setCurriculum({
      name: 'Untitled Curriculum',
      modules: []
    })
  }

  const handleSaveCurriculum = () => {
    console.log('Saving curriculum...', curriculum)
    // Add save logic here
  }

  const handleDeleteCurriculum = () => {
    console.log('Deleting curriculum...')
    setIsInEditMode(false)
    setCurriculum({
      name: '',
      modules: []
    })
  }

  const handleCurriculumChanged = (newCurriculum: Curriculum) => {
    setCurriculum(newCurriculum)
  }

  return (
    <div className="content-stretch flex flex-col items-start justify-start relative size-full h-screen overflow-hidden">
      <SystemHeader />
      <SystemBody
        isInEditMode={isInEditMode}
        curriculum={curriculum}
        onCreateProcedureAI={handleCreateProcedureAI}
        onCreateCurriculum={handleCreateCurriculum}
        onSaveCurriculum={handleSaveCurriculum}
        onDeleteCurriculum={handleDeleteCurriculum}
        onCurriculumChanged={handleCurriculumChanged}
      />
      
      <CreateProcedureModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  )
}

export default App
