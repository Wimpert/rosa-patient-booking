<script lang="ts">
	import { Availabilities } from '../types/availabilities.type';

	//export let availabilities: Availabilities;

	const availabilities = new Map<Date, Date[]>();
	const appointments: Date[] = [];

	const date = new Date();
	const dates: Date[] = Array(7)
		.fill(new Date(date))
		.map((el, idx) => new Date(el.setDate(el.getDate() - el.getDay() + idx)));

	dates.forEach((date) =>
		availabilities.set(
			date,
			appointments.filter((appt) => appt === date)
		)
	);
</script>

<div class="calendar">
	<table>
		{#each [...availabilities] as [key, value]}
			<tr><td>{key}</td></tr>
			<tr>
				<td>{value}</td>
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
