import * as Sentry from '@sentry/node';

// Initialize Sentry (ensure this is done at the entry point of your application)
const SENTRY_DSN = process.env.SENTRY_DSN; // Ensure DSN is securely managed through environment variables

if (!SENTRY_DSN) {
  throw new Error('SENTRY_DSN environment variable is not set');
}

Sentry.init({
  dsn: SENTRY_DSN,
  // Optional configuration settings
  tracesSampleRate: 1.0, // Adjust this value based on your needs (1.0 for 100% of transactions)
  environment: process.env.NODE_ENV || 'development', // Helps in differentiating logs based on environment
});

export function logError(context: string, error: Error) {
  const errorMessage = `[${new Date().toISOString()}] [${context}] Error: ${error.message}`;

  // Log to the console
  console.error(errorMessage);

  // Send error to Sentry
  Sentry.captureException(error);

  // Optional: Add additional context or breadcrumbs
  Sentry.withScope(scope => {
    scope.setContext('error', {
      context,
      message: error.message,
    });
    scope.setExtra('stacktrace', error.stack);
    Sentry.captureException(error);
  });
}

export function logInfo(message: string, data?: any): void {
  const infoMessage = `INFO: ${message} ${data ? JSON.stringify(data) : ''}`;

  // Log to the console
  console.log(infoMessage);

  // Send info to Sentry (optional, as Sentry is typically used for errors)
  Sentry.captureMessage(infoMessage, 'info');

  // Optional: Add additional context or breadcrumbs
  Sentry.withScope(scope => {
    scope.setContext('info', {
      message,
      data,
    });
    Sentry.captureMessage(infoMessage, 'info');
  });
}
