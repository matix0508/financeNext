export async function useFetch<T>(
  endpoint: string,
  method: string = "GET",
  body: any = {}
) {
  const response = await fetch(endpoint, {
    method: method,
    body: JSON.stringify({
      ...body,
      headers: {
        "Content-Type": "application/json",
      },
    }),
  });
  const data: T = await response.json();
  return data
}
