<script context="module">
	const baseUrl = `https://staging-api.rosa.be/api/web-pages/hps`;
	// @ts-ignore
	export async function load({ params }) {
		const { hpKey } = params;
		const hpData = await fetch(`${baseUrl}/${hpKey}`).then((res) => res.json());
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
	import BookingWidget from '../../components/booking-widget.svelte';

	export let hpData: HpWebPageDto;
</script>

<svelte:head>
	<title>{hpData.key}</title>
	<meta name="description" content="This is the booking page of {hpData.firstName}" />
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/>
</svelte:head>

<Header
	profile={hpData.profilePictureUrl}
	specialty={hpData.specialty?.label?.en}
	firstName={hpData.firstName}
	lastName={hpData.lastName}
/>
<Messages temporaryMessage={hpData.temporaryMessage} />
<Location sites={hpData.sites} />
<BookingWidget motives={hpData?.motives} sites={hpData?.sites} />
