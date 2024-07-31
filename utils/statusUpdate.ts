import { BaseVapiPayload, VapiWebhookEnum } from "@/pages/api/webhook";

export const VAPI_CALL_STATUSES = [
    "queued",
    "ringing",
    "in-progress",
    "forwarding",
    "ended",
] as const;
export type VapiCallStatus = (typeof VAPI_CALL_STATUSES)[number];
export interface StatusUpdatePayload extends BaseVapiPayload {
    type: VapiWebhookEnum.STATUS_UPDATE;
    status: VapiCallStatus;
    messages?: Array<unknown>;
}

export interface StatusUpdateMessageResponse { }

export const statusUpdateHandler = async (
    payload?: StatusUpdatePayload
): Promise<StatusUpdateMessageResponse> => {
    const callId = payload?.call.phoneCallProviderId;
    console.log({ callId });
    return payload?.status ?? "";
};
