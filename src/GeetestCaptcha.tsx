import React, { forwardRef, Ref, useImperativeHandle } from 'react';
import { GeetestCaptchaProps, CaptchaRef } from './types';
import { useGeetestCaptcha } from './hooks';

const GeetestCaptcha = forwardRef(
  ({ config, className }: GeetestCaptchaProps, ref: Ref<CaptchaRef>) => {
    const { captcha } = useGeetestCaptcha({
      ...config,
      appendTo: '#GeetestCaptchaBox',
    });

    useImperativeHandle(ref, () => ({
      reset() {
        captcha?.reset();
      },
      verify() {
        captcha?.verify();
      },
      destroy() {
        captcha?.destroy();
      },
      show() {
        captcha?.show();
      },
      hide() {
        captcha?.hide();
      },
    }));
    return <div className={className} id="GeetestCaptchaBox" />;
  },
);

export default GeetestCaptcha;
