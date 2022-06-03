<script lang="ts">
	import { availabilitiesStore } from '../stores/availabilities.store';
	import Availability from './availability-date.svelte';

	$: console.log($availabilitiesStore);
</script>

<div class="calendar">
	<table>
		{#each [...$availabilitiesStore] as [key, value]}
			<tr><td> <Availability timeStamp={new Date(key)} /></td></tr>
			<tr>
				{#each $availabilitiesStore.get(key) as timeStamp}
					<td>
						<Availability formatToApply="HH:mm" {timeStamp} />
					</td>
				{/each}
			</tr>
		{/each}
	</table>
</div>

<style>
	.calendar {
		border-top: 1px solid #efeceb;
		padding-bottom: 24px;
		width: 100%;
		font-size: 12px;
		background: #fff;
		display: flex;
		flex-direction: column;
		position: relative;
		margin-top: 16px;
		box-sizing: border-box;
	}
</style>
