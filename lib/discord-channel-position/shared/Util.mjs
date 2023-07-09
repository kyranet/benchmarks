import { ChannelType } from 'discord-api-types/v10';
import { BaseGuildChannel } from './BaseGuildChannel.mjs';

/**
 * @param {import('@discordjs/collection').Collection<string, BaseGuildChannel>} collection
 */
export function discordSort(collection) {
	const isGuildChannel = collection.first() instanceof BaseGuildChannel;
	return collection.sorted(
		isGuildChannel
			? (a, b) => a.rawPosition - b.rawPosition || Number(BigInt(a.id) - BigInt(b.id))
			: (a, b) => a.rawPosition - b.rawPosition || Number(BigInt(b.id) - BigInt(a.id)),
	);
}

const TextSortableGroupTypes = [ChannelType.GuildText, ChannelType.GuildAnnouncement, ChannelType.GuildForum];
const CategorySortableGroupTypes = [ChannelType.GuildCategory];

/**
 * Gets an array of the channel types that can be moved in the channel group. For example, a GuildText channel would
 * return an array containing the types that can be ordered within the text channels (always at the top), and a voice
 * channel would return an array containing the types that can be ordered within the voice channels (always at the
 * bottom).
 * @param {ChannelType} type The type of the channel
 * @returns {ChannelType[]}
 */
export function getSortableGroupTypes(type) {
	switch (type) {
		case ChannelType.GuildText:
		case ChannelType.GuildAnnouncement:
		case ChannelType.GuildForum:
			return TextSortableGroupTypes;
		// TODO(kyranet): Add GuildVoice and GuildStageVoice in a follow-up PR
		case ChannelType.GuildCategory:
			return CategorySortableGroupTypes;
		default:
			return [type];
	}
}
