import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

interface Transcript {
    role: 'assistant' | 'user';
    transcript: string;
    type: 'final' | 'partial';
}

export default function CallTranscript() {
    const [callTranscript, setCallTranscript] = useState<Transcript[]>([]);

    useEffect(() => {
        const socket = io()

        socket.on('messages', (message) => {
            console.log(message.transcript)
            if (message.transcript) {
                setCallTranscript((prevMessages: any) => [...prevMessages, message.transcript]);
            }
        })

        // Trigger the socket connection
        fetch('/api/socket')

        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <div className="rounded-md border bg-background p-4 shadow-sm">
            <div className="flex flex-col bg-primary px-4 py-2 rounded-md text-primary-foreground font-medium">
                <span>Call Transcript</span>
            </div>
            <div className="my-2 overflow-x-hidden min-h-96 h-96">
                {callTranscript.length === 0 ? (
                    <p>No transcripts available</p>
                ) : (
                    <ul className="space-y-2"> {/* Added space-y-2 for vertical spacing */}
                        {callTranscript.map((message: any, index: number) => (
                            <li key={index} className="flex items-center justify-start">
                                <span
                                    className={`text-${message?.role === 'assistant' ? 'blue' : 'green'} font-bold mr-2`}
                                >
                                    {message?.role}
                                </span>
                                <span>{message?.transcript}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
