import { ChannelType } from 'discord-api-types/v10';
import { BaseGuild } from './shared/BaseGuild.mjs';
import { BaseGuildChannel } from './shared/BaseGuildChannel.mjs';
import { discordSort } from './shared/Util.mjs';

export class Guild extends BaseGuild {
	/**
	 * @param {import('./shared/types.d.ts').PartialGuildChannelData} data
	 * @returns {GuildChannel}
	 */
	addChannel(data) {
		const channel = new GuildChannel(data, this);
		this.channels.set(channel.id, channel);
		return channel;
	}

	/**
	 * @param {GuildChannel} channel
	 */
	_sortedChannels(channel) {
		const category = channel.type === ChannelType.GuildCategory;
		const channelTypes = [ChannelType.GuildText, ChannelType.GuildAnnouncement];
		return discordSort(
			this.channels.filter(
				(c) =>
					(channelTypes.includes(channel.type) ? channelTypes.includes(c.type) : c.type === channel.type) &&
					(category || c.parent === channel.parent),
			),
		);
	}
}

export class GuildChannel extends BaseGuildChannel {
	get position() {
		const sorted = this.guild._sortedChannels(this);
		// @ts-expect-error never null
		return [...sorted.values()].indexOf(sorted.get(this.id));
	}
}
