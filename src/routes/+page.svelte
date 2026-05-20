<script>
  // We'll add JavaScript here in Unit 2.
</script>

<div class="max-w-5xl mx-auto p-6 space-y-8">

  <!-- HEADER -->
  <header class="border-b border-slate-200 pb-4">
    <h1 class="text-3xl font-bold text-slate-800">📒 Final New Books</h1>
    <p class="text-slate-500 text-sm mt-1">Track transactions. See your income statement live.</p>
  </header>

  <!-- NEW TRANSACTION FORM -->
  <section class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
    <h2 class="text-xl font-bold text-slate-800 mb-4">New Transaction</h2>

    <form method="POST" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="date" class="block text-sm font-medium text-slate-700 mb-1">Date</label>
        <input id="date" name="date" type="date" required
               class="border border-slate-300 rounded px-3 py-2 w-full" />
      </div>

      <div>
        <label for="amount" class="block text-sm font-medium text-slate-700 mb-1">Amount</label>
        <input id="amount" name="amount" type="number" step="0.01" placeholder="0.00" required
               class="border border-slate-300 rounded px-3 py-2 w-full" />
      </div>

      <div class="md:col-span-2">
        <label for="description" class="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <input id="description" name="description" type="text" placeholder="e.g. Office rent for July" required
               class="border border-slate-300 rounded px-3 py-2 w-full" />
      </div>

      <div>
        <label for="debit" class="block text-sm font-medium text-slate-700 mb-1">Debit Account</label>
        <select id="debit" name="debit" required class="border border-slate-300 rounded px-3 py-2 w-full">
          <option value="">-- Select --</option>
          <option>Cash</option>
          <option>Accounts Receivable</option>
          <option>Revenue</option>
          <option>Rent Expense</option>
          <option>Utilities Expense</option>
          <option>Owner's Equity</option>
        </select>
      </div>

      <div>
        <label for="credit" class="block text-sm font-medium text-slate-700 mb-1">Credit Account</label>
        <select id="credit" name="credit" required class="border border-slate-300 rounded px-3 py-2 w-full">
          <option value="">-- Select --</option>
          <option>Cash</option>
          <option>Accounts Receivable</option>
          <option>Revenue</option>
          <option>Rent Expense</option>
          <option>Utilities Expense</option>
          <option>Owner's Equity</option>
        </select>
      </div>

      <div class="md:col-span-2">
        <button type="submit"
                class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded font-medium">
          Save Transaction
        </button>
      </div>
    </form>
  </section>

  <!-- INCOME STATEMENT -->
  <section class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
    <h2 class="text-xl font-bold text-slate-800 mb-4">Income Statement</h2>

    <div class="space-y-2">
      <div class="flex justify-between text-emerald-700 font-medium">
        <span>Total Revenue</span>
        <span>$0.00</span>
      </div>
      <div class="flex justify-between text-rose-700 font-medium">
        <span>Total Expenses</span>
        <span>$0.00</span>
      </div>
      <div class="flex justify-between border-t border-slate-300 pt-2 text-lg font-bold">
        <span>Net Income</span>
        <span>$0.00</span>
      </div>
    </div>
  </section>

  <!-- TRANSACTIONS LIST -->
  <section class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
    <h2 class="text-xl font-bold text-slate-800 mb-4">Recent Transactions</h2>

    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-slate-100 text-slate-600 uppercase text-xs">
          <tr>
            <th class="text-left px-3 py-2">Date</th>
            <th class="text-left px-3 py-2">Description</th>
            <th class="text-left px-3 py-2">Debit</th>
            <th class="text-left px-3 py-2">Credit</th>
            <th class="text-right px-3 py-2">Amount</th>
            <th class="text-left px-3 py-2">Type</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-t border-slate-200">
            <td colspan="6" class="px-3 py-6 text-center text-slate-400 italic">
              No transactions yet. Add one using the form above.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

</div>