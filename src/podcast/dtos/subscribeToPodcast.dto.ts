import { CoreOutput } from './../../users/dtos/output.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { ListenerHistory } from 'src/listenerHistory/entities/history.entity';

@ObjectType()
export class subscribeToPodcastOutput extends CoreOutput{
    @Field(()=>ListenerHistory, { nullable:true})
    history?:ListenerHistory
}