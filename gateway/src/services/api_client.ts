import axios, { AxiosError } from 'axios';

export interface SynthesisSubmissionPayload {
  title: string;
  tagline: string;
  description: string;
  video_url: string;
  github_url: string;
  track_id: string;
  logo?: string;
  mollbookPostURL?: string;
}

export interface SynthesisSubmissionResponse {
  project_id: string;
  [key: string]: unknown;
}

/**
 * Submits a project draft to the Synthesis hackathon platform via Devfolio API
 * @param payload - The project submission payload
 * @returns The response data containing project_id
 * @throws Error if submission fails
 */
export async function submitToSynthesis(
  payload: SynthesisSubmissionPayload
): Promise<SynthesisSubmissionResponse> {
  const apiKey = process.env.DEVFOLIO_API_KEY;

  if (!apiKey) {
    throw new Error(
      'DEVFOLIO_API_KEY is not set in environment variables. ' +
      'Please configure the API key to enable Synthesis submissions.'
    );
  }

  try {
    const response = await axios.post<SynthesisSubmissionResponse>(
      'https://synthesis-md.devfolio.co/api/projects',
      payload,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 second timeout
      }
    );

    if (response.status === 201) {
      console.log('[Synthesis API] Project submitted successfully:', response.data.project_id);
      return response.data;
    }

    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        throw new Error(
          'Authentication failed: Invalid or missing DEVFOLIO_API_KEY. ' +
          'Please verify the API key is correct.'
        );
      }
      if (error.response?.status === 400) {
        throw new Error(
          `Bad request: ${error.response.data?.message || 'Invalid payload format'}. ` +
          'Please verify all required fields are present and properly formatted.'
        );
      }
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout: The Synthesis API took too long to respond. Please try again.');
      }
      throw new Error(
        `Synthesis API error: ${error.response?.status} - ${error.response?.data?.message || error.message}`
      );
    }
    throw error;
  }
}

/**
 * Validates the required fields for a Synthesis submission
 * @param payload - The submission payload to validate
 * @returns Array of missing field names (empty if valid)
 */
export function validateSubmissionPayload(payload: Partial<SynthesisSubmissionPayload>): string[] {
  const requiredFields: (keyof SynthesisSubmissionPayload)[] = [
    'title',
    'tagline',
    'description',
    'video_url',
    'github_url',
    'track_id',
  ];

  return requiredFields.filter(field => !payload[field]);
}
