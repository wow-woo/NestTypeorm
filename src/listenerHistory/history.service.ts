import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MarkEpisodeOutput } from "src/podcast/dtos/markEpisodeAsPlayed.dto";
import { reviewPodcastOutput } from "src/podcast/dtos/reviewPodcast.dto";
import { searchPodcastsByTitleOutput } from "src/podcast/dtos/searchPodcastsByTitle.dto";
import { seeSubscriptionsOutput } from "src/podcast/dtos/seeSubscriptions.dto";
import { subscribeToPodcastOutput } from "src/podcast/dtos/subscribeToPodcast.dto";
import { Episode } from "src/podcast/entities/episode.entity";
import { Podcast } from "src/podcast/entities/podcast.entity";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { ListenerHistory } from "./entities/history.entity";

@Injectable()
export class HistoryService {
    constructor(
        @InjectRepository(Podcast)
        private readonly podcastRepository: Repository<Podcast>,
        @InjectRepository(Episode)
        private readonly episodeRepository: Repository<Episode>,
        @InjectRepository(User)
        private readonly userRepository : Repository<User>,
        @InjectRepository(ListenerHistory)
        private readonly listenerHistoryRepository: Repository<ListenerHistory>
    ){}

     // -------------listener -----------

  async searchPodcastsByTitle(title:string):Promise<searchPodcastsByTitleOutput>{
    //convert into queryBuilder for matching
    let podcasts = await this.podcastRepository.find({title})

    return { ok:true, podcasts}
  }

  async reviewPodcast(podcastId:number):Promise<reviewPodcastOutput>{
    const podcast = await this.podcastRepository.findOne(podcastId)
    if(!podcast){
      return {ok:false, error:"No podcast found"}
    }
    return { ok:true, podcast}
  }

  async subscribeToPodcast(userId:number, podcastId:number):Promise<subscribeToPodcastOutput>{
    const podcast = await this.podcastRepository.findOne(podcastId)
    if(!podcast){
      return { ok:false, error:"No podcast found"}
    }
    const user = await this.userRepository.findOne(userId)

    const isSubscribed = await this.listenerHistoryRepository.find({listener:user ,podcastSubscription:podcast})
    if(isSubscribed.length !==0){
        return { ok:false, error:"you subscribing to this podcast already"}
    }
    const listener = await this.userRepository.findOne(userId)
    const history = await this.listenerHistoryRepository.create({podcastSubscription:podcast, listener})
    const result = await this.listenerHistoryRepository.save(history)
    console.log('hisssssss', result)
    return {ok:true, history:result}
  }

  async seeSubscriptions(userId:number):Promise<seeSubscriptionsOutput>{
    const user = await this.userRepository.findOne(userId)
    // let subscriptions = await this.listenerHistoryRepository.find({listener:user}, {relations:['podcastSubscription', 'playedEpisode']} )
    let subscriptions = await this.listenerHistoryRepository.find(
            {relations: ["podcastSubscription", "playedEpisodes", "listener"],
            where: {
                listener: user
            },}
     )
    const eve = await this.listenerHistoryRepository.find()
    console.log('all subscriptions',eve)
    return { ok: true, history:subscriptions}
  }
  
  async markEpisodeAsPlayed(userId:number, episodeId:number):Promise<MarkEpisodeOutput>{
    const episode = await this.episodeRepository.findOne(episodeId)
    if(!episode){
      return { ok:false, error:"No episode found"}
    }
    const user = await this.userRepository.findOne(userId)
    const isMarked = await this.listenerHistoryRepository.find({listener:user, playedEpisodes:episode})
    if(isMarked.length !== 0){
        return {ok:false, error:"you marked this episode already"}
    }

    const listener = await this.userRepository.findOne(userId)
    const history = await this.listenerHistoryRepository.create({playedEpisodes:episode, listener})
    const result = await this.listenerHistoryRepository.save(history)
    console.log('hisssssss', result)
    return { ok:true, history:result}
  }
}