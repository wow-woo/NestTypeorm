import { User } from 'src/users/entities/user.entity';
import { Episode } from 'src/podcast/entities/episode.entity';
import { Podcast } from 'src/podcast/entities/podcast.entity';
import { HistoryService } from './history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ListenerHistory } from './entities/history.entity';

@Module({
    imports:[TypeOrmModule.forFeature([
        ListenerHistory,
        Podcast,
        Episode,
        User
    ])],
    providers:[
        HistoryService
    ]
})
export class HistoryModule {}
