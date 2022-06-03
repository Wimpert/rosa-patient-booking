<script lang="ts">
	import { goto } from '$app/navigation';
	import type { SelectValue } from '../types/select-value.type';
	import type { Calendar, Motive, Site } from '../types/hp-web-page.dto';
	import { addDays, startOfDay, differenceInCalendarDays, isBefore, addMinutes } from 'date-fns';
	import Dropdown from './dropdown.svelte';
	import { availabilitiesStore } from '../stores/availabilities.store';
	import { page } from '$app/stores';
	import { browser } from '$app/env';

	export let motives: Array<Motive> = [];
	export let sites: Array<Site> = [];
	export let calendars: Array<Calendar> = [];

	type Direction = 'next' | 'previous';

	const url = 'https://staging-api.rosa.be/api/availabilities?';

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
	let motiveDuration: number | undefined;

	let from = startOfDay(new Date());
	let to = addDays(from, 7);

	const handleMotiveChange = (e: any) => {
		selectedMotive = e.detail;
		if (browser) {
			$page.url.searchParams.set('motiveId', selectedMotive);
			goto($page.url.toString(), { replaceState: false });
		}
	};

	const handleSiteChange = (e: any) => {
		selectedSite = e.detail;
		if (browser) {
			$page.url.searchParams.set('siteId', selectedSite);
			goto($page.url.toString(), { replaceState: false });
		}
	};

	const navigate = (direction: Direction) => {
		const days = direction === 'next' ? 7 : -7;
		from = addDays(from, days);
		to = addDays(to, days);
	};

	const mapToAvailabilities = (avalabilityRawData: any, motiveDuration: number | undefined) => {
		const result = new Map();

		const daysBetweenFromAndTo = differenceInCalendarDays(to, from);
		for (let i = 0; i < daysBetweenFromAndTo; i++) {
			const day = addDays(from, i);
			result.set(day.toString(), []);
		}

		if (avalabilityRawData?.length > 0 && motiveDuration) {
			for (let j = 0; j < avalabilityRawData.length; j++) {
				const entry = avalabilityRawData[j];
				const key = startOfDay(new Date(entry.startAt));
				let timeStamp = new Date(entry.startAt);
				let endDate = new Date(entry.endAt);
				while (isBefore(timeStamp, endDate)) {
					result.set(key.toString(), [...result.get(key.toString()), timeStamp]);
					timeStamp = addMinutes(timeStamp, motiveDuration);
				}
			}

			return result;
		}
		return result;
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
		const url = buildUrl(from, to, selectedMotive, patientType, selectedCalendar);
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				avalabilityRawData = data;
			});
	} else {
		avalabilityRawData = [];
	}

	$: availabilitiesStore.set(mapToAvailabilities(avalabilityRawData, motiveDuration));

	$: if (browser) {
		$page.url.searchParams.set('patientType', `${patientType}`);
		goto($page.url.toString(), { replaceState: false });
	}

	$: motiveDuration = 15;

	$: $page.url.searchParams.get('motiveId') !== null
		? (selectedMotive = $page.url.searchParams.get('motiveId') as string)
		: null;

	$: $page.url.searchParams.get('siteId') !== null
		? (selectedSite = $page.url.searchParams.get('siteId') as string)
		: null;
	$: $page.url.searchParams.get('patientType') !== null
		? (patientType = Number($page.url.searchParams.get('patientType')) as 1 | 2)
		: null;
</script>

<p>Is this your first time visit?</p>
<label>
	<input type="radio" group={patientType} checked={patientType === 1} name="scoops" value={1} />
	Yes
</label>

<label>
	<input type="radio" group={patientType} checked={patientType === 2} name="scoops" value={2} />
	No
</label>
<div class="dropdowns-container">
	<div class="dropdown-container">
		<p>What is the reason for your visit?</p>
		<Dropdown
			placeholder="Select you reason of visit"
			on:change={handleMotiveChange}
			selectValues={motiveSelectValues}
			selected={selectedMotive}
		/>
	</div>
	<div class="dropdown-container">
		<p>Where do you want your visit?</p>
		<Dropdown
			placeholder="Select your place of visit"
			on:change={handleSiteChange}
			selectValues={siteSelectValues}
			selected={selectedSite}
		/>
	</div>
</div>
<button on:click={() => navigate('previous')}>Previous</button>
<button on:click={() => navigate('next')}>Next</button>

<style>
	.dropdowns-container {
		display: flex;
		flex-direction: column;
	}
</style>
