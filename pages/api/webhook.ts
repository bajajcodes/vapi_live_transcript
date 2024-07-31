import { statusUpdateHandler, StatusUpdatePayload } from "@/utils/statusUpdate";
import { transcriptHandler, TranscriptPayload } from "@/utils/transcript";
import { NextApiRequest } from "next";

export enum VapiWebhookEnum {
    STATUS_UPDATE = "status-update",
    END_OF_CALL_REPORT = "end-of-call-report",
    HANG = "hang",
    SPEECH_UPDATE = "speech-update",
    TRANSCRIPT = "transcript",
}

export interface VapiCall {
    phoneCallProviderId: string | undefined;
}
export interface BaseVapiPayload {
    call: VapiCall;
}
export type VapiPayload = StatusUpdatePayload | TranscriptPayload;
// | EndOfCallReportPayload

export interface ConversationMessage {
    role: "user" | "system" | "bot" | "function_call" | "function_result";
    message?: string;
    name?: string;
    args?: string;
    result?: string;
    time: number;
    endTime?: number;
    secondsFromStart: number;
}


export default async function WebhookHandler(req: NextApiRequest, res) {
    const conversationUuid = req.query.conversation_uuid as string;

    const update: Partial<{ statusUpdate: any; transcript: any }> = {};

    try {
        const payload = req.body.message as VapiPayload;
        switch (payload.type) {
            case VapiWebhookEnum.STATUS_UPDATE:
                const statusUpdateResponse = await statusUpdateHandler(payload);
                update.statusUpdate = statusUpdateResponse;
                break;
            case VapiWebhookEnum.TRANSCRIPT:
                const transcriptResponse = await transcriptHandler(payload);
                update.transcript = transcriptResponse;
                break;
            default:
                console.error(`Unhandled message type`);
        }
        res?.socket?.server?.io?.emit("messages", update)

        return res.status(201).json(update);
    } catch (error: any) {
        return res.status(500).json({
            message: "Failed to place outbound call",
            error: error?.message,
        });
    }
}
