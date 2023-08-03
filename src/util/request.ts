const { PLOT_SERVER } = import.meta.env;

const BASE_URL = `${PLOT_SERVER as string}/api`;

interface requestParams<T> {
  url: string;
  method: string;
  body?: T;
}

const getConfig = <T>(method: string, body?: T) => {
  return {
    method,
    credentials: 'include',
    headers: {
      'Contet-Type': 'application/json',
    },
    body: JSON.stringify(body),
  } as RequestInit;
};

export const fetchRequest = async <ReturnType, RequestBodyType>({
  url,
  method,
  body,
}: requestParams<RequestBodyType>): Promise<ReturnType> => {
  if (!navigator.onLine) {
    throw new Error('NETWORK_NOT_AVAILABLE');
  }

  const response = await fetch(BASE_URL + url, getConfig<RequestBodyType>(method, body));
  const data = (await response.json()) as ReturnType | Error;

  if (!response.ok && data instanceof Error) {
    throw new Error(data?.name + ': ' + data?.message);
  }

  return data as Promise<ReturnType>;
};
