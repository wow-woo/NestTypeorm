import { ObjectType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { ListenerHistory } from 'src/listenerHistory/entities/history.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { CoreEntity } from './core.entity';
import { Podcast } from './podcast.entity';

@Entity()
@ObjectType()
export class Episode extends CoreEntity {
  @Column()
  @Field(type => String)
  @IsString()
  title: string;

  @Column()
  @Field(type => String)
  @IsString()
  category: string;

  @OneToMany(()=>ListenerHistory, listenerHistory=>listenerHistory.playedEpisodes, { onDelete:'SET NULL'})
  history:ListenerHistory

  @ManyToOne(() => Podcast, podcast => podcast.episodes, {
    onDelete: 'CASCADE',
  })
  @Field(type => Podcast)
  podcast: Podcast;
}
