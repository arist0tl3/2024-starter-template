// import { Twilio } from 'twilio';
import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";

import { IContext } from "../../../types";

import {
  GenerateAndSendPassCodeResponse,
  MutationGenerateAndSendPassCodeArgs,
} from "../../../generated";

const {
  TWILIO_AUTH_TOKEN = "",
  TWILIO_ACCOUNT_SID = "",
  NODE_ENV = "dev",
  TWILIO_FROM_NUMBER = "",
} = process.env;

// const twilioClient = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const phoneUtil = new PhoneNumberUtil();

/**
 * Create a short lived token with a random 6 digit number
 */
async function generateAndSendPassCode(
  parent: undefined,
  args: MutationGenerateAndSendPassCodeArgs,
  context: IContext
): Promise<GenerateAndSendPassCodeResponse> {
  try {
    const expirationDate = new Date();
    expirationDate.setMinutes(new Date().getMinutes() + 2);

    const { phoneNumber } = args.input;

    const parsedPhoneNumber = phoneUtil.parse(phoneNumber);
    const formattedPhoneNumber = phoneUtil.format(
      parsedPhoneNumber,
      PhoneNumberFormat.E164
    );

    // Remove any existing pass codes for this number
    await context.models.PassCodeToken.remove({
      phoneNumber: formattedPhoneNumber,
    });

    if (NODE_ENV === "production") {
      const isFakeNumber = formattedPhoneNumber.includes("+1555");

      let passCode = Math.floor(100000 + Math.random() * 900000).toString();

      // TODO: Move this to a staging env
      if (isFakeNumber) {
        passCode = "111112";
      }

      await context.models.PassCodeToken.create({
        passCode,
        phoneNumber: formattedPhoneNumber,
        expirationDate,
      });

      if (!isFakeNumber) {
        // await twilioClient.messages.create({
        //   body: `Your HomePost verification code is: ${passCode}`,
        //   from: TWILIO_FROM_NUMBER,
        //   to: formattedPhoneNumber,
        // });
      }
    } else {
      const passCode = "123456";

      await context.models.PassCodeToken.create({
        passCode,
        phoneNumber: formattedPhoneNumber,
        expirationDate,
      });
    }

    return {
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.toString(),
    };
  }
}

export default generateAndSendPassCode;
