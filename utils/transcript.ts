import { BaseVapiPayload, VapiWebhookEnum } from "@/pages/api/webhook";

export interface TranscriptMessageResponse { }
export interface TranscriptPayload extends BaseVapiPayload {
    type: VapiWebhookEnum.TRANSCRIPT;
    role: "assistant" | "user";
    transcriptType: "partial" | "final";
    transcript: string;
}

export const transcriptHandler = async (
    payload?: TranscriptPayload
): Promise<TranscriptMessageResponse> => {
    return (
        {
            role: payload?.role,
            transcript: payload?.transcript,
            type: payload?.transcriptType,
        } ?? {}
    );
};
