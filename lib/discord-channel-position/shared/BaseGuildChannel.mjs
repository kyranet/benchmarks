/** @abstract */
export class BaseGuildChannel {
	/**
	 * @param {import('./types.d.ts').PartialGuildChannelData} options
	 * @param {import('./BaseGuild.mjs').BaseGuild} guild
	 */
	constructor(options, guild) {
		/**
		 * The id of the channel
		 * @type {string}
		 */
		this.id = options.id;

		/**
		 * The type of the channel
		 *
		 * See https://discord.com/developers/docs/resources/channel#channel-object-channel-types
		 * @type {import('discord-api-types/v10').ChannelType}
		 */
		this.type = options.type;

		/**
		 * Sorting position of the channel
		 * @type {number}
		 */
		this.rawPosition = options.position;

		/**
		 * ID of the parent category for a channel (each parent category can contain up to 50 channels)
		 * @type {string|null}
		 */
		this.parentId = options.parent_id ?? null;

		/**
		 * The guild the channel belongs to
		 * @type {import('./BaseGuild.mjs').BaseGuild}
		 */
		this.guild = guild;
	}

	/**
	 * The parent category for a channel
	 * @type {import('./BaseGuildChannel.mjs').BaseGuildChannel|null}
	 */
	get parent() {
		return (this.parentId && this.guild.channels.get(this.parentId)) || null;
	}
}
