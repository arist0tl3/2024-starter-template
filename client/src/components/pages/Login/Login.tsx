import { useEffect, useState, FormEvent, ReactElement } from 'react';
import PhoneInput from 'react-phone-number-input/input';
import { useNavigate, useParams } from 'react-router-dom';
import { RiseLoader } from 'react-spinners';
import { useGenerateAndSendPassCodeMutation, useResolvePassCodeMutation } from '../../../generated';

function Login(): ReactElement {
  const navigate = useNavigate();
  const { genericInvitationId = '' } = useParams();

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [passCode, setPassCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [passCodeVerificationError, setPassCodeVerificationError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [trackedPhoneNumberInput, setTrackedPhoneNumberInput] = useState<boolean>(false);
  const [trackedPassCodeInput, setTrackedPassCodeInput] = useState<boolean>(false);

  const [view, setView] = useState<'phone' | 'code'>('phone');

  const [generateAndSendPassCode] = useGenerateAndSendPassCodeMutation({
    onCompleted: (data) => {
      if (data.generateAndSendPassCode.error) {
        setLoading(() => false);
        setError(data.generateAndSendPassCode.error);
      } else {
        setTimeout(() => {
          setLoading(() => false);
          setView('code');
        }, 1000);
      }
    },
    variables: {
      input: {
        phoneNumber,
      },
    },
  });

  const [resolvePassCode] = useResolvePassCodeMutation({
    onCompleted: (data) => {},
    update: (cache, { data }) => {
      if (data) {
        if (data.resolvePassCode.error) {
          setPassCodeVerificationError(data.resolvePassCode.error);

          setTimeout(() => {
            setLoading(() => false);
          }, 1000);
        } else if (data.resolvePassCode.token) {
          localStorage.setItem('auth_token', data.resolvePassCode.token);

          if (data.resolvePassCode.isNewUser) {
            navigate('/');
          } else {
            navigate('/');
          }
        }
      }
    },
    refetchQueries: ['CurrentUser'],
    variables: {
      input: {
        passCode,
        phoneNumber,
        genericInvitationId,
      },
    },
  });

  const handlePhoneChange = (value: string): void => {
    if (value?.length < 11 || (value?.length === 12 && value[0] === '+')) {
      setPhoneNumber(value);
    }
  };

  const handlePhoneSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (phoneNumber?.length === 11 || (phoneNumber?.length === 12 && phoneNumber[0] === '+')) {
      setLoading(() => true);
      await generateAndSendPassCode();
    }
  };

  const handleCodeChange = (value: string): void => {
    if (!trackedPassCodeInput) {
      setTrackedPassCodeInput(() => true);
    }

    if (value?.length === 6) {
      setPassCode(value);
    }
  };

  const handleBackClick = (): void => {
    setPassCodeVerificationError('');
    setView('phone');
  };

  const handleResendClick = async (): Promise<void> => {
    setPassCode('');
    setPassCodeVerificationError('');
    await generateAndSendPassCode();
  };

  useEffect(() => {
    if (passCode?.length === 6) {
      setLoading(true);
      resolvePassCode().catch((err) => console.log(err));
    }
  }, [passCode, resolvePassCode]);

  const showPhoneError = !loading && error;
  const showVerificationError = !loading && passCodeVerificationError;

  const showPhoneInput = view === 'phone' && !loading;
  const showCodeInput = view === 'code' && !loading && !showVerificationError;

  const submitButtonIsDisabled = phoneNumber?.length < 12 || (phoneNumber?.length === 13 && phoneNumber[0] === '+');

  return (
    <>
      <div>
        <div>
          {showPhoneInput && (
            <div>
              <div>{'Sign up or log in'}</div>
              <div>{'After entering your number, we will send you a one time passcode to verify.'}</div>
              <form onSubmit={handlePhoneSubmit} style={{ marginBottom: '16px' }}>
                <PhoneInput country="US" onChange={handlePhoneChange} placeholder={'Phone number'} value={phoneNumber} />
                <button disabled={submitButtonIsDisabled} onClick={handlePhoneSubmit}>
                  {'Next'}
                </button>
              </form>
            </div>
          )}

          {showCodeInput && (
            <div>
              <div>{`Verify it's you`}</div>
              <div>{`Please enter the six digit code we sent you`}</div>
              <input
                autoFocus
                inputMode={'numeric'}
                onChange={(e) => handleCodeChange(e.currentTarget.value)}
                placeholder={'Confirmation code'}
              />
            </div>
          )}

          {showVerificationError && !showPhoneInput && (
            <div>
              <div>{'Sorry, we were not able to verify your pass code.'}</div>
              <button onClick={handleResendClick} style={{ color: 'blue', textDecoration: 'underline' }}>
                {'Click here to resend'}
              </button>
            </div>
          )}

          {loading && (
            <div>
              <div>
                <RiseLoader />
              </div>
            </div>
          )}

          {showPhoneError && (
            <div>
              <div>{`Sorry, we had trouble sending you a code to log in. Error: ${error}`}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
