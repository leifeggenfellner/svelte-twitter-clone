<script lang="ts">
	import { autoHeight } from 'svelte-textarea-auto-height';

	const checkSubmit = (e: KeyboardEvent) => {
		if (
			e.key === 'Enter' &&
			!e.shiftKey &&
			tweet.trim().length != 0 &&
			tweet.trim().length <= 280
		) {
			(e.target as HTMLFormElement).form.submit();
		}
	};

	let tweet = '';
	let maxCharacters = 280;

	$: charactersLeft = maxCharacters - tweet.length;
</script>

<div class="compose">
	<img src="/profile/leif/avatar.webp" alt="Avatar" />
	<form action="?/home" method="POST" autocomplete="off">
		<textarea
			use:autoHeight
			id="tweet"
			name="tweet"
			placeholder="What's on your mind?"
			bind:value={tweet}
			aria-label="Enter your Tweet"
			on:keydown={checkSubmit}
		/>
		<button
			class="btn"
			class:error={charactersLeft < 0}
			disabled={charactersLeft <= 0}
			type="submit">{charactersLeft > 0 ? 'Tweet' : charactersLeft}</button
		>
	</form>
</div>

<style>
	.compose {
		display: grid;
		grid-template-columns: min-content 1fr;
		gap: var(--spacing-16);
		padding: var(--spacing-16) var(--spacing-24);
		border-bottom: 1px solid var(--color-border-primary);
		max-width: 100%;
	}

	img {
		width: 48px;
		height: 48px;
		border-radius: 50%;
	}

	form {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-16);
	}

	#tweet {
		color: var(--color-text-primary);
		background-color: transparent;
		border: 0;
		border-radius: 0;
		outline: none;
		max-width: 30ch;
		min-width: 30ch;
		overflow-y: auto;
		overflow-wrap: break-word;
		resize: none;
	}

	#tweet:hover {
		cursor: text;
	}

	button {
		min-width: 80px;
		font-size: var(--font-16);
		padding: var(--spacing-16);
		align-self: end;
	}

	.error {
		color: tomato;
	}
</style>
