<script lang="ts">
	import type { SelectValue } from 'src/types/select-value.type';

	import { createEventDispatcher } from 'svelte';

	export let selectValues: SelectValue<string | number>[] = [];
	export let selected: string | number = '';
	export let disabled: boolean = false;
	export let placeholder: string;

	const dispatch = createEventDispatcher();

	const handleChange = () => {
		dispatch('change', selected);
	};

	$: sortedValues = selectValues.sort((a, b) => a.label.localeCompare(b.label));
</script>

<select
	{disabled}
	bind:value={selected}
	on:change={handleChange}
	class={$$props.class}
	name="cars"
	id="cars"
>
	{#if placeholder}
		<option value={null}>{placeholder}</option>
	{/if}
	{#each sortedValues as selectValue}
		<option value={selectValue.id}>{selectValue.label}</option>
	{/each}
</select>

<style>
	.select {
		padding: 0.5rem;
	}
</style>
