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
