<script context="module">
	const baseUrl = `https://prod-api.rosa.be/api/web-pages/hps`;
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

	export let hpData: HpWebPageDto;
</script>

<Header
	profile={hpData.profilePictureUrl}
	specialty={hpData.specialty.label.en}
	firstName={hpData.firstName}
	lastName={hpData.lastName}
/>
<Messages temporaryMessage={hpData.temporaryMessage} />
<Location sites={hpData.sites} />
