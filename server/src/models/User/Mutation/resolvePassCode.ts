import jwt from 'jsonwebtoken';

import { IContext } from '../../../types';
import { MutationResolvePassCodeArgs, ResolvePassCodeResponse } from '../../../generated';

/**
 * Exchange a valid, short lived login token for a long-lived auth token that can be used
 * to make authenticated calls and revoked if necessary
 */
async function resolvePassCode(parent: undefined, args: MutationResolvePassCodeArgs, context: IContext): Promise<ResolvePassCodeResponse> {
  try {
    const { phoneNumber, passCode } = args.input;

    const now = new Date();

    const passCodeToken = await context.models.PassCodeToken.findOne({
      phoneNumber,
      passCode,
      expirationDate: {
        $gte: now,
      },
    });

    if (!passCodeToken) throw new Error('Unable to verify this code');

    // Remove token
    await context.models.PassCodeToken.findByIdAndDelete(passCodeToken._id);

    let isNewUser = false;

    // Look for an existing user, and create one if one does not exist
    // Note: in the future we should use something besides phone number
    let user = await context.models.User.findOne({ phoneNumber });

    if (!user) {
      isNewUser = true;

      user = await context.models.User.create({
        phoneNumber,
      });
    }

    // Create new token w/30 day expiry
    const expirationDate = new Date();
    expirationDate.setHours(new Date().getHours() + 24 * 30);

    const token = jwt.sign(
      {
        phoneNumber,
        type: 'auth',
      },
      'secret',
    );

    // Store the token
    await context.models.AuthToken.create({
      expiresAt: expirationDate,
      phoneNumber,
      userId: user._id,
    });

    return {
      isNewUser,
      success: true,
      token,
    };
  } catch (err: any) {
    console.log('err', err);
    return {
      success: false,
      error: err.toString(),
    };
  }
}

export default resolvePassCode;
