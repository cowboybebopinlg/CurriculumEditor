import { useState } from 'react'
import { LessonsHeader } from './LessonsHeader'
import { SearchBar } from './SearchBar'
import { CurriculumTable } from './CurriculumTable'
import { CurriculumBuilder } from './CurriculumBuilder'
import { Curriculum } from '../types/curriculum'

interface ContentPanelProps {
  isInEditMode: boolean
  curriculum: Curriculum | null
  curricula: Curriculum[]
  selectedCurriculumId: string | null
  errors: { curriculumName?: string; moduleNames?: { [moduleId: string]: string } }
  onCreateProcedureAI: () => void
  onCreateCurriculum: () => void
  onSaveCurriculum: () => void
  onDeleteCurriculum: () => void
  onCurriculumChanged: (curriculum: Curriculum) => void
  onSelectCurriculum: (id: string) => void
  onOpenCurriculum: () => void
}

export const ContentPanel = ({
  isInEditMode,
  curriculum,
  curricula,
  selectedCurriculumId,
  errors,
  onCreateProcedureAI,
  onCreateCurriculum,
  onSaveCurriculum,
  onDeleteCurriculum,
  onCurriculumChanged,
  onSelectCurriculum,
  onOpenCurriculum
}: ContentPanelProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="basis-0 bg-[#ffffff] content-stretch flex flex-col grow h-screen items-start justify-start min-h-px min-w-px relative shrink-0" data-name="content-panel">
      <LessonsHeader
        isInEditMode={isInEditMode}
        curriculum={curriculum}
        onCreateProcedureAI={onCreateProcedureAI}
        onCreateCurriculum={onCreateCurriculum}
        onSaveCurriculum={onSaveCurriculum}
        onDeleteCurriculum={onDeleteCurriculum}
        onOpenCurriculum={onOpenCurriculum}
        selectedCurriculumId={selectedCurriculumId}
      />

      {!isInEditMode ? (
        <>
          <SearchBar onSearch={setSearchQuery} />
          <CurriculumTable
            searchQuery={searchQuery}
            curricula={curricula}
            selectedCurriculumId={selectedCurriculumId}
            onSelectCurriculum={onSelectCurriculum}
          />
        </>
      ) : curriculum ? (
        <CurriculumBuilder
          curriculum={curriculum}
          onCurriculumChanged={onCurriculumChanged}
          errors={errors}
        />
      ) : null}
    </div>
  )
}
