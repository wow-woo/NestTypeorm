import { CoreOutput } from './../../users/dtos/output.dto';
import { ObjectType, Field } from '@nestjs/graphql';
import { ListenerHistory } from 'src/listenerHistory/entities/history.entity';

@ObjectType()
export class seeSubscriptionsOutput extends CoreOutput{
    @Field(()=>[ListenerHistory], {nullable:true})
    history?:ListenerHistory[]
}