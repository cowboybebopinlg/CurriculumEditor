import { useState, useRef } from 'react'
import { Curriculum, Module, Lesson, MediaFileType } from '../types/curriculum'
import { ModuleComponent } from './ModuleComponent'
import { ConfirmationModal } from './ConfirmationModal'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

interface CurriculumBuilderProps {
  curriculum: Curriculum
  onCurriculumChanged: (curriculum: Curriculum) => void
  errors: { curriculumName?: string; moduleNames?: { [moduleId: string]: string } }
}

interface AvailableLesson {
  id: string
  name: string
}

export const CurriculumBuilder = ({ curriculum, onCurriculumChanged, errors }: CurriculumBuilderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isFileDragging, setIsFileDragging] = useState(false)
  const [showAddLessonModal, setShowAddLessonModal] = useState(false)
  const [selectedModuleId, setSelectedModuleId] = useState('')
  const [lessonSearchQuery, setLessonSearchQuery] = useState('')
  const [showDeleteModuleModal, setShowDeleteModuleModal] = useState(false)
  const [moduleToDelete, setModuleToDelete] = useState<string | null>(null)

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

  const handleCurriculumNameChange = (name: string) => {
    onCurriculumChanged({ ...curriculum, name })
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
    const file = e.dataTransfer.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        onCurriculumChanged({ ...curriculum, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const handleModuleImageUpload = (moduleId: string) => {
    setSelectedModuleId(moduleId)
    fileInputRef.current?.click()
  }

  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        if (!selectedModuleId) {
          onCurriculumChanged({ ...curriculum, image: reader.result as string })
        } else {
          const newModules = curriculum.modules.map(m => {
            if (m.id === selectedModuleId) {
              // Check if it's for the module image or a new media file
              if (m.image === undefined) {
                const orderNumber = m.lessons.length + m.mediaFiles.length + 1
                const newMediaFile = {
                  id: crypto.randomUUID(),
                  name: file.name,
                  type: file.type.startsWith('image')
                    ? MediaFileType.Image
                    : file.type.startsWith('video')
                    ? MediaFileType.Video
                    : file.type.startsWith('audio')
                    ? MediaFileType.Audio
                    : MediaFileType.Pdf,
                  orderNumber,
                  thumbnail: reader.result as string
                }
                return { ...m, mediaFiles: [...m.mediaFiles, newMediaFile] }
              } else {
                return { ...m, image: reader.result as string }
              }
            }
            return m
          })
          onCurriculumChanged({ ...curriculum, modules: newModules })
          setSelectedModuleId('')
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const removeCurriculumImage = () => {
    onCurriculumChanged({ ...curriculum, image: undefined })
  }

  const removeModuleImage = (moduleId: string) => {
    const newModules = curriculum.modules.map(m => {
      if (m.id === moduleId) {
        return { ...m, image: undefined }
      }
      return m
    })
    onCurriculumChanged({ ...curriculum, modules: newModules })
  }

  const addModule = () => {
    const newModule: Module = {
      id: crypto.randomUUID(),
      name: '',
      isExpanded: true,
      lessons: [],
      mediaFiles: []
    }
    onCurriculumChanged({ ...curriculum, modules: [...curriculum.modules, newModule] })
  }

  const updateModuleName = (moduleId: string, name: string) => {
    const newModules = curriculum.modules.map(m => {
      if (m.id === moduleId) {
        return { ...m, name }
      }
      return m
    })
    onCurriculumChanged({ ...curriculum, modules: newModules })
  }

  const toggleModuleExpansion = (moduleId: string) => {
    const newModules = curriculum.modules.map(m => {
      if (m.id === moduleId) {
        return { ...m, isExpanded: !m.isExpanded }
      }
      return m
    })
    onCurriculumChanged({ ...curriculum, modules: newModules })
  }

  const deleteModule = (moduleId: string) => {
    setModuleToDelete(moduleId)
    setShowDeleteModuleModal(true)
  }

  const handleDeleteModule = () => {
    if (moduleToDelete) {
      const newModules = curriculum.modules.filter(m => m.id !== moduleToDelete)
      onCurriculumChanged({ ...curriculum, modules: newModules })
      setShowDeleteModuleModal(false)
      setModuleToDelete(null)
    }
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
    if (availableLesson && selectedModuleId) {
      const newModules = curriculum.modules.map(m => {
        if (m.id === selectedModuleId) {
          const orderNumber = m.lessons.length + m.mediaFiles.length + 1
          const newLesson: Lesson = {
            id: crypto.randomUUID(),
            name: availableLesson.name,
            orderNumber
          }
          return { ...m, lessons: [...m.lessons, newLesson] }
        }
        return m
      })
      onCurriculumChanged({ ...curriculum, modules: newModules })
    }
    closeAddLessonModal()
  }

  const addMediaFile = (moduleId: string) => {
    setSelectedModuleId(moduleId)
    fileInputRef.current?.click()
  }

  const removeLesson = (moduleId: string, lessonId: string) => {
    const newModules = curriculum.modules.map(m => {
      if (m.id === moduleId) {
        return { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) }
      }
      return m
    })
    onCurriculumChanged({ ...curriculum, modules: newModules })
  }

  const removeMediaFile = (moduleId: string, fileId: string) => {
    const newModules = curriculum.modules.map(m => {
      if (m.id === moduleId) {
        return { ...m, mediaFiles: m.mediaFiles.filter(f => f.id !== fileId) }
      }
      return m
    })
    onCurriculumChanged({ ...curriculum, modules: newModules })
  }

  const reorderItems = (moduleId: string, fromIndex: number, toIndex: number) => {
    const newModules = curriculum.modules.map(m => {
      if (m.id === moduleId) {
        const allItems = [
          ...m.lessons.map(l => ({ ...l, type: 'lesson' })),
          ...m.mediaFiles.map(f => ({ ...f, type: 'media' }))
        ].sort((a, b) => a.orderNumber - b.orderNumber)

        const [reorderedItem] = allItems.splice(fromIndex, 1)
        allItems.splice(toIndex, 0, reorderedItem)

        const updatedLessons = allItems
          .filter(item => item.type === 'lesson')
          .map((item, index) => ({ ...item, orderNumber: index + 1 }))
        const updatedMediaFiles = allItems
          .filter(item => item.type === 'media')
          .map((item, index) => ({ ...item, orderNumber: updatedLessons.length + index + 1 }))

        return {
          ...m,
          lessons: updatedLessons.map(({ type, ...rest }) => rest),
          mediaFiles: updatedMediaFiles.map(item => ({ ...item, type: item.type as MediaFileType }))
        }
      }
      return m
    })
    onCurriculumChanged({ ...curriculum, modules: newModules })
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return

    const items = Array.from(curriculum.modules)
    const [reorderedItem] = items.splice(source.index, 1)
    items.splice(destination.index, 0, reorderedItem)

    onCurriculumChanged({ ...curriculum, modules: items })
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
                  onChange={(e) => handleCurriculumNameChange(e.target.value)}
                  placeholder="Enter curriculum name"
                  className={`w-full px-3 py-2 border ${errors.curriculumName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.curriculumName && <p className="text-red-500 text-sm mt-1">{errors.curriculumName}</p>}
              </div>

              {/* Curriculum Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Curriculum Image
                </label>
                <div className="flex items-start gap-6">
                  {/* Upload Area */}
                  <div
                    onClick={() => handleImageUpload()}
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
                                handleImageUpload()
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
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="modules">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {curriculum.modules.map((module, index) => (
                        <Draggable key={module.id} draggableId={module.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <ModuleComponent
                                module={module}
                                moduleIndex={index}
                                error={errors.moduleNames?.[module.id]}
                                onUpdateModuleName={updateModuleName}
                                onToggleExpansion={toggleModuleExpansion}
                                onDeleteModule={deleteModule}
                                onImageUpload={handleModuleImageUpload}
                                onRemoveModuleImage={removeModuleImage}
                                onAddLesson={openAddLessonModal}
                                onAddMediaFile={addMediaFile}
                                onRemoveLesson={removeLesson}
                                onRemoveMediaFile={removeMediaFile}
                                onReorderItems={reorderItems}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

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

      {/* Delete Module Modal */}
      <ConfirmationModal
        isOpen={showDeleteModuleModal}
        onClose={() => setShowDeleteModuleModal(false)}
        onConfirm={handleDeleteModule}
        title="Delete Module"
        message="Are you sure you want to delete this module? This action cannot be undone."
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