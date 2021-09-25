import { useEffect, useState } from 'react';
import { isFunction } from 'lodash';

export interface RegisterData {
    gt: string;
    challenge: string;
    new_captcha: boolean;
    success: boolean;
}

export interface GeetestConfig {
    type: 'popup' | 'bind' | 'float' | 'custom';
    registerData: RegisterData;
    appendTo?: string;
    width?: string;
    lang? :string
    https?: boolean;
    timeout?: number;
    hideClose?: boolean;
    hideSuccess?: boolean;
    hideRefresh?: boolean;
    onSuccess?: (callback: () => void) =>void;
    onClose?: (callback: () => void) => void;
    onReady?: (callback: () => void) => void;
}

export interface ValidateData {
    geetest_challenge: string;
    geetest_validate: string;
    geetest_seccode: string;
}

export interface GeetestCaptcha {
    onReady: (callback: () => void) => void
    onSuccess: (callback: () => void) => void
    onClose: (callback: () => void) => void
    verify: () => void
    destroy: () => void
    reset: () => void
    show: () => void
    hide: () => void
    getValidate: () => ValidateData
    appendTo: (selector: string) => void
}

export const useGeetestCaptcha = (props: GeetestConfig) => {
  const {
    type,
    registerData,
    appendTo,
    width,
    lang,
    https,
    timeout,
    hideClose,
    hideSuccess,
    hideRefresh,
    onClose,
    onReady,
    onSuccess,
  } = props;
  const [verified, setVerified] = useState(false);
  const [ready, setReady] = useState(false);
  const [captcha, setCaptcha] = useState<GeetestCaptcha>();
  useEffect(() => {
    // @ts-ignore
    import('./lib/gt');
    const handler = (geetestCaptcha: GeetestCaptcha) => {
      setCaptcha(geetestCaptcha);
      if ((type === 'popup' || type === 'float') && appendTo) {
        geetestCaptcha.appendTo(appendTo);
      }
      geetestCaptcha.onReady(() => {
        setReady(true);
        if (onReady && isFunction(onReady)) {
          onReady();
        }
      });

      geetestCaptcha.onSuccess(() => {
        setVerified(true);
        if (onSuccess && isFunction(onSuccess)) {
          onSuccess();
        }
      });
      geetestCaptcha.onClose(() => {
        if (onClose && isFunction(onClose)) {
          onClose();
        }
      });
    };
    // @ts-ignore
    // eslint-disable-next-line no-undef
    if (window.initGeetest) {
      const options = {
        lang: lang || 'en',
        gt: registerData.gt,
        challenge: registerData.challenge,
        new_captcha: registerData.new_captcha,
        offline: !registerData.success,
        product: type,
        width: width || '100%',
        hideClose: hideClose || false,
        hideSuccess: hideSuccess || false,
        hideRefresh: hideRefresh || false,
        https: https || false,
        timeout: timeout || 30000,
      };
      // @ts-ignore
      // eslint-disable-next-line no-undef
      window.initGeetest(options, handler);
    }
  }, []);
  return {
    ready,
    verified,
    captcha,
  };
};
