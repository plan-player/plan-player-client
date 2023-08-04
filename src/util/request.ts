const { PLOT_SERVER } = import.meta.env;

const BASE_URL = `${PLOT_SERVER as string}/api`;

interface requestParams {
  url: string;
  method: string;
  body?: unknown;
}

interface ResponseType<T> {
  data: T;
  status: string;
  code: number;
  message: string;
}

const getConfig = (method: string, body?: unknown) => {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  } as RequestInit;
};

export const fetchRequest = async <T>({
  url,
  method,
  body,
}: requestParams): Promise<T> => {
  if (!navigator.onLine) {
    throw new Error('NETWORK_NOT_AVAILABLE');
  }

  const response = await fetch(BASE_URL + url, getConfig(method, body));
  const data = (await response.json()) as ResponseType<T> | Error;

  if (data instanceof Error) {
    throw new Error(`${data?.name}: ${data?.message}`);
  }

  if (!response.ok) {
    throw new Error(`[${response.status}] ${response.statusText}`);
  }

  if (data.status === 'OK') {
    return data.data;
  } else {
    throw new Error(`${data.status}: ${data.message}`);
  }
};
