<script>
	// An array of transaction objects.
	// Square brackets. Each item is a full object. Commas between items.
	// Each transaction has a unique id so Svelte can track it efficiently in the list.
	let transactions = $state([
		{
			id: 1,
			date: '2026-04-01',
			description: 'Opening cash deposit',
			debit: 'Cash',
			credit: "Owner's Equity",
			amount: 5000
		},
		{
			id: 2,
			date: '2026-04-03',
			description: 'Consulting fee from client',
			debit: 'Cash',
			credit: 'Revenue',
			amount: 1200
		},
		{
			id: 3,
			date: '2026-04-05',
			description: 'April rent',
			debit: 'Rent Expense',
			credit: 'Cash',
			amount: 800
		}
	]);

	// Add this INSIDE the <script> block, below the transactions array.
	function classify(t) {
		if (t.credit === 'Revenue') {
			return 'Revenue';
		} else if (t.debit.includes('Expense')) {
			return 'Expense';
		} else {
			return 'Other';
		}
	}
</script>

<div class="mx-auto max-w-5xl space-y-8 p-6">
	<!-- HEADER -->
	<header class="border-b border-slate-200 pb-4">
		<h1 class="text-3xl font-bold text-slate-800">📒 Final New Books</h1>
		<p class="mt-1 text-sm text-slate-500">Track transactions. See your income statement live.</p>
	</header>

	<!-- NEW TRANSACTION FORM -->
	<section class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
		<h2 class="mb-4 text-xl font-bold text-slate-800">New Transaction</h2>

		<form method="POST" class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<label for="date" class="mb-1 block text-sm font-medium text-slate-700">Date</label>
				<input
					id="date"
					name="date"
					type="date"
					required
					class="w-full rounded border border-slate-300 px-3 py-2"
				/>
			</div>

			<div>
				<label for="amount" class="mb-1 block text-sm font-medium text-slate-700">Amount</label>
				<input
					id="amount"
					name="amount"
					type="number"
					step="0.01"
					placeholder="0.00"
					required
					class="w-full rounded border border-slate-300 px-3 py-2"
				/>
			</div>

			<div class="md:col-span-2">
				<label for="description" class="mb-1 block text-sm font-medium text-slate-700"
					>Description</label
				>
				<input
					id="description"
					name="description"
					type="text"
					placeholder="e.g. Office rent for July"
					required
					class="w-full rounded border border-slate-300 px-3 py-2"
				/>
			</div>

			<div>
				<label for="debit" class="mb-1 block text-sm font-medium text-slate-700"
					>Debit Account</label
				>
				<select
					id="debit"
					name="debit"
					required
					class="w-full rounded border border-slate-300 px-3 py-2"
				>
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
				<label for="credit" class="mb-1 block text-sm font-medium text-slate-700"
					>Credit Account</label
				>
				<select
					id="credit"
					name="credit"
					required
					class="w-full rounded border border-slate-300 px-3 py-2"
				>
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
				<button
					type="submit"
					class="rounded bg-emerald-600 px-6 py-2 font-medium text-white hover:bg-emerald-700"
				>
					Save Transaction
				</button>
			</div>
		</form>
	</section>

	<!-- INCOME STATEMENT -->
	<section class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
		<h2 class="mb-4 text-xl font-bold text-slate-800">Income Statement</h2>

		<div class="space-y-2">
			<div class="flex justify-between font-medium text-emerald-700">
				<span>Total Revenue</span>
				<span>$0.00</span>
			</div>
			<div class="flex justify-between font-medium text-rose-700">
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
	<section class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
		<h2 class="mb-4 text-xl font-bold text-slate-800">Recent Transactions</h2>

		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead class="bg-slate-100 text-xs text-slate-600 uppercase">
					<tr>
						<th class="px-3 py-2 text-left">Date</th>
						<th class="px-3 py-2 text-left">Description</th>
						<th class="px-3 py-2 text-left">Debit</th>
						<th class="px-3 py-2 text-left">Credit</th>
						<th class="px-3 py-2 text-right">Amount</th>
						<th class="px-3 py-2 text-left">Type</th>
					</tr>
				</thead>
				<tbody>
					{#each transactions as t (t.id)}
						<tr class="border-t border-slate-200 hover:bg-slate-50">
							<td class="px-3 py-2">{t.date}</td>
							<td class="px-3 py-2">{t.description}</td>
							<td class="px-3 py-2">{t.debit}</td>
							<td class="px-3 py-2">{t.credit}</td>
							<td class="px-3 py-2 text-right">${t.amount.toFixed(2)}</td>
							<td class="px-3 py-2">
								{#if classify(t) === 'Revenue'}
									<span class="font-medium text-emerald-700">Revenue</span>
								{:else if classify(t) === 'Expense'}
									<span class="font-medium text-rose-700">Expense</span>
								{:else}
									<span class="text-slate-400">Other</span>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</div>
