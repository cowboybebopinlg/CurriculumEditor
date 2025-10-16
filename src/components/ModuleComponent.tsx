import { useState } from 'react'
import { Module, MediaFileType } from '../types/curriculum'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

interface ModuleComponentProps {
  module: Module
  moduleIndex: number
  error?: string
  onUpdateModuleName: (moduleId: string, name: string) => void
  onToggleExpansion: (moduleId: string) => void
  onDeleteModule: (moduleId: string) => void
  onImageUpload: (moduleId: string) => void
  onRemoveModuleImage: (moduleId: string) => void
  onAddLesson: (moduleId: string) => void
  onAddMediaFile: (moduleId: string) => void
  onRemoveLesson: (moduleId: string, lessonId: string) => void
  onRemoveMediaFile: (moduleId: string, fileId: string) => void
  onReorderItems: (moduleId: string, fromIndex: number, toIndex: number) => void
}

interface ModuleItem {
  id: string
  name: string
  type: 'lesson' | 'media'
  mediaType?: MediaFileType
  orderNumber: number
  thumbnail?: string
}

export const ModuleComponent = ({
  module,
  error,
  onUpdateModuleName,
  onToggleExpansion,
  onDeleteModule,
  onImageUpload,
  onRemoveModuleImage,
  onAddLesson,
  onAddMediaFile,
  onRemoveLesson,
  onRemoveMediaFile,
  onReorderItems
}: ModuleComponentProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const hasContent = module.lessons.length > 0 || module.mediaFiles.length > 0

  const allItems: ModuleItem[] = [
    ...module.lessons.map(l => ({
      id: l.id,
      name: l.name,
      type: 'lesson' as const,
      orderNumber: l.orderNumber,
      thumbnail: l.thumbnail
    })),
    ...module.mediaFiles.map(f => ({
      id: f.id,
      name: f.name,
      type: 'media' as const,
      mediaType: f.type,
      orderNumber: f.orderNumber,
      thumbnail: f.thumbnail
    }))
  ].sort((a, b) => a.orderNumber - b.orderNumber)

  const confirmDelete = () => {
    setShowDeleteModal(true)
  }

  const handleDelete = () => {
    setShowDeleteModal(false)
    onDeleteModule(module.id)
  }

  const removeItem = (item: ModuleItem) => {
    if (item.type === 'lesson') {
      onRemoveLesson(module.id, item.id)
    } else {
      onRemoveMediaFile(module.id, item.id)
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return

    const items = Array.from(allItems)
    const [reorderedItem] = items.splice(source.index, 1)
    items.splice(destination.index, 0, reorderedItem)

    onReorderItems(module.id, source.index, destination.index)
  }

  const removeModuleImage = () => {
    onRemoveModuleImage(module.id)
  }

  const getMediaIcon = (mediaType?: MediaFileType) => {
    const color = {
      [MediaFileType.Video]: 'text-blue-600',
      [MediaFileType.Audio]: 'text-green-600',
      [MediaFileType.Pdf]: 'text-red-600',
      [MediaFileType.Image]: 'text-gray-600'
    }[mediaType || MediaFileType.Image]

    const paths = {
      [MediaFileType.Video]: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15a2 2 0 002-2V9a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293L10.293 4.293A1 1 0 009.586 4H8a2 2 0 00-2 2v6a2 2 0 002 2z',
      [MediaFileType.Audio]: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z',
      [MediaFileType.Pdf]: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      [MediaFileType.Image]: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
    }

    return (
      <svg className={`w-full h-full ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={paths[mediaType || MediaFileType.Image]}></path>
      </svg>
    )
  }

  return (
    <>
      <div className="w-full border border-gray-200 rounded-lg bg-white">
        {/* Module Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleExpansion(module.id)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              {module.isExpanded ? (
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              )}
            </button>

            <div
              onClick={() => onImageUpload(module.id)}
              className="w-[388px] h-[140px] bg-gray-50 rounded border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group"
            >
              {module.image ? (
                <div className="relative w-full h-full">
                  <img src={module.image} alt="Module" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onImageUpload(module.id)
                        }}
                        className="bg-white hover:bg-gray-100 rounded px-3 py-1 text-sm font-medium text-gray-900 transition-colors"
                      >
                        Change image
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeModuleImage()
                        }}
                        className="bg-red-600 hover:bg-red-700 rounded px-3 py-1 text-sm font-medium text-white transition-colors"
                      >
                        Remove image
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Add module image
                  </p>
                  <p className="text-xs text-gray-500">
                    Click to browse or drag & drop
                  </p>
                </div>
              )}
            </div>

            <div className="flex-1">
              <input
                value={module.name}
                onChange={(e) => onUpdateModuleName(module.id, e.target.value)}
                placeholder="Module Name (required)"
                className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <button
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-grab active:cursor-grabbing"
              title="Drag to reorder module"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
              </svg>
            </button>

            <button
              onClick={confirmDelete}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Module Content */}
        {module.isExpanded && (
          <div className="p-4">
            {!hasContent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <p className="text-gray-600 mb-4">
                  This Module has no content yet.
                </p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => onAddLesson(module.id)}
                    className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    Add Lesson
                  </button>
                  <button
                    onClick={() => onAddMediaFile(module.id)}
                    className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    Add Media File
                  </button>
                </div>
              </div>
            ) : (
              <>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="module-items">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {allItems.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group cursor-default mb-3"
                              >
                                <div className="relative">
                                  <div className="w-12 h-12 bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden">
                                    {item.type === 'lesson' ? (
                                      item.thumbnail ? (
                                        <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                                      ) : (
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                        </svg>
                                      )
                                    ) : (
                                      getMediaIcon(item.mediaType)
                                    )}
                                  </div>
                                  <div className="absolute -top-1 -left-1 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                                    {item.orderNumber}
                                  </div>
                                </div>

                                <div className="flex-1">
                                  <p className="font-medium text-gray-900">{item.name}</p>
                                  <p className="text-sm text-gray-600">
                                    {item.type === 'lesson' ? 'Lesson' : `${item.mediaType?.toUpperCase()} File`}
                                  </p>
                                </div>

                                <div className="flex items-center gap-1">
                                  <button
                                    className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
                                    title="Drag to reorder"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => removeItem(item)}
                                    className="p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                {/* Module Toolbar */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => onAddLesson(module.id)}
                    className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    Add Lesson
                  </button>
                  <button
                    onClick={() => onAddMediaFile(module.id)}
                    className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    Add Media File
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Module?</h3>
              <p className="text-gray-600 mb-4">
                This will delete the Module '{module.name}' and all items inside it ({module.lessons.length} Lessons and {module.mediaFiles.length} Media Files). This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
