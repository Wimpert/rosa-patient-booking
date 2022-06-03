<script lang="ts">
	import AvailabilityDate from './availability-date.svelte';
	export let entry: [string, Array<Date>] = ['', []];
	export let size: number;
</script>

<div class="availability-col">
	<AvailabilityDate class="availability-col__day" timeStamp={new Date(entry[0])} />
	{#each Array(size) as _, i}
		<AvailabilityDate
			class="availability-col__time"
			formatToApply="HH:mm"
			timeStamp={entry[1][i]}
		/>
	{/each}
</div>

<style global>
	.availability-col {
		display: flex;
		flex-direction: column;
		width: 80px;
	}

	.availability-col__day,
	.availability-col__time {
		text-align: center;
	}

	.availability-col__day {
		color: grey;
		font-size: 1.2rem;
		margin-bottom: 4px;
	}
	.availability-col__time {
		margin: 2px;
		background-color: rgba(148, 0, 211, 0.288);
		padding: 4px;
		border-radius: 4px;
	}

	.availability-col__time:hover {
		cursor: pointer;
		background-color: rgba(148, 0, 211, 0.4);
	}
</style>
