import { Podcast } from 'src/podcast/entities/podcast.entity';
import { CoreOutput } from './../../users/dtos/output.dto';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class searchPodcastsByTitleOutput extends CoreOutput{
    @Field(()=>[Podcast], { nullable : 'items'})
    podcasts?:Podcast[]
}