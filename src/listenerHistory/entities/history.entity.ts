import { ObjectType } from '@nestjs/graphql';
import { CoreEntity } from '../../users/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Field } from '@nestjs/graphql';
import { Episode } from 'src/podcast/entities/episode.entity';
import { Podcast } from 'src/podcast/entities/podcast.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, RelationId } from 'typeorm';

@ObjectType()
@Entity()
export class ListenerHistory extends CoreEntity {
    @Field(()=>User)
    @ManyToOne(()=>User, user=>user.history, {onDelete:'CASCADE'})
    @JoinColumn()
    listener:User

    @Field(()=>Podcast, { nullable : true})
    @ManyToOne(()=>Podcast, podcast=>podcast.history, {onDelete:'CASCADE'})
    @JoinColumn()
    podcastSubscription?:Podcast

    @Field(()=>Episode, { nullable : true})
    @ManyToOne(()=>Episode, episode=>episode.history, {onDelete:'CASCADE'})
    @JoinColumn()
    playedEpisodes?:Episode
}