import { User } from 'src/users/entities/user.entity';
import { Module } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { EpisodeResolver, PodcastsResolver, ListenerResolver } from './podcasts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Podcast } from './entities/podcast.entity';
import { Episode } from './entities/episode.entity';
import { ListenerHistory } from 'src/listenerHistory/entities/history.entity';
import { HistoryService } from 'src/listenerHistory/history.service';

@Module({
  imports: [TypeOrmModule.forFeature([Podcast, Episode, User, ListenerHistory])],
  providers: [HistoryService, PodcastsService, PodcastsResolver, EpisodeResolver, ListenerResolver],
})
export class PodcastsModule {}
