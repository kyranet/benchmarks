import type {
	APIGuildCategoryChannel,
	APIGuildChannel,
	APIGuildForumChannel,
	APIGuildStageVoiceChannel,
	APIGuildVoiceChannel,
	ChannelType,
} from 'discord-api-types/v10';

export type GuildTextChannelData = APIGuildChannel<ChannelType>;
export type GuildForumChannelData = APIGuildForumChannel;
export type GuildVoiceChannelData = APIGuildVoiceChannel;
export type GuildCategoryChannelData = APIGuildCategoryChannel;
export type GuildStageVoiceChannelData = APIGuildStageVoiceChannel;

export type GuildChannelData =
	| GuildTextChannelData
	| GuildForumChannelData
	| GuildVoiceChannelData
	| GuildCategoryChannelData
	| GuildStageVoiceChannelData;

export type PartialGuildChannelData = Pick<GuildChannelData, 'id' | 'type' | 'position' | 'parent_id'>;
