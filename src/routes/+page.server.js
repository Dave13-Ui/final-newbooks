// src/routes/+page.server.js
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '$env/static/private';
import { fail } from '@sveltejs/kit';

const sql = neon(DATABASE_URL);

export async function load() {
  const rows = await sql`
    SELECT id, date::text AS date, description, debit, credit, amount
    FROM transactions
    ORDER BY date ASC
  `;
  return { transactions: rows };
}

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    
    const date = data.get('date');
    const amount = data.get('amount');
    const description = data.get('description');
    const debit = data.get('debit');
    const credit = data.get('credit');

    if (!date || !amount || !description || !debit || !credit) {
      return fail(400, { error: 'Missing fields' });
    }

    try {
      // NOTE: Ensure your DB column names perfectly match these downcase values
      await sql`
        INSERT INTO transactions (date, amount, description, debit, credit)
        VALUES (${date}, ${parseFloat(amount)}, ${description}, ${debit}, ${credit})
      `;

      return { success: true };
    } catch (err) {
      // Look closely at your terminal console output if this block executes!
      console.error('Database Error:', err);
      return fail(500, { error: 'Database write failed.' });
    }
  }
};