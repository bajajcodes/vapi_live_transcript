import React from 'react'
import { Button } from './ui/button';
import { useVapi } from '@/hooks/useVapi';

export default function CallActions() {
    const { start, stop } = useVapi();
    return (
        <div className="flex flex-col gap-4">
            <Button onClick={start}>Start Call</Button>
            <Button variant="destructive" onClick={stop}>
                End Call
            </Button>
        </div>
    );
}
