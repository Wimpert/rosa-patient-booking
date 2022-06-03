<script lang="ts">
	import { availabilitiesStore } from '../stores/availabilities.store';
	import AvailabilityColumn from './availability-column.svelte';

	let open = false;

	let noAvailabilities = false;

	$: size = open
		? Array.from($availabilitiesStore.keys()).reduce(
				(acc, key) => Math.max(acc, $availabilitiesStore.get(key).length),
				0
		  )
		: 5;
	$: noAvailabilities =
		Array.from($availabilitiesStore.keys()).reduce(
			(acc, key) => Math.max(acc, $availabilitiesStore.get(key).length),
			0
		) === 0;
</script>

<div class="container">
	<div class="calendar">
		{#each [...$availabilitiesStore] as entry}
			<AvailabilityColumn {size} {entry} />
		{/each}
	</div>
	<button class="showMoreButton" on:click={() => (open = true)}>Show More</button>

	{#if noAvailabilities}
		<div class="no-availabilites">
			<div>No availabilities found.</div>
		</div>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.no-availabilites {
		position: absolute;
		background: rgba(255, 255, 255, 0.7);
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
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
