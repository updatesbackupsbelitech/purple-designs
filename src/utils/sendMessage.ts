import { contactForm } from '../data/contact'

export interface ContactPayload {
  name: string
  subject: string
  email: string
  phone: string
  message: string
  website: string // hidden spam trap: real visitors leave it empty
}

interface ServerReply {
  ok?: boolean
  error?: string
}

// Sends the form to the PHP file. Throws an Error with a friendly message if anything fails.
export async function sendMessage(payload: ContactPayload): Promise<void> {
  // Test mode: pretend it worked, to try the pop-up without PHP
  if (contactForm.simulate) {
    await new Promise((resolve) => setTimeout(resolve, 1200))
    return
  }

  let response: Response
  try {
    response = await fetch(contactForm.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error(
      'We could not reach the server. Please check your internet connection and try again.',
    )
  }

  let reply: ServerReply | null = null
  try {
    reply = (await response.json()) as ServerReply
  } catch {
    reply = null // the server did not answer with JSON (for example, the PHP file is missing)
  }

  if (!response.ok || !reply?.ok) {
    throw new Error(reply?.error ?? contactForm.errorMessage)
  }
}