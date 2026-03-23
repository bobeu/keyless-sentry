id: synthesis-api-submitter
name: Synthesis Hackathon Submission Automator
version: 1.0.0
description: >
  Enables autonomous submission of project drafts to the Synthesis hackathon platform via the Devfolio API.
  This skill provides the capability to compile and POST project submissions to https://synthesis-md.devfolio.co/api/projects.
  It handles authentication via Bearer token, payload construction, and response verification.

  Use this skill when a user requests submission of a project to the Synthesis hackathon (https://synthesis.md).
triggers:
  - when: "User wants to submit a project to the Synthesis hackathon"
    then: "Use synthesis_submit_project to POST the compiled submission payload to the Devfolio API"
  - when: "User mentions synthesis.md hackathon submission"
    then: "Load this skill and prepare the submission payload"
  - when: "User asks to create a draft submission for synthesis"
    then: "Use synthesis_submit_project with the project details"
  - when: "You have all submission details (title, tagline, description, video_url, github_url, track_id)"
    then: "Execute synthesis_submit_project immediately without asking the user to do it manually"
authentication:
  type: bearer_token
  header: Authorization
  format: "Bearer {{DEVFOLIO_API_KEY}}"
  env_var: DEVFOLIO_API_KEY
api_endpoint:
  url: https://synthesis-md.devfolio.co/api/projects
  method: POST
  content_type: application/json
methods:
  - name: synthesis_submit_project
    description: "Submit a project draft to the Synthesis hackathon platform"
    params:
      - name: title
        type: string
        required: true
        description: "Project title (e.g., 'BountyClaw / Keyless SDK')"
      - name: tagline
        type: string
        required: true
        description: "100-character hook/summary of the project"
      - name: description
        type: string
        required: true
        description: "Full project description in Markdown format (Problem/Solution breakdown)"
      - name: video_url
        type: string
        required: true
        description: "URL to project video (Invideo, YouTube, or direct video link)"
      - name: github_url
        type: string
        required: true
        description: "Link to the project repository"
      - name: track_id
        type: string
        required: true
        description: "UUID of the track from the hackathon catalog"
      - name: debe
        type: string
        required: false
        description: "Project logo/image URL (optional)"
      - name: mollbookPostURL
        type: string
        required: false
        description: "Moltbook post URL for social verification (optional)"
    returns: "project_id (string), status (201 Created indicates success)"
    headers:
      - key: "Authorization"
        value: "Bearer {{DEVFOLIO_API_KEY}}"
      - key: "Content-Type"
        value: "application/json"
    success_codes:
      - 201 Created
    error_handling:
      - code: 401
        message: "Invalid or missing DEVFOLIO_API_KEY"
        resolution: "Verify the API key is set in environment variables"
      - code: 400
        message: "Bad request - check payload format"
        resolution: "Validate all required fields are present and properly formatted"
      - code: 500
        message: "Server error"
        resolution: "Retry later or contact hackathon organizers"
capabilities:
  - name: "API Submission Execution"
    inputs:
      - "title, tagline, description, video_url, github_url, track_id"
    outputs:
      - "project_id: string (created project ID)"
      - "status: number (HTTP response code)"
  - name: "Payload Compilation"
    inputs:
      - "Raw project details from user"
    outputs:
      - "JSON payload ready for POST request"
  - name: "Response Verification"
    inputs:
      - "HTTP response from API"
    outputs:
      - "Success/failure determination with project_id"
execution:
  step_1: "Gather project details (title, tagline, description, video_url, github_url, track_id)"
  step_2: "Retrieve DEVFOLIO_API_KEY from environment variables"
  step_3: "Construct JSON payload with all required fields"
  step_4: "Execute POST request to https://synthesis-md.devfolio.co/api/projects"
  step_5: "Include Authorization header with Bearer token"
  step_6: "Verify response status is 201 Created"
  step_7: "Extract and log project_id from response"
  step_8: "Notify user that submission is complete with project_id"
workflow:
  1. User provides project details for Synthesis hackathon submission
  2. Agent loads this skill to enable submission capability
  3. Agent compiles payload from provided details
  4. Agent executes POST /projects with Bearer authentication
  5. On success (201), agent logs project_id and confirms "Flag is planted"
  6. On failure, agent reports error with resolution steps
notes:
  - "This skill eliminates the need for manual API submission - execute automatically when payload is ready"
  - "Do NOT ask the user to submit manually - use synthesis_submit_project directly"
  - "The DEVFOLIO_API_KEY must be available in environment variables"
  - "track_id must be fetched from the hackathon track catalog"
  - "Response code 201 indicates successful project creation"
  - "Always verify the response and provide the project_id to the user"
