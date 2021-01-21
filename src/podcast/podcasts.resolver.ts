import { HistoryService } from './../listenerHistory/history.service';
import { subscribeToPodcastOutput } from './dtos/subscribeToPodcast.dto';
import { searchPodcastsByTitleOutput } from './dtos/searchPodcastsByTitle.dto';
import { reviewPodcastOutput } from './dtos/reviewPodcast.dto';
import { seeSubscriptionsOutput } from './dtos/seeSubscriptions.dto';
import { MarkEpisodeOutput } from './dtos/markEpisodeAsPlayed.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthUser } from './../auth/auth-user.decorator';
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { PodcastsService } from "./podcasts.service";
import { Podcast } from "./entities/podcast.entity";
import {
  CreatePodcastInput,
  CreatePodcastOutput
} from "./dtos/create-podcast.dto";
import { CoreOutput } from "./dtos/output.dto";
import {
  PodcastSearchInput,
  PodcastOutput,
  EpisodesOutput,
  EpisodesSearchInput,
  GetAllPodcastsOutput
} from "./dtos/podcast.dto";
import { UpdatePodcastInput } from "./dtos/update-podcast.dto";
import { Episode } from "./entities/episode.entity";
import {
  CreateEpisodeInput,
  CreateEpisodeOutput
} from "./dtos/create-episode.dto";
import { UpdateEpisodeInput } from "./dtos/update-episode.dto";
import { Role } from "src/auth/role.decorator";

@Resolver((of) => Podcast)
export class PodcastsResolver {
  constructor(
    private readonly podcastsService: PodcastsService
  ) {}

  @Query((returns) => GetAllPodcastsOutput)
  getAllPodcasts(): Promise<GetAllPodcastsOutput> {
    return this.podcastsService.getAllPodcasts();
  }

  @Mutation((returns) => CreatePodcastOutput)
  @Role(["Host"])
  createPodcast(
    @Args("input") createPodcastInput: CreatePodcastInput
  ): Promise<CreatePodcastOutput> {
    return this.podcastsService.createPodcast(createPodcastInput);
  }

  @Query((returns) => PodcastOutput)
  getPodcast(
    @Args("input") podcastSearchInput: PodcastSearchInput
  ): Promise<PodcastOutput> {
    return this.podcastsService.getPodcast(podcastSearchInput.id);
  }

  @Mutation((returns) => CoreOutput)
  @Role(["Host"])
  deletePodcast(
    @Args("input") podcastSearchInput: PodcastSearchInput
  ): Promise<CoreOutput> {
    return this.podcastsService.deletePodcast(podcastSearchInput.id);
  }

  @Mutation((returns) => CoreOutput)
  @Role(["Host"])
  updatePodcast(
    @Args("input") updatePodcastInput: UpdatePodcastInput
  ): Promise<CoreOutput> {
    return this.podcastsService.updatePodcast(updatePodcastInput);
  }
}

@Resolver((of) => Episode)
export class EpisodeResolver {
  constructor(private readonly podcastService: PodcastsService) {}

  @Query((returns) => EpisodesOutput)
  getEpisodes(
    @Args("input") podcastSearchInput: PodcastSearchInput
  ): Promise<EpisodesOutput> {
    return this.podcastService.getEpisodes(podcastSearchInput.id);
  }

  @Mutation((returns) => CreateEpisodeOutput)
  @Role(["Host"])
  createEpisode(
    @Args("input") createEpisodeInput: CreateEpisodeInput
  ): Promise<CreateEpisodeOutput> {
    return this.podcastService.createEpisode(createEpisodeInput);
  }

  @Mutation((returns) => CoreOutput)
  @Role(["Host"])
  updateEpisode(
    @Args("input") updateEpisodeInput: UpdateEpisodeInput
  ): Promise<CoreOutput> {
    return this.podcastService.updateEpisode(updateEpisodeInput);
  }

  @Mutation((returns) => CoreOutput)
  @Role(["Host"])
  deleteEpisode(
    @Args("input") episodesSearchInput: EpisodesSearchInput
  ): Promise<CoreOutput> {
    return this.podcastService.deleteEpisode(episodesSearchInput);
  }
}

@Role(['Listener'])
@Resolver()
export class ListenerResolver {
  constructor(
    private readonly historyService :HistoryService
  ) {}

  // searchPodcasts (by title)
  @Query(()=>searchPodcastsByTitleOutput)
  searchPodcasts(
    @Args('title') title:string
  ):Promise<searchPodcastsByTitleOutput>{
    return this.historyService.searchPodcastsByTitle(title)
  }

  // reviewPodcast
  @Query(()=>reviewPodcastOutput)
  reviewPodcast(
    @Args('podcastId') podcastId:number
  ):Promise<reviewPodcastOutput>{
    return this.historyService.reviewPodcast(podcastId)
  }

  // subscribeToPodcast
  @Mutation(()=>subscribeToPodcastOutput)
  subscribeToPodcast(
    @Args('podcastId') podcastId:number,
    @AuthUser() {id:userId} : User
  ):Promise<subscribeToPodcastOutput>{
    return this.historyService.subscribeToPodcast(userId, podcastId)
  }

  // seeSubscriptions
  @Query(()=>seeSubscriptionsOutput)
  seeSubscriptions(
    @AuthUser() {id:userId} : User
  ):Promise<seeSubscriptionsOutput>{
    return this.historyService.seeSubscriptions(userId)
  }
  
  // markEpisodeAsPlayed (like a Netflix movie that has been watched)
  @Mutation(()=>MarkEpisodeOutput)
  markEpisodeAsPlayed(
    @AuthUser() {id:userId} : User,
    @Args('episodeId') episodeId:number,
  ):Promise<MarkEpisodeOutput>{
    return this.historyService.markEpisodeAsPlayed(userId, episodeId)
  }
}