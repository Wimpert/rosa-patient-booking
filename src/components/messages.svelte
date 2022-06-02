<script lang="ts">
	export let temporaryMessage: { title: string; content: string };
</script>

<div class="messages-container">
	<p>{temporaryMessage?.title}</p>
	<p>{temporaryMessage?.content}</p>
</div>

<style>
</style>
