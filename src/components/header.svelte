<script lang="ts">
	export let firstName: string;
	export let lastName: string;
	export let specialty: string;
	export let profile: string;
</script>

<div class="header-container">
	<img alt="HP" class="avatar" src={profile} />
	<div>
		{#if specialty} <p>{specialty}</p> {/if}
		<h1>{firstName} {lastName}</h1>
		<button>Contact</button>
		<button>Location</button>
	</div>
</div>

<style>
	.header-container {
		display: flex;
		flex-direction: row;
	}
	.avatar {
		float: left;
		margin-right: 8px;
		margin-bottom: 16px;
		width: 80px;
		height: 80px;
		border-radius: 100%;
	}
</style>
