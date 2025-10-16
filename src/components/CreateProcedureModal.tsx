import { useState, useRef } from 'react'

interface CreateProcedureModalProps {
  isOpen: boolean
  onClose: () => void
}

interface UploadedFile {
  name: string
  size: string
}

export const CreateProcedureModal = ({ isOpen, onClose }: CreateProcedureModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [prompt, setPrompt] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const suggestedPrompts = [
    'Setting up new employee workstation',
    'Monthly equipment maintenance',
    'Customer onboarding process'
  ]

  const isButtonEnabled = prompt.trim().length > 0 || uploadedFiles.length > 0

  const handlePromptClick = (selectedPrompt: string) => {
    setPrompt(selectedPrompt)
  }

  const handleFileRemove = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    // Drop handling would be implemented with file processing
  }

  const onFileInputChange = () => {
    // Simulate file processing
    const newFiles: UploadedFile[] = [
      { name: 'sample-document.pdf', size: '2.3 MB' },
      { name: 'manual.docx', size: '1.8 MB' }
    ]

    newFiles.slice(0, 5 - uploadedFiles.length).forEach(file => {
      setUploadedFiles(prev => [...prev, file])
    })
  }

  const handleGenerate = () => {
    console.log(`Generating procedure with prompt: ${prompt}`)
    console.log(`Uploaded files: ${uploadedFiles.length}`)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white rounded-t-lg">
          <h2 className="text-lg font-medium text-gray-900">AI Draft</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Close modal">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Description */}
          <div className="px-4 py-3 bg-blue-50 border-b border-gray-200">
            <p className="text-gray-700 leading-relaxed italic">
              Generate step-by-step procedures using AI then customize to fit your needs.
            </p>
          </div>

          {/* Main Content */}
          <div className="p-4 space-y-6">
            {/* Prompt Input Section */}
            <div className="space-y-3">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the task or procedure you'd like to create instructions for...

Example: 'Setting up a new employee workstation' or 'Monthly inventory check process'"
                className="min-h-[100px] resize-none border border-gray-300 rounded-md p-3 text-gray-900 placeholder:text-gray-500 shadow-inner w-full"
                rows={4}
              />

              {/* Suggested Prompts */}
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(suggestion)}
                    className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-gray-700 rounded-full text-sm transition-colors border border-gray-200 italic"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Document Upload Section */}
            <div>
              {/* Upload Header */}
              <div className="rounded-t-lg bg-blue-50 border border-gray-300">
                <div className="flex items-center gap-3 px-4 py-4">
                  <div className="w-8 h-8 text-blue-600">
                    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Have reference documents?</h3>
                    <p className="text-sm text-gray-600">
                      Upload manuals, guides, or documents to help create more accurate procedures.
                    </p>
                  </div>
                </div>
              </div>

              {/* Document Body */}
              <div className="bg-white border border-t-0 border-gray-300 rounded-b-lg px-4 pb-4 space-y-4">
                {/* Document Capacity */}
                <p className="text-sm text-gray-600 mb-0">
                  Document capacity: {uploadedFiles.length} of 5 documents
                </p>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                  onChange={onFileInputChange}
                  style={{ display: 'none' }}
                />

                {/* Drag & Drop Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer bg-white shadow-inner"
                >
                  <div className="space-y-3">
                    <div className="flex justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                    </div>
                    <p className="text-xl font-semibold text-gray-900">
                      Drop files here or click to browse
                    </p>
                    <p className="text-sm text-gray-500">
                      PDF, Word docs, text files, or images (up to 5MB each)
                    </p>
                  </div>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-gray-300">
                    <svg className="w-8 h-8 text-blue-600 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-600">{file.size}</p>
                    </div>
                    <button
                      onClick={() => handleFileRemove(index)}
                      className="text-red-600 hover:text-red-800 transition-colors p-1"
                      aria-label={`Remove ${file.name}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                ))}

                {/* Tip */}
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">Tip:</span>
                  {' '}Focus on your most important documents first. Quality matters more than quantity.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <button onClick={onClose} className="px-6 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded transition-colors">
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={!isButtonEnabled}
            className={`px-6 py-2 rounded transition-colors ${
              isButtonEnabled
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Generate Draft
          </button>
        </div>
      </div>
    </div>
  )
}
