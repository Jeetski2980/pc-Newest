'use client'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'cyan' | 'purple' | 'white'
}

export default function LoadingSpinner({ size = 'md', color = 'blue' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  }

  const colorClasses = {
    blue: 'border-blue-400',
    cyan: 'border-cyan-400',
    purple: 'border-purple-400',
    white: 'border-white'
  }

  return (
    <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-transparent ${colorClasses[color]} border-t-transparent`}>
      <div className={`${sizeClasses[size]} rounded-full border-2 border-transparent ${colorClasses[color]}/30`} />
    </div>
  )
}
