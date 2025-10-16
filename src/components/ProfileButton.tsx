import { User } from 'lucide-react'

export const ProfileButton = () => {
  return (
    <button className="bg-[#f3f3f5] box-border shrink-0 flex items-center justify-center min-h-px min-w-px p-[7.5px] relative rounded-[7.5px] size-[35px] hover:bg-[#e9ebef] transition-colors">
      <User className="size-[20px] text-[#030213]" />
    </button>
  )
}
