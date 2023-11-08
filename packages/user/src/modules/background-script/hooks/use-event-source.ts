import React, { useCallback } from "react";

export type EventSourceConnectionStatus =
  | "connected"
  | "disconnected"
  | "connecting";

export type Message = {
  origin: string;
  lastEventId: string;
  data: string;
};

interface EventSourceOptions {
  withCredentials: boolean;
}

interface UseEventSourceConfig {
  autoConnect: boolean;
  eventSourceConfig: EventSourceOptions;
}

const DEFAULTS = { autoConnect: false };
export const useEventSource = (
  url: string,
  onMessage: (msg: Message) => void,
  config: UseEventSourceConfig = {
    autoConnect: false,
    eventSourceConfig: {
      withCredentials: false,
    },
  }
) => {
  const options = { ...DEFAULTS, ...config };

  const [connectionStatus, setConnectionStatus] =
    React.useState<EventSourceConnectionStatus>("disconnected");
  const [error, setError] = React.useState<ErrorEvent | null>(null);
  const streamRef = React.useRef<EventSource>();

  const openStream = React.useCallback(() => {
    const stream = new EventSource(url, options.eventSourceConfig);
    stream.onopen = () => setConnectionStatus("connected");
    stream.onerror = (msg) => void setError(msg as ErrorEvent);
    stream.onmessage = onMessage;
    streamRef.current = stream;
  }, [url, options.eventSourceConfig, onMessage]);

  const closeStream = useCallback(() => {
    if (streamRef.current && streamRef.current.close) {
      streamRef.current.close();
      streamRef.current = undefined;
      setConnectionStatus("disconnected");
      setError(null);
    }
  }, []);

  React.useEffect(() => {
    if (options.autoConnect) {
      openStream();
      return closeStream;
    }

    return;
  }, [closeStream, openStream, options.autoConnect]);

  return React.useMemo(() => {
    return {
      connectionStatus,
      error,
      closeStream,
      openStream,
    };
  }, [connectionStatus, error, closeStream, openStream]);
};
