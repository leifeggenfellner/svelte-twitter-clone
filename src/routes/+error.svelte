<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="error">
	<h1>{$page.status}: {$page?.error?.message} {$page.url.pathname}</h1>
	<img src="/Doge.jpg" alt="Doge" />
</div>

<style>
	.error {
		height: 100vh;
		display: grid;
		gap: var(--spacing-32);
		place-content: center;
		place-items: center;
	}

	img {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		object-fit: cover;
	}
</style>
