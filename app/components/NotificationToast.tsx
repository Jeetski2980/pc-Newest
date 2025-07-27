'use client'
import { useState, useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

interface NotificationToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export default function NotificationToast({ 
  message, 
  type, 
  isVisible, 
  onClose, 
  duration = 4000 
}: NotificationToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  const typeStyles = {
    success: 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300',
    error: 'bg-red-500/20 border-red-400/30 text-red-300',
    info: 'bg-blue-500/20 border-blue-400/30 text-blue-300'
  }

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info
  }

  const Icon = icons[type]

  return (
    <div className={`fixed top-20 right-6 z-50 max-w-sm animate-in slide-in-from-right-full duration-300`}>
      <div className={`backdrop-blur-xl rounded-xl p-4 border shadow-xl ${typeStyles[type]}`}>
        <div className="flex items-center space-x-3">
          <Icon className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium flex-1">{message}</p>
          <button
            onClick={onClose}
            className="text-current hover:opacity-70 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
