<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	export let form;

	let formIsSubmitting = false;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<main class="flex flex-col items-center justify-center w-screen h-screen bg-gray-50">
	<div class="flex flex-col gap-4 px-10 py-4 bg-white border rounded-lg">
		{#if formIsSubmitting}
			<p>Submitting...</p>
		{:else if form?.error}
			<div class="text-red-500 ">
				<p>{form?.error}</p>
			</div>
		{:else if form?.message}
			<p>{form.message}</p>
		{/if}

		<form
			action="/"
			method="POST"
			class="flex flex-col gap-4 text-sm"
			use:enhance={() => {
				formIsSubmitting = true;

				return async ({ result }) => {
					formIsSubmitting = false;
					await applyAction(result);
				};
			}}
		>
			<input
				type="name"
				name="name"
				placeholder="Enter your name"
				class="px-4 py-1 border rounded-lg w-80"
				disabled={formIsSubmitting}
			/>

			{#if form?.errors?.name}
				<small class="text-xs text-red-500">{form?.errors?.name[0]}</small>
			{/if}
			<button
				type="submit"
				disabled={formIsSubmitting}
				class="px-4 py-2 text-white rounded-lg bg-slate-800">Submit</button
			>
		</form>
	</div>
</main>
