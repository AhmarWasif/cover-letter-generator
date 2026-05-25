# Cover Letter Generator

An AI-powered web app that drafts tailored cover letters. Paste in a job
description and a few notes about your background, pick a tone and length, and
the app generates a ready-to-edit cover letter using the Claude API.

**Live demo:** [add your Vercel URL here]

This is my first AI-native project, built to learn how to wire a front end up
to a large language model and deploy it securely.

## What it does

- Takes a job description and a short summary of your experience
- Lets you choose a tone (warm, formal, confident, conversational) and length
- Sends those inputs to Claude and returns a complete cover letter
- One-click copy to clipboard

## How it's built

The app is a static front end backed by a serverless function, deployed on
Vercel:

- **Front end** — HTML, CSS, and vanilla JavaScript (no frameworks). Collects
  the user's inputs and displays the result.
- **Backend** — a Vercel serverless function (`api/generate.js`) that receives
  the inputs, calls the Claude API, and returns the generated letter.
- **AI** — the [Claude API](https://docs.claude.com/en/api/overview), using the
  `claude-haiku-4-5` model.

### Why a backend?

The API key is a secret. If it lived in the front-end code, anyone visiting the
site could read it and run up usage on the account. Instead, the key is stored
as an environment variable on the server and is only ever used inside the
serverless function. The browser talks to the function; the function talks to
Claude. The key never reaches the client, so the app is safe to share publicly
and visitors don't need their own key.

The function also caps input length to guard against abuse.

## Project structure

```
cover-letter-generator/
├── index.html        # front end
├── api/
│   └── generate.js   # serverless function (holds the key, calls Claude)
├── .gitignore
└── README.md
```

## Running it yourself

1. Clone this repo.
2. Get an Anthropic API key at [console.anthropic.com](https://console.anthropic.com).
3. Deploy to Vercel and add the key as an environment variable named
   `ANTHROPIC_API_KEY`.
4. Vercel auto-detects the static site and the `api` folder — no build config needed.

## What I learned

- How to make a request to an AI API and handle the response
- Why API keys must stay out of client code, and how a serverless function
  keeps them secret
- How to deploy a full project to Vercel and connect it to GitHub for automatic
  deploys on every push
- The difference between running a site locally and shipping it to production

## Roadmap

- [x] Move the API key to a secure serverless backend
- [x] Deploy a public, shareable version
- [ ] Add rate limiting to further protect against abuse
- [ ] Let users download the letter as a PDF
- [ ] Add a few more output formats (follow-up email, LinkedIn message)
