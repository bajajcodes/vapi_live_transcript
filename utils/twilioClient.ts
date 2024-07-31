import { Twilio } from "twilio";

export function twilioClientGet(accountSid?: string, authToken?: string) {
    try {
        const twilioClient = new Twilio(accountSid, authToken);
        return { twilioClient };
    } catch (error: any) {
        return {
            error: `Couldn't Instantiate Twilio Client. Error: ${JSON.stringify(
                error.message
            )}`,
        };
    }
}
