<style>
	.header-container {
		display: flex;
		flex-direction: row;
	}
</style>
<script lang="ts">
	export let firstName: string;
	export let lastName: string;
	export let specialty: string;
	export let profile: string;
</script>

<div class="header-container">
	<div>
		<img alt="HP" src={profile}/>
	</div>
	<div>
		<p>{specialty}</p>
		<h1>{firstName} {lastName}</h1>
		<button>Contact</button>
		<button>Location</button>
	</div>
</div>