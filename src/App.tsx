import { useState, useEffect } from 'react'
import { SystemHeader } from './components/SystemHeader'
import { SystemBody } from './components/SystemBody'
import { CreateProcedureModal } from './components/CreateProcedureModal'
import { Curriculum } from './types/curriculum'
import { ConfirmationModal } from './components/ConfirmationModal'
import curriculaData from './db.json'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isInEditMode, setIsInEditMode] = useState(false)
  const [errors, setErrors] = useState<{ curriculumName?: string; moduleNames?: { [moduleId: string]: string } }>({})
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null)
  const [curricula, setCurricula] = useState<Curriculum[]>([])
  const [selectedCurriculumId, setSelectedCurriculumId] = useState<string | null>(null)

  useEffect(() => {
    setCurricula(curriculaData)
  }, [])

  const handleCreateProcedureAI = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleCreateCurriculum = () => {
    console.log('handleCreateCurriculum called. Setting isInEditMode to true.');
    setIsInEditMode(true);
    setCurriculum({
      id: '',
      name: 'Untitled Curriculum',
      modules: []
    });
  };

  const handleSaveCurriculum = () => {
    if (!curriculum) return

    const errors: { curriculumName?: string; moduleNames?: { [moduleId: string]: string } } = {}
    if (!curriculum.name) {
      errors.curriculumName = 'Curriculum name is required.'
    }
    curriculum.modules.forEach(module => {
      if (!module.name) {
        if (!errors.moduleNames) {
          errors.moduleNames = {}
        }
        errors.moduleNames[module.id] = 'Module name is required.'
      }
    })

    setErrors(errors)
    if (Object.keys(errors).length > 0) {
      return
    }

    console.log('Saving curriculum...', curriculum)
    // Add save logic here
  }

  const handleDeleteCurriculum = () => {
    setIsDeleteModalOpen(true)
  }

  const confirmDeleteCurriculum = () => {
    console.log('Deleting curriculum...')
    setIsInEditMode(false)
    setCurriculum(null)
    setIsDeleteModalOpen(false)
  }

  const handleCurriculumChanged = (newCurriculum: Curriculum) => {
    setCurriculum(newCurriculum)
  }

  const handleSelectCurriculum = (id: string) => {
    setSelectedCurriculumId(id)
  }

  const handleOpenCurriculum = () => {
    if (selectedCurriculumId) {
      const selected = curricula.find(c => c.id === selectedCurriculumId)
      if (selected) {
        setCurriculum(selected)
        setIsInEditMode(true)
      }
    }
  }

  return (
    <div className="content-stretch flex flex-col items-start justify-start relative size-full h-screen overflow-hidden">
      <SystemHeader />
      <SystemBody
        isInEditMode={isInEditMode}
        curriculum={curriculum}
        curricula={curricula}
        selectedCurriculumId={selectedCurriculumId}
        errors={errors}
        onCreateProcedureAI={handleCreateProcedureAI}
        onCreateCurriculum={handleCreateCurriculum}
        onSaveCurriculum={handleSaveCurriculum}
        onDeleteCurriculum={handleDeleteCurriculum}
        onCurriculumChanged={handleCurriculumChanged}
        onSelectCurriculum={handleSelectCurriculum}
        onOpenCurriculum={handleOpenCurriculum}
      />
      
      <CreateProcedureModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteCurriculum}
        title="Delete Curriculum"
        message="Are you sure you want to delete this curriculum? This action cannot be undone."
      />
    </div>
  )
}

export default App
