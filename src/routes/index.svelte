<script context="module">
	export const router = false;
</script>

<script lang="ts">
	import type { SearchResult } from 'src/types/search-result.type';

	let hpName: string;

	//https://prod-api.rosa.be/api/hps/new-search?q=antoi

	let results: Array<SearchResult> = [];

	const searchHps = async (hpName: string) => {
		if (hpName) {
			const url = `https://prod-api.rosa.be/api/hps/new-search?q=${hpName}`;
			await fetch(url)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					results = data.elements;
				});
		} else {
			results = [];
		}
	};

	$: searchHps(hpName);
</script>

<h1>Search your hp:</h1>
<input bind:value={hpName} />

<ul>
	{#each results as result}
		<li>
			<a sveltekit:prefetch href="hps/{result.key}">{result.firstName} {result.lastName}</a>
		</li>
	{/each}
</ul>
