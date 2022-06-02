<script context="module">
	export const router = false;
	export const hydrate = false;
	const baseUrl = `https://staging-api.rosa.be/api/web-pages/hps`;
	// @ts-ignore
	export async function load({ params }) {
		const { hpKey } = params;
		const hpData = await fetch(`${baseUrl}/${hpKey}`, {
			headers: { 'Accept-Encoding': 'br' }
		}).then((res) => res.json());
		return {
			props: { hpData }
		};
	}
</script>

<script lang="ts">
	import type { HpWebPageDto } from '../../types/hp-web-page.dto';

	import Header from '../../components/header.svelte';
	import Messages from '../../components/messages.svelte';
	import Location from '../../components/location.svelte';
	import AvailabilitesCalendar from '../../components/availabilites-calendar.svelte';
	import { Availabilities } from '../../types/availabilities.type';

	export let hpData: HpWebPageDto;
	export let availabilities: Availabilities;

	let days = 7;
	//for (let i = 0; i < days; i++) {}
</script>

<svelte:head>
	<title>{hpData.key}</title>
	<meta name="description" content="This is the booking page of {hpData.firstName}" />
</svelte:head>

<Header
	profile={hpData.profilePictureUrl}
	specialty={hpData.specialty?.label?.en}
	firstName={hpData.firstName}
	lastName={hpData.lastName}
/>
<Messages temporaryMessage={hpData.temporaryMessage} />
<Location sites={hpData.sites} />

<AvailabilitesCalendar {availabilities} />
