<script>
	import { enhance } from '$app/forms';

	// 1. Destructure data out of $props normally
	let { data } = $props();

	function classify(t) {
		if (t.credit === 'Revenue') {
			return 'Revenue';
		} else if (t.debit.includes('Expense')) {
			return 'Expense';
		} else {
			return 'Other';
		}
	}

	// 2. Derive totals directly from data.transactions so they track properly
	let totalRevenue = $derived(
		data.transactions
			.filter((t) => classify(t) === 'Revenue')
			.reduce((sum, t) => sum + Number(t.amount), 0)
	);

	let totalExpenses = $derived(
		data.transactions
			.filter((t) => classify(t) === 'Expense')
			.reduce((sum, t) => sum + Number(t.amount), 0)
	);

	let netIncome = $derived(totalRevenue - totalExpenses);
</script>

<div class="mx-auto max-w-5xl space-y-8 p-6">
	<!-- NEW TRANSACTION FORM -->
	<section class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
		<h2 class="mb-4 text-xl font-bold text-slate-800">New Transaction</h2>

		<!-- use:enhance handles asynchronous submission and UI refresh perfectly -->
		<form method="POST" use:enhance class="grid grid-cols-1 gap-4 md:grid-cols-2">
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
				<span>${totalRevenue.toFixed(2)}</span>
			</div>
			<div class="flex justify-between font-medium text-rose-700">
				<span>Total Expenses</span>
				<span>${totalExpenses.toFixed(2)}</span>
			</div>
			<div class="flex justify-between border-t border-slate-300 pt-2 text-lg font-bold">
				<span>Net Income</span>
				<span class={netIncome >= 0 ? 'text-emerald-700' : 'text-rose-700'}>
					${netIncome.toFixed(2)}
				</span>
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
					<!-- 3. Loop over data.transactions directly -->
					{#each data.transactions as t (t.id)}
						<tr class="border-t border-slate-200 hover:bg-slate-50">
							<td class="px-3 py-2">{t.date}</td>
							<td class="px-3 py-2">{t.description}</td>
							<td class="px-3 py-2">{t.debit}</td>
							<td class="px-3 py-2">{t.credit}</td>
							<td class="px-3 py-2 text-right">${Number(t.amount).toFixed(2)}</td>
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
