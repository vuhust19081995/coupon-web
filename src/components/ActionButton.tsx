'use client'

interface ActionButtonProps {
  url: string
  children: React.ReactNode
  className?: string
}

export default function ActionButton({ url, children, className = '' }: ActionButtonProps) {
  const handleClick = () => {
    window.open(url, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  )
}
