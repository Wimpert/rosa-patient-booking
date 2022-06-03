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
		<h1 class="header-name">{firstName} {lastName}</h1>
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
	.header-name {
		font-size: 1.875rem;
		line-height: 2.5625rem;
		color: #814a58;
		font-family: 'Noto Serif', serif;
		font-style: normal;
		font-weight: 700;
		margin: 0;
		padding: 0;
	}

	button {
		background-color: transparent;
		border: 1px solid #814a58;
		color: #814a58;
		border-radius: 4px;
		text-decoration: none;
		cursor: pointer;
		position: relative;
		padding: 8px;
		box-sizing: border-box;
		text-align: center;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
</style>
