import { twilioClientGet } from "@/utils/twilioClient";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge"
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

//temporary will be moved to hangup endpoint
export default async function DeleteHandler(req: NextRequest) {
    try {
        const body = await req.json();
        const callSid = body?.callSid ?? null;
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const { call, error } = await twilioHangup(callSid, accountSid, authToken);
        if (error || !call) {
            throw Error(
                `Couldn't Hang Up Twilio Call. Error: ${JSON.stringify(error)}`
            );
        }
        return NextResponse.json(
            { message: "Succesfully hangup outbound call" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                message: "Failed to hangup outbound call",
                error: error?.message,
            },
            { status: 500 }
        );
    }
}