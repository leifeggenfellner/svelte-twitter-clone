<script lang="ts">
	import Compose from '$components/compose.svelte';
	import Tweet from '$components/tweet.svelte';
	import type { ActionData } from './$types';
	import type { PageData } from './$types';
	import type { TweetType } from '$types';

	export let data: PageData;
	const tweets: TweetType[] = data.body?.tweets || [];
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>Home</h1>

<Compose />

{#each tweets as tweet}
	<Tweet {tweet} />
{/each}

<style>
	h1 {
		position: sticky;
		top: 0;
		padding: var(--spacing-8) var(--spacing-24);
		font-size: var(--font-24);
		backdrop-filter: blur(100px);
	}
</style>
