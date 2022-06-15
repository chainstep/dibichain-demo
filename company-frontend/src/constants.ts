import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const BACKEND_BASE_URL = publicRuntimeConfig.NEXT_PUBLIC_BACKEND_BASE_URL;
export const COMPANY_NAME = publicRuntimeConfig.NEXT_PUBLIC_COMPANY_NAME;
export const PUBLIC_BASE_PATH = publicRuntimeConfig.NEXT_PUBLIC_BASE_PATH || '';