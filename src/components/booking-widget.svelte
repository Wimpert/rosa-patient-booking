<script lang="ts">
	import type { SelectValue } from '../types/select-value.type';
	import type { Calendar, Motive, Site } from '../types/hp-web-page.dto';
	import { addDays, startOfDay } from 'date-fns';
	import Dropdown from './dropdown.svelte';

	export let motives: Array<Motive> = [];
	export let sites: Array<Site> = [];
	export let calendars: Array<Calendar> = [];

	const url = 'https://staging-api.rosa.be/api/availabilities?';
	//from=2022-06-12T22:00:00.000Z
	//to=2022-06-11T21:59:59.999Z
	//motive_id=611cf5461a64ce00134a3d9f
	//is_new_patient=true
	//calendar_ids=61d4339aa58de20020e5e611
	//state=open'

	const buildUrl = (
		from: Date,
		to: Date,
		motive_id: string,
		isNewPatient: 1 | 2,
		calendarIds: string
	): string => {
		const params = new URLSearchParams();
		params.append('from', from.toISOString());
		params.append('to', to.toISOString());
		params.append('motive_id', motive_id);
		params.append('is_new_patient', isNewPatient === 1 ? 'true' : 'false');
		params.append('calendar_ids', calendarIds);
		params.append('state', 'open');
		return url + params.toString();
	};

	let patientType: 1 | 2 = 1;
	let motiveSelectValues: Array<SelectValue<string>>;
	let siteSelectValues: Array<SelectValue<string>>;

	let avalabilityRawData: any;
	let selectedMotive: string;
	let selectedSite: string;
	let selectedCalendar: string | null | undefined;

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

	$: selectedCalendar = selectedSite
		? calendars.find((calendar) => calendar.siteId === selectedSite)?.id
		: null;

	$: if (selectedMotive && selectedCalendar) {
		const from = startOfDay(new Date());
		const to = addDays(from, 7);

		const url = buildUrl(from, to, selectedMotive, patientType, selectedCalendar);
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				avalabilityRawData = data;
			});
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
