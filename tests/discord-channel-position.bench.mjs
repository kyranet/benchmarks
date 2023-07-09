// Ref: https://github.com/discordjs/discord.js/pull/9497

import * as ImplNewAlmeidx from '#lib/discord-channel-position/new-almeidx';
import * as ImplNewJaw0r3k from '#lib/discord-channel-position/new-jaw0r3k';
import * as ImplNewKyranet from '#lib/discord-channel-position/new-kyranet';
import * as ImplOld from '#lib/discord-channel-position/old';
import { bench, describe } from 'vitest';
import { channels } from './shared/channel-data.mjs';

describe('discord-channel-position', () => {
	const OldGuild = new ImplOld.Guild({ channels });
	const NewKyranetGuild = new ImplNewKyranet.Guild({ channels });
	const NewJaw0r3kGuild = new ImplNewJaw0r3k.Guild({ channels });
	const NewAlmeidxGuild = new ImplNewAlmeidx.Guild({ channels });

	bench('old', () => {
		for (const channel of OldGuild.channels.values()) channel.position;
	});

	bench('new-kyranet', () => {
		for (const channel of NewKyranetGuild.channels.values()) channel.position;
	});

	bench('new-jaw0r3k', () => {
		for (const channel of NewJaw0r3kGuild.channels.values()) channel.position;
	});

	bench('new-almeidx', () => {
		for (const channel of NewAlmeidxGuild.channels.values()) channel.position;
	});
});
