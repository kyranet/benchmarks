import { Collection } from '@discordjs/collection';
import { DiscordSnowflake } from '@sapphire/snowflake';

/** @abstract */
export class BaseGuild {
	/**
	 * @typedef {Object} BaseGuildOptions
	 * @property {import('./types.d.ts').PartialGuildChannelData[]} channels
	 */

	/**
	 * @param {BaseGuildOptions} options
	 */
	constructor(options) {
		/**
		 * The id of the guild
		 * @type {string}
		 */
		this.id = DiscordSnowflake.generate().toString();

		/**
		 * @type {Collection<string, import('./BaseGuildChannel.mjs').BaseGuildChannel>}
		 */
		this.channels = new Collection();

		for (const channel of options.channels) {
			this.addChannel(channel);
		}
	}

	/**
	 * @abstract
	 * @param {import('./types.d.ts').PartialGuildChannelData} data
	 * @returns {import('./BaseGuildChannel.mjs').BaseGuildChannel}
	 */
	addChannel(data) {
		void data;
		throw new Error('Method not implemented.');
	}

	/**
	 * @abstract
	 * @param {import('./BaseGuildChannel.mjs').BaseGuildChannel} channel
	 * @returns {Collection<string, import('./BaseGuildChannel.mjs').BaseGuildChannel>}
	 */
	_sortedChannels(channel) {
		void channel;
		throw new Error('Method not implemented.');
	}
}
