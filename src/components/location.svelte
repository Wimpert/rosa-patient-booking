<script lang="ts">
	export let sites: any[] = [];
</script>

<div>
	<p>Location and buisness hours</p>
	<div class="location-container">{sites[0]?.name}</div>
</div>

<style>
	.location-container {
		padding: 24px 40px;
		background: #fefcfa;
	}
</style>
