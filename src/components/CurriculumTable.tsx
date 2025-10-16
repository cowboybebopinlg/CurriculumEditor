import { useState } from 'react'

interface Curriculum {
  id: string
  name: string
  organization: string
  author: string
  uploadDate: string
  status: string
}

interface CurriculumTableProps {
  searchQuery: string
}

export const CurriculumTable = ({ searchQuery }: CurriculumTableProps) => {
  const [curricula] = useState<Curriculum[]>([
    { id: '1', name: 'Safety First', organization: 'Construction Inc.', author: 'John Doe', uploadDate: '2024-05-10', status: 'Published' },
    { id: '2', name: 'Advanced Welding', organization: 'Welders Union', author: 'Jane Smith', uploadDate: '2024-05-12', status: 'Draft' },
    { id: '3', name: 'Intro to Plumbing', organization: 'Plumbers Local', author: 'Mike Rowe', uploadDate: '2024-05-15', status: 'Published' },
  ])

  const filteredCurricula = curricula.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="bg-[#ffffff] relative shrink-0 w-full" data-name="table">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start p-[10px] relative w-full">
          <TableHeader />
          {filteredCurricula.map((curriculum, index) => (
            <TableRow key={curriculum.id} curriculum={curriculum} isAlternate={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </div>
  )
}

const TableHeader = () => {
  return (
    <div className="bg-[#e7f1fd] h-10 relative rounded-tl-[6px] rounded-tr-[6px] shrink-0 w-full" data-name="table-header">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex h-10 items-center justify-between px-2.5 py-0 relative w-full">
          {/* Name */}
          <div className="basis-0 content-stretch flex gap-2.5 grow h-full items-center justify-start min-h-px min-w-px relative shrink-0">
            <div className="basis-0 flex flex-col font-['Roboto:Medium',_sans-serif] font-medium grow justify-center leading-[0] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#000000] text-[16px] text-nowrap">
              <p className="leading-[normal] overflow-inherit">Name</p>
            </div>
          </div>

          {/* Organization */}
          <div className="basis-0 content-stretch flex gap-2.5 grow h-full items-center justify-start min-h-px min-w-px relative shrink-0">
            <div className="basis-0 flex flex-col font-['Roboto:Medium',_sans-serif] font-medium grow justify-center leading-[0] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#000000] text-[16px] text-nowrap">
              <p className="leading-[normal] overflow-inherit">Organization</p>
            </div>
          </div>

          {/* Author */}
          <div className="basis-0 content-stretch flex gap-2.5 grow h-full items-center justify-start min-h-px min-w-px relative shrink-0">
            <div className="basis-0 flex flex-col font-['Roboto:Medium',_sans-serif] font-medium grow justify-center leading-[0] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#000000] text-[16px] text-nowrap">
              <p className="leading-[normal] overflow-inherit">Author</p>
            </div>
          </div>

          {/* Upload Date */}
          <div className="basis-0 content-stretch flex gap-2.5 grow h-full items-center justify-start min-h-px min-w-px relative shrink-0">
            <div className="basis-0 flex flex-col font-['Roboto:Medium',_sans-serif] font-medium grow justify-center leading-[0] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#000000] text-[16px] text-nowrap">
              <p className="leading-[normal] overflow-inherit">Upload Date</p>
            </div>
          </div>

          {/* Status */}
          <div className="basis-0 content-stretch flex gap-2.5 grow h-full items-center justify-start min-h-px min-w-px relative shrink-0">
            <div className="basis-0 flex flex-col font-['Roboto:Medium',_sans-serif] font-medium grow justify-center leading-[0] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#000000] text-[16px] text-nowrap">
              <p className="leading-[normal] overflow-inherit">Status</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface TableRowProps {
  curriculum: Curriculum
  isAlternate?: boolean
}

const TableRow = ({ curriculum, isAlternate = false }: TableRowProps) => {
  const bgClass = isAlternate ? 'bg-[#ffffff]' : 'bg-[#f5f9fe]'

  return (
    <div className={`${bgClass} h-[45px] relative shrink-0 w-full`} data-name="table-row">
      <div aria-hidden="true" className="absolute border-[#bbbbbb] border-[0px_0px_1px] border-solid inset-0 pointer-events-none"></div>
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex h-[45px] items-center justify-between px-2.5 py-0 relative w-full">
          {/* Name with icon */}
          <div className="basis-0 content-stretch flex gap-[5px] grow h-full items-center justify-start min-h-px min-w-px relative shrink-0">
            {/* Icon */}
            <div className="overflow-clip relative shrink-0 size-6">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <path d="M24 0H0V24H24V0Z" fill="#2D8EF3" opacity="0" />
                <rect x="4" y="6" width="16" height="2" fill="#2D8EF3" />
                <rect x="4" y="10" width="16" height="2" fill="#2D8EF3" />
                <rect x="4" y="14" width="10" height="2" fill="#2D8EF3" />
              </svg>
            </div>
            {/* Name text */}
            <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#707070] text-[16px] text-nowrap">
              <p className="leading-[normal] overflow-inherit">{curriculum.name}</p>
            </div>
          </div>

          {/* Organization */}
          <div className="basis-0 content-stretch flex gap-[5px] grow h-full items-center justify-start min-h-px min-w-px relative shrink-0">
            <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#707070] text-[16px] text-nowrap">
              <p className="leading-[normal] overflow-inherit">{curriculum.organization}</p>
            </div>
          </div>

          {/* Author */}
          <div className="basis-0 content-stretch flex gap-[5px] grow h-full items-center justify-start min-h-px min-w-px relative shrink-0">
            <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#707070] text-[16px] text-nowrap">
              <p className="leading-[normal] overflow-inherit">{curriculum.author}</p>
            </div>
          </div>

          {/* Date */}
          <div className="basis-0 content-stretch flex gap-[5px] grow h-full items-center justify-start min-h-px min-w-px relative shrink-0">
            <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#707070] text-[16px] text-nowrap">
              <p className="leading-[normal] overflow-inherit">{curriculum.uploadDate}</p>
            </div>
          </div>

          {/* Status */}
          <div className="basis-0 content-stretch flex gap-[5px] grow h-full items-center justify-start min-h-px min-w-px relative shrink-0">
            <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#707070] text-[16px] text-nowrap">
              <p className="leading-[normal] overflow-inherit">{curriculum.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
