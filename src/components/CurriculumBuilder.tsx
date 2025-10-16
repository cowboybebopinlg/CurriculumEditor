import { useState, useRef } from 'react'
import { Curriculum, Module, Lesson, MediaFileType } from '../types/curriculum'
import { ModuleComponent } from './ModuleComponent'

interface CurriculumBuilderProps {
  curriculum: Curriculum
  onCurriculumChanged: (curriculum: Curriculum) => void
}

interface AvailableLesson {
  id: string
  name: string
}

export const CurriculumBuilder = ({ curriculum, onCurriculumChanged }: CurriculumBuilderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isFileDragging, setIsFileDragging] = useState(false)
  const [showAddLessonModal, setShowAddLessonModal] = useState(false)
  const [selectedModuleId, setSelectedModuleId] = useState('')
  const [lessonSearchQuery, setLessonSearchQuery] = useState('')

  // Mock lesson data
  const availableLessons: AvailableLesson[] = [
    { id: '1', name: 'Introduction to Safety Protocols' },
    { id: '2', name: 'Equipment Operation Guidelines' },
    { id: '3', name: 'Emergency Procedures' },
    { id: '4', name: 'Quality Control Standards' },
    { id: '5', name: 'Documentation Requirements' }
  ]

  const filteredLessons = availableLessons.filter(l =>
    l.name.toLowerCase().includes(lessonSearchQuery.toLowerCase())
  )

  const getUploadAreaClasses = () => {
    const baseClasses = 'w-96 h-96 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 overflow-hidden'

    if (isFileDragging) {
      return `${baseClasses} border-blue-400 bg-blue-50`
    } else if (curriculum.image) {
      return `${baseClasses} border-gray-300 bg-white hover:border-blue-400`
    } else {
      return `${baseClasses} border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50`
    }
  }

  const handleCurriculumNameChange = () => {
    onCurriculumChanged(curriculum)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsFileDragging(true)
  }

  const handleDragLeave = () => {
    setIsFileDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsFileDragging(false)
    // File drop handling would go here
  }

  const handleImageUpload = (target: string) => {
    fileInputRef.current?.click()
  }

  const handleModuleImageUpload = (moduleId: string) => {
    setSelectedModuleId(moduleId)
    fileInputRef.current?.click()
  }

  const onFileSelected = () => {
    // File selection handling - set placeholder image
    if (!selectedModuleId) {
      curriculum.image = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzJkOGVmMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkN1cnJpY3VsdW0gSW1hZ2U8L3RleHQ+PC9zdmc+';
    } else {
      const module = curriculum.modules.find(m => m.id === selectedModuleId)
      if (module) {
        module.image = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjE0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iIzJkOGVmMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1vZHVsZSBJbWFnZTwvdGV4dD48L3N2Zz4=';
      }
      setSelectedModuleId('');
    }
    onCurriculumChanged(curriculum);
  }

  const removeCurriculumImage = () => {
    curriculum.image = undefined
    onCurriculumChanged(curriculum)
  }

  const addModule = () => {
    const newModule: Module = {
      id: crypto.randomUUID(),
      name: '',
      isExpanded: true,
      lessons: [],
      mediaFiles: []
    }
    curriculum.modules.push(newModule)
    onCurriculumChanged(curriculum)
  }

  const updateModuleName = (moduleId: string, name: string) => {
    const module = curriculum.modules.find(m => m.id === moduleId)
    if (module) {
      module.name = name
      onCurriculumChanged(curriculum)
    }
  }

  const toggleModuleExpansion = (moduleId: string) => {
    const module = curriculum.modules.find(m => m.id === moduleId)
    if (module) {
      module.isExpanded = !module.isExpanded
      onCurriculumChanged(curriculum)
    }
  }

  const deleteModule = (moduleId: string) => {
    curriculum.modules = curriculum.modules.filter(m => m.id !== moduleId)
    onCurriculumChanged(curriculum)
  }

  const openAddLessonModal = (moduleId: string) => {
    setSelectedModuleId(moduleId)
    setShowAddLessonModal(true)
  }

  const closeAddLessonModal = () => {
    setShowAddLessonModal(false)
    setSelectedModuleId('')
    setLessonSearchQuery('')
  }

  const addLesson = (lessonId: string) => {
    const availableLesson = availableLessons.find(l => l.id === lessonId)
    const module = curriculum.modules.find(m => m.id === selectedModuleId)

    if (availableLesson && module) {
      const orderNumber = module.lessons.length + module.mediaFiles.length + 1
      const newLesson: Lesson = {
        id: crypto.randomUUID(),
        name: availableLesson.name,
        orderNumber
      }
      module.lessons.push(newLesson)
      onCurriculumChanged(curriculum)
    }
    closeAddLessonModal()
  }

  const addMediaFile = (moduleId: string) => {
    const module = curriculum.modules.find(m => m.id === moduleId)
    if (module) {
      const orderNumber = module.lessons.length + module.mediaFiles.length + 1
      module.mediaFiles.push({
        id: crypto.randomUUID(),
        name: 'Sample Media File',
        type: MediaFileType.Video,
        orderNumber
      })
      onCurriculumChanged(curriculum)
    }
  }

  const removeLesson = (moduleId: string, lessonId: string) => {
    const module = curriculum.modules.find(m => m.id === moduleId)
    if (module) {
      module.lessons = module.lessons.filter(l => l.id !== lessonId)
      onCurriculumChanged(curriculum)
    }
  }

  const removeMediaFile = (moduleId: string, fileId: string) => {
    const module = curriculum.modules.find(m => m.id === moduleId)
    if (module) {
      module.mediaFiles = module.mediaFiles.filter(f => f.id !== fileId)
      onCurriculumChanged(curriculum)
    }
  }

  const reorderItems = (moduleId: string, fromIndex: number, toIndex: number) => {
    // Reordering logic would go here
    onCurriculumChanged(curriculum)
  }

  return (
    <div className="h-full flex w-full">
      <div className="w-full flex-1 p-6 pb-12 overflow-y-auto">
        <div className="w-full space-y-6">
          {/* Curriculum Setup */}
          <div className="w-full bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Curriculum Setup
            </h2>

            <div className="w-full space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Curriculum Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  value={curriculum.name}
                  onChange={(e) => {
                    curriculum.name = e.target.value
                    handleCurriculumNameChange()
                  }}
                  placeholder="Enter curriculum name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Curriculum Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Curriculum Image
                </label>
                <div className="flex items-start gap-6">
                  {/* Upload Area */}
                  <div
                    onClick={() => handleImageUpload('curriculum')}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={getUploadAreaClasses()}
                  >
                    {curriculum.image ? (
                      <div className="relative w-full h-full group">
                        <img src={curriculum.image} alt="Curriculum" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleImageUpload('curriculum')
                              }}
                              className="bg-white hover:bg-gray-100 rounded-lg px-4 py-2 text-sm font-medium text-gray-900 transition-colors"
                            >
                              Change image
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                removeCurriculumImage()
                              }}
                              className="bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
                            >
                              Remove image
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center p-6">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">
                          Add curriculum image
                        </h4>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                          Drag and drop an image here, or click to browse
                        </p>
                        <div className="text-xs text-gray-500">
                          <div>• JPG, PNG, GIF up to 20MB</div>
                          <div>• Will be cropped to 1:1 ratio</div>
                          <div>• Final size: 400×400px</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modules Section */}
          {curriculum.modules.length === 0 ? (
            <div className="w-full bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Modules yet
              </h3>
              <p className="text-gray-600 mb-4">
                Add a Module to get started.
              </p>
              <button onClick={addModule} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add Module
              </button>
            </div>
          ) : (
            <div className="w-full space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Modules
              </h3>

              {curriculum.modules.map((module, index) => (
                <ModuleComponent
                  key={module.id}
                  module={module}
                  moduleIndex={index}
                  onUpdateModuleName={updateModuleName}
                  onToggleExpansion={toggleModuleExpansion}
                  onDeleteModule={deleteModule}
                  onImageUpload={handleModuleImageUpload}
                  onAddLesson={openAddLessonModal}
                  onAddMediaFile={addMediaFile}
                  onRemoveLesson={removeLesson}
                  onRemoveMediaFile={removeMediaFile}
                  onReorderItems={reorderItems}
                />
              ))}

              {/* Add Module Button */}
              <div className="w-full border-2 border-dashed border-blue-200 rounded-lg bg-blue-50/30 p-8 text-center hover:border-blue-300 hover:bg-blue-50/50 transition-colors">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Add Another Module
                </h4>
                <p className="text-gray-600 mb-4">
                  Create a new module to organize your curriculum content.
                </p>
                <button onClick={addModule} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base rounded-md transition-colors">
                  <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add Module
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={onFileSelected}
      />

      {/* Add Lesson Modal */}
      {showAddLessonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[600px] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Add Lesson</h2>
              <button onClick={closeAddLessonModal} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden p-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <input
                    value={lessonSearchQuery}
                    onChange={(e) => setLessonSearchQuery(e.target.value)}
                    placeholder="Search lessons..."
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex-1 border rounded-lg flex flex-col overflow-hidden">
                <div className="bg-gray-50 p-3 border-b">
                  <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-700">
                    <div>Name</div>
                    <div>Type</div>
                    <div>Organization</div>
                    <div>Author</div>
                    <div>Action</div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {filteredLessons.map((lesson) => (
                    <div key={lesson.id} className="grid grid-cols-5 gap-4 items-center p-3 border-b hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                          </svg>
                        </div>
                        <span className="text-sm">{lesson.name}</span>
                      </div>
                      <div className="text-sm text-gray-600">Lesson</div>
                      <div className="text-sm text-gray-600">Demo Org</div>
                      <div className="text-sm text-gray-600">John Doe</div>
                      <div>
                        <button onClick={() => addLesson(lesson.id)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}