# Cover Letter Generator

An AI-powered web app that drafts tailored cover letters. Paste in a job
description and a few notes about your background, pick a tone, and the app
generates a ready-to-edit cover letter using the Claude API.

This is my first AI-native project — built to learn how to wire a front end
up to a large language model.

## What it does

- Takes a job description and a short summary of your experience
- Lets you choose a tone (warm, formal, confident, conversational) and length
- Sends those inputs to Claude and returns a complete cover letter
- One-click copy to clipboard

## Built with

- HTML, CSS, and vanilla JavaScript (no frameworks)
- The [Claude API](https://docs.claude.com/en/api/overview) (`claude-haiku-4-5` model)

## How to run it

1. Clone or download this repo.
2. Open `index.html` in a browser (double-click it, or use a live server).
3. Paste your own Anthropic API key into the field at the top.
   You can get one at [console.anthropic.com](https://console.anthropic.com).
4. Fill in the job description and your experience, then click **Generate letter**.

> Note: this version uses a "bring your own key" pattern — the key is entered
> in the browser at runtime and is never stored in the code. A future version
> moves the key to a secure backend so the app can be shared publicly without
> each visitor needing their own key.

## What I learned

- How to make a request to an AI API and handle the response
- Why API keys must stay out of source code, and how to keep them safe
- The difference between running a site locally and deploying it publicly

## Roadmap

- [ ] Move the API key to a secure serverless backend (Vercel)
- [ ] Deploy a public, shareable version
- [ ] Let users download the letter as a PDF
