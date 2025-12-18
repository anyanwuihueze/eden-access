'use server';
/**
 * @fileOverview Generates a unique access code for a guest.
 *
 * - generateGuestAccessCode - A function that handles the generation of the guest access code.
 * - GenerateGuestAccessCodeInput - The input type for the generateGuestAccessCode function.
 * - GenerateGuestAccessCodeOutput - The return type for the generateGuestAccessCode function.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateGuestAccessCodeInputSchema = z.object({
  guestName: z.string().describe('The name of the guest.'),
  guestPhoneNumber: z.string().describe('The phone number of the guest.'),
});

export type GenerateGuestAccessCodeInput = z.infer<typeof GenerateGuestAccessCodeInputSchema>;

const GenerateGuestAccessCodeOutputSchema = z.object({
  accessCode: z.string().describe('The unique access code for the guest.'),
  accessLink: z.string().describe('The link for the guest to access the property.'),
});

export type GenerateGuestAccessCodeOutput = z.infer<typeof GenerateGuestAccessCodeOutputSchema>;

export async function generateGuestAccessCode(
  input: GenerateGuestAccessCodeInput
): Promise<GenerateGuestAccessCodeOutput> {
  // Generate a random 6-digit code
  const accessCode = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Use environment variable for the base URL, with a fallback for local dev
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';
  const accessLink = `${baseUrl}/guest/${accessCode}`;
  
  return {
    accessCode,
    accessLink,
  };
}

// Keep these for backwards compatibility but they're no longer used
const prompt = ai.definePrompt({
  name: 'generateGuestAccessCodePrompt',
  input: {
    schema: GenerateGuestAccessCodeInputSchema,
  },
  output: {
    schema: GenerateGuestAccessCodeOutputSchema,
  },
  prompt: `You are a concierge AI that is an expert in generating guest access codes for a luxury estate.
  Generate a unique access code and link for the provided guest information. The access code should be a random 6 digit number.
  The access link should include the access code in URL format.
  Guest Name: {{{guestName}}}
  Guest Phone Number: {{{guestPhoneNumber}}}`,
});

const generateGuestAccessCodeFlow = ai.defineFlow(
  {
    name: 'generateGuestAccessCodeFlow',
    inputSchema: GenerateGuestAccessCodeInputSchema,
    outputSchema: GenerateGuestAccessCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
