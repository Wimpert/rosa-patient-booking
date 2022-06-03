<script lang="ts">
	import { availabilitiesStore } from '../stores/availabilities.store';
	import AvailabilityColumn from './availability-column.svelte';

	let open = false;

	$: size = open
		? Array.from($availabilitiesStore.keys()).reduce(
				(acc, key) => Math.max(acc, $availabilitiesStore.get(key).length),
				0
		  )
		: 5;
</script>

<div class="container">
	<div class="calendar">
		{#each [...$availabilitiesStore] as entry}
			<AvailabilityColumn {size} {entry} />
		{/each}
	</div>
	<button class="showMoreButton" on:click={() => (open = true)}>Show More</button>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.calendar {
		display: flex;
		flex-direction: row;
		padding-top: 16px;
	}
	.showMoreButton {
		margin-top: 16px;
		width: 75%;
		padding: 8px;
		border-radius: 4px;
		background-color: transparent;
		color: rgb(148, 81, 197);
		border: none;
	}

	.showMoreButton:hover {
		cursor: pointer;
		color: rgb(148, 0, 211);
		background-color: rgba(149, 81, 197, 0.278);
	}
</style>
