import { NextResponse } from 'next/server';

// Mailjet API credentials
const MAILJET_API_KEY = '27f37bb6feb4cc51396ed07806053b25';
const MAILJET_SECRET_KEY = '374fa65c5094ea6896e86b1caf0971be';
const MAILJET_API_URL = 'https://api.mailjet.com/v3.1/send';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { email } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Prepare the email content
    const emailData = {
      Messages: [
        {
          From: {
            Email: "info@naveedahmed.com",
            Name: "Naveed Ahmed Website"
          },
          To: [
            {
              Email: "info@naveedahmed.com",
              Name: "Naveed Ahmed"
            }
          ],
          Subject: "New Newsletter Subscription",
          TextPart: `
            New newsletter subscription from:
            Email: ${email}
          `,
          HTMLPart: `
            <h3>New Newsletter Subscription</h3>
            <p><strong>Email:</strong> ${email}</p>
          `
        }
      ]
    };

    // Send the email using Mailjet API
    const response = await fetch(MAILJET_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`).toString('base64')}`
      },
      body: JSON.stringify(emailData)
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Mailjet API error:', responseData);
      return NextResponse.json(
        { error: 'Failed to subscribe to newsletter' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
