<script lang="ts">
	import { format } from 'date-fns';
	export let timeStamp: Date;
	export let formatToApply: string = 'dd/MM';
	$: value = timeStamp ? format(new Date(timeStamp), formatToApply) : '-';
</script>

<div>
	{value}
</div>
