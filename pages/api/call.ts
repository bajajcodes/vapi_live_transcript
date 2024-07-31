import { NextRequest, NextResponse } from "next/server";
import { twilioClientGet } from "@/utils/twilioClient";

async function twilioHangup(
    callSid: string,
    accountSid?: string,
    authToken?: string
) {
    const { twilioClient, error } = twilioClientGet(accountSid, authToken);
    if (!twilioClient) return { error };

    try {
        const call = await twilioClient
            .calls(callSid!)
            .update({ twiml: "<Response><Hangup/></Response>" });
        return { call };
    } catch (error: any) {
        return { error: `Couldn't Hangup Twilio Call. Error: ${error.message}` };
    }
}

export const runtime = "edge"

export default async function CallHandler() {
    try {
        const response = await fetch(`${process.env.VAPI_BASE_URL}/call`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
            },
            body: JSON.stringify({
                phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID,
                assistantId: process.env.ASSISTANT_ID,
                customer: {
                    number: process.env.CUSTOMER_PHONE_NUMBER,
                },
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            {
                message: "Failed to place outbound call",
                error: error?.message,
            },
            { status: 500 }
        );
    }
}
