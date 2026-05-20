// src/routes/+page.server.js
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '$env/static/private';
import { fail } from '@sveltejs/kit';

const sql = neon(DATABASE_URL);

// SvelteKit calls this function whenever the page is requested.
export async function load() {
  const rows = await sql`
    SELECT id, date::text AS date, description, debit, credit, amount
    FROM transactions
    ORDER BY date ASC
  `;

  return { transactions: rows };
}

// Handles data mutations sent from the frontend form via POST requests
export const actions = {
  default: async ({ request }) => {
    // 1. Get the form data the browser sent.
    const formData = await request.formData();
    const date        = formData.get('date');
    const description = formData.get('description');
    const debit       = formData.get('debit');
    const credit      = formData.get('credit');
    const amount      = formData.get('amount');

    // Quick backend validation sanity check
    if (!date || !amount || !description || !debit || !credit) {
      return fail(400, { error: 'All fields are required.' });
    }

    try {
      // 2. Run the secure INSERT query using the Neon driver
      await sql`
        INSERT INTO transactions (date, description, debit, credit, amount)
        VALUES (${date}, ${description}, ${debit}, ${credit}, ${amount})
      `;

      // 3. Return success. SvelteKit automatically re-runs load()
      return { success: true };
    } catch (err) {
      console.error('Database insertion error:', err);
      return fail(500, { error: 'Failed to save transaction to database.' });
    }
  }
};