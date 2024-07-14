<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;

	$: ({ uniqueVisitors } = data);

	let timeRange = "last-week";

	function handleDateRangeChange(event: { currentTarget: { value: string; }; }) {
		const url = new URL($page.url);
		url.searchParams.set('date-range', event.currentTarget.value);
		goto(url.href, { replaceState: true });
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<main class="flex flex-col bg-gray-50">
	<div class="flex flex-col gap-4 px-10 py-4 bg-white border rounded-lg">
		<select bind:value={timeRange} on:change={handleDateRangeChange}>
			<option value="last-week">Last week</option>
			<option value="last-2-weeks">Last two weeks</option>
			<option value="last-month">Last month</option>
			<option value="last-quarter">Last quarter</option>
			<option value="last-year">Last year</option>
		</select>
		
		{#if uniqueVisitors}
			{#each uniqueVisitors as data}
				<div>
					{data.country} - {data.hours.map(hour => `${hour.hour}: ${hour.unique}`).join(', ')}
				</div>
			{/each}
		{/if}
		
	</div>
</main>
