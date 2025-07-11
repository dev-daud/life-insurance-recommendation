import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './recommendation.service';
import { User } from '../user/entities/user.entity';
import { Recommendation } from './entities/recommendation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Recommendation])],
  controllers: [RecommendationController],
  providers: [RecommendationService],
  exports: [RecommendationService],
})
export class RecommendationModule {} 
