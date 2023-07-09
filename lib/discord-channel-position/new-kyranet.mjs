import { Snowflake } from '@sapphire/snowflake';
import { ChannelType } from 'discord-api-types/v10';
import { BaseGuild } from './shared/BaseGuild.mjs';
import { BaseGuildChannel } from './shared/BaseGuildChannel.mjs';
import { discordSort, getSortableGroupTypes } from './shared/Util.mjs';

export class Guild extends BaseGuild {
	/**
	 * @param {import('./shared/types.js').PartialGuildChannelData} data
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
		const channelIsCategory = channel.type === ChannelType.GuildCategory;
		const types = getSortableGroupTypes(channel.type);
		return discordSort(
			this.channels.filter((c) => types.includes(c.type) && (channelIsCategory || c.parentId === channel.parentId)),
		);
	}
}

export class GuildChannel extends BaseGuildChannel {
	get position() {
		const selfIsCategory = this.type === ChannelType.GuildCategory;
		const types = getSortableGroupTypes(this.type);

		let count = 0;
		for (const channel of this.guild.channels.values()) {
			if (!types.includes(channel.type) || !(selfIsCategory || channel.parentId === this.parentId)) continue;
			if (this.rawPosition === channel.rawPosition) {
				if (Snowflake.compare(channel.id, this.id) === -1) count++;
			} else if (this.rawPosition > channel.rawPosition) {
				count++;
			}
		}

		return count;
	}
}
