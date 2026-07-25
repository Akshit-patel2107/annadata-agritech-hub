type ErrorOptions = {
  boundary?: string;
};

type ErrorEvents = {
  captureException?: (error: unknown, context?: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    __appEvents?: ErrorEvents;
    __reportRuntimeError?: (payload: {
      message: string;
      stack?: string;
      boundary?: string;
    }) => void;
  }
}

export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  console.error(error);
  window.__appEvents?.captureException?.(error, context);
}

export function reportRuntimeError(error: Error, boundary?: string) {
  if (typeof window === "undefined") return;
  reportError(error, { boundary });
  window.__reportRuntimeError?.({
    message: error.message,
    stack: error.stack,
    boundary,
  });
}
