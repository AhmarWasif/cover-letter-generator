// ============================================================
//  api/generate.js  —  the secure backend (Phase 2)
// ============================================================
//  This file runs on Vercel's SERVER, not in anyone's browser.
//  It is the only thing that ever touches your API key.
//
//  How it works:
//    1. Your web page sends the job description + experience here.
//    2. This function reads your key from a secret "environment
//       variable" (set in the Vercel dashboard, never in this code).
//    3. It calls Claude, then sends the finished letter back to the page.
//
//  Because the key lives here on the server, visitors never see it
//  and never need their own. That's the whole point of Phase 2.
// ============================================================

export default async function handler(req, res) {
  // Only accept POST requests (the method our page uses to send data).
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  // Read the secret key from Vercel's environment variables.
  // It is NEVER written in this file — Vercel injects it at runtime.
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "The server is missing its API key. Set ANTHROPIC_API_KEY in Vercel."
    });
  }

  try {
    // Pull the user's inputs out of the request.
    const { job, experience, tone, length } = req.body || {};

    // Basic validation.
    if (!job || !experience) {
      return res.status(400).json({ error: "Missing job description or experience." });
    }

    // Safety: cap input length so nobody can send a giant prompt and
    // run up your bill. This is a cheap, effective abuse guard.
    const MAX = 6000;
    const safeJob = String(job).slice(0, MAX);
    const safeExperience = String(experience).slice(0, MAX);
    const safeTone = String(tone || "warm but professional").slice(0, 100);
    const safeLength = String(length || "around 250 words").slice(0, 100);

    // Build the instruction we send to Claude.
    const prompt =
      "Write a cover letter for this job application.\n\n" +
      "TONE: " + safeTone + ".\n" +
      "LENGTH: " + safeLength + ".\n\n" +
      "JOB DESCRIPTION:\n" + safeJob + "\n\n" +
      "ABOUT THE APPLICANT:\n" + safeExperience + "\n\n" +
      "Write only the cover letter itself — no preamble, no notes, no " +
      "placeholders like [Your Name]. If a detail is unknown, write naturally around it.";

    // Call Claude's API. Note: NO browser-access header needed here,
    // because this request comes from a server, not a browser.
    const claudeResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await claudeResponse.json();

    // If Claude returned an error, pass a clean message back to the page.
    if (data.error) {
      return res.status(502).json({ error: data.error.message || "AI request failed." });
    }

    // Success — send just the letter text back to the browser.
    return res.status(200).json({ letter: data.content[0].text });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong: " + err.message });
  }
}
