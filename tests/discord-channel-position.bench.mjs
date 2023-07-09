// Ref: https://github.com/discordjs/discord.js/pull/9497

import * as ImplNewAlmeidx from '#lib/discord-channel-position/new-almeidx';
import * as ImplNewJaw0r3k from '#lib/discord-channel-position/new-jaw0r3k';
import * as ImplNewKyranetA from '#lib/discord-channel-position/new-kyranet-a';
import * as ImplNewKyranetB from '#lib/discord-channel-position/new-kyranet-b';
import * as ImplNewVlad from '#lib/discord-channel-position/new-vlad';
import * as ImplOld from '#lib/discord-channel-position/old';
import { bench, describe } from 'vitest';
import { channels } from './shared/channel-data.mjs';

describe('discord-channel-position', () => {
	const OldGuild = new ImplOld.Guild({ channels });
	const NewKyranetAGuild = new ImplNewKyranetA.Guild({ channels });
	const NewKyranetBGuild = new ImplNewKyranetB.Guild({ channels });
	const NewJaw0r3kGuild = new ImplNewJaw0r3k.Guild({ channels });
	const NewAlmeidxGuild = new ImplNewAlmeidx.Guild({ channels });
	const NewVladGuild = new ImplNewVlad.Guild({ channels });

	bench('old', () => {
		for (const channel of OldGuild.channels.values()) channel.position;
	});

	bench('new-kyranet-a', () => {
		for (const channel of NewKyranetAGuild.channels.values()) channel.position;
	});

	bench('new-kyranet-b', () => {
		for (const channel of NewKyranetBGuild.channels.values()) channel.position;
	});

	bench('new-jaw0r3k', () => {
		for (const channel of NewJaw0r3kGuild.channels.values()) channel.position;
	});

	bench('new-almeidx', () => {
		for (const channel of NewAlmeidxGuild.channels.values()) channel.position;
	});

	bench('new-vlad', () => {
		for (const channel of NewVladGuild.channels.values()) channel.position;
	});
});
