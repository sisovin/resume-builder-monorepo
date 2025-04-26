import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { init as initApm } from '@elastic/apm-rum';

export function initMonitoring() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });

  initApm({
    serviceName: 'resume-builder-frontend',
    serverUrl: process.env.NEXT_PUBLIC_APM_SERVER_URL,
    environment: process.env.NODE_ENV,
  });
}
