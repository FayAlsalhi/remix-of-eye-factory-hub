// Backend API configuration
export const API_BASE_URL = 'https://doodle-premises-veto.ngrok-free.dev';

export const apiUrl = (path: string) => {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${p}`;
};

export async function predictInspection(file: File): Promise<unknown> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(apiUrl('/inspections/predict'), {
    method: 'POST',
    body: formData,
    headers: {
      // ngrok free tier requires this header to skip the browser warning page
      'ngrok-skip-browser-warning': 'true',
    },
  });

  if (!response.ok) {
    throw new Error(`Prediction request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
