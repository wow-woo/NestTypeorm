import { Podcast } from 'src/podcast/entities/podcast.entity';
import { CoreOutput } from './../../users/dtos/output.dto';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class reviewPodcastOutput extends CoreOutput{
    @Field(()=>Podcast)
    podcast?:Podcast
}