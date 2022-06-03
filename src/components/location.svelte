<script lang="ts">
	import type { Site } from 'src/types/site.type';

	export let sites: Site[];
	let siteIndex = 0;
</script>

<div class="location-container">
	<div>
		<button class="location-button" on:click={() => siteIndex--}>Previous</button>
		Location : {siteIndex + 1} / {sites.length}
		<button class="location-button" on:click={() => siteIndex++}>Next</button>
	</div>
	<p>Location and buisness hours</p>
	<div>{sites[siteIndex]?.name}</div>
</div>

<style>
	.location-container {
		margin-top: 16px;
		padding: 24px 40px;
		border-radius: 20px;
		background: #fefcfa;
	}
	.location-button {
		background-color: rgba(140, 82, 184, 0.43);
		color: whitesmoke;
		border: 1px solid rgba(140, 82, 184, 0.7);
		margin-right: 4px;
	}
	.location-button:last-child {
		margin-left: 8px;
	}
</style>
