<script lang="ts">
	export let temporaryMessage: { title: string; content: string };
</script>

<div class="messages-container">
	<p>{temporaryMessage?.title}</p>
	<p>{temporaryMessage?.content}</p>
</div>

<style>
	.messages-container {
		background: #fefcfa;
		padding: 16px 20px;
		border-radius: 4px 0 0 4px;
		border-left: 4px solid #4696ec;
	}
</style>
