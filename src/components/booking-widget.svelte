<script lang="ts">
	import type { SelectValue } from '../types/select-value.type';
	import type { Motive, Site } from '../types/hp-web-page.dto';
	import Dropdown from './dropdown.svelte';

	export let motives: Array<Motive> = [];
	export let sites: Array<Site> = [];

	let patientType = 1;
	let motiveSelectValues: Array<SelectValue<string>>;
	let siteSelectValues: Array<SelectValue<string>>;

	let avalabilityRawData: any;
	let selectedMotive: string;
	let selectedSite: string;

	const handleMotiveChange = (e: any) => {
		selectedMotive = e.detail;
	};

	const handleSiteChange = (e: any) => {
		selectedSite = e.detail;
	};

	$: motiveSelectValues = motives.map((motive) => ({
		id: motive.id,
		label: motive.label
	}));

	$: siteSelectValues = sites.map((site) => ({
		id: site.id,
		label: site.name
	}));

	$: if (selectedMotive && selectedSite) {
		console.log(selectedMotive, selectedSite);
	} else {
		avalabilityRawData = [];
	}
</script>

<p>Is this your first time visit?</p>
<label>
	<input type="radio" group={patientType} name="scoops" value={1} />
	Yes
</label>

<label>
	<input type="radio" group={patientType} name="scoops" value={2} />
	No
</label>
{selectedMotive}
<p>What is the reason for your visit?</p>
<Dropdown
	placeholder="Select you reason of visit"
	on:change={handleMotiveChange}
	selectValues={motiveSelectValues}
/>

<p>Where do you want your visit?</p>
<Dropdown
	placeholder="Select your place of visit"
	on:change={handleSiteChange}
	selectValues={siteSelectValues}
/>
