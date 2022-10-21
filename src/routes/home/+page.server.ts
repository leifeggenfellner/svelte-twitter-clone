import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { timePosted } from '$lib/date';
import type { Actions } from './$types';
import { invalid } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const data = await prisma.tweet.findMany({
		include: { user: true },
		orderBy: { posted: 'desc' }
	});

	const liked = await prisma.liked.findMany({
		where: { userId: 1 },
		select: { tweetId: true }
	});

	const likedTweets = Object.keys(liked).map((key) => liked[key].tweetId);

	const tweets = data.map((tweet) => {
		return {
			id: tweet.id,
			content: tweet.content,
			likes: tweet.likes,
			posted: timePosted(tweet.posted),
			url: tweet.url,
			avatar: tweet.user.avatar,
			handle: tweet.user.handle,
			name: tweet.user.name,
			liked: likedTweets.includes(tweet.id)
		};
	});

	if (!tweets) {
		return { status: 400 };
	}

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { tweets: tweets }
	};
};

export const actions: Actions = {
	home: async ({ request }) => {
		const data = await request.formData();
		const tweet = String(data.get('tweet'));

		if (tweet.length > 280) {
			return invalid(400, { tweet, tooLong: true });
		} else if (tweet.length === 0) {
			return invalid(400, { tweet, missing: true });
		}

		await prisma.tweet.create({
			data: {
				posted: new Date(),
				url: Math.random().toString(16).slice(2),
				content: tweet,
				likes: 0,
				user: { connect: { id: 1 } }
			}
		});

		return {
			status: 200,
			body: 'Tweet posted!',
			headers: { location: '/home' }
		};
	},
	deleteTweet: async ({ request }) => {
		const data = await request.formData();
		const tweetId = +data.get('id');

		await prisma.tweet.delete({ where: { id: tweetId } });

		throw redirect(303, '/home');
	}
};
