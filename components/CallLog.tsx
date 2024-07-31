import React, { useEffect, useState } from 'react'
import CallTranscript from './CallTranscript';
import io from 'socket.io-client';

export default function CallLog() {
    const [callStatus, setCallStatus] = useState<string | null>(null);

    useEffect(() => {
        const socket = io()

        socket.on('messages', (message) => {
            if (message.statusUpdate) {
                setCallStatus(message.statusUpdate)
            }
        })

        // Trigger the socket connection
        fetch('/api/socket')

        return () => {
            socket.disconnect()
        }
    }, [])

    const statusClass = callStatus === 'ended' ? 'text-red-600' : 'text-green-600';

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between bg-primary px-4 py-2 rounded-md ">
                <h1 className='text-base font-semibold text-white'>Call Status:</h1>
                <span className={`${statusClass} font-normal capitalize`}>{callStatus ?? "--"}</span>
            </div>
            <CallTranscript />
        </div>
    );
}
