import { Search } from 'lucide-react'
import { useState } from 'react'

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="bg-[#f3f3f5] box-border shrink-0 content-stretch flex items-center justify-start min-h-px min-w-px py-[7.5px] px-[10px] relative rounded-[7.5px] gap-[7.5px]">
      <Search className="shrink-0 size-[15px] text-[#717182]" />
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-transparent border-0 outline-none text-[#030213] text-[14px] w-[200px] placeholder:text-[#717182]"
      />
    </div>
  )
}
