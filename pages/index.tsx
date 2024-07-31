import CallActions from '@/components/CallActions'
import CallLog from '@/components/CallLog'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

export default function Home() {
  useEffect(() => {
    const socket = io()

    socket.on('connect', () => {
      console.log('Connected to server')
    })

    // Trigger the socket connection
    fetch('/api/socket')

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <main className="grid grid-cols-2 gap-6 min-h-screen justify-between p-24">
      <CallActions />
      <CallLog />
    </main>
  );
}
