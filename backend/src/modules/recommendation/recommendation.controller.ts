import { Controller, Post, Body, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { RecommendationService } from './recommendation.service';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { RecommendationResponseDto } from './dto/recommendation-response.dto';

@Controller('recommendation')
@UseGuards(ThrottlerGuard)
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Post()
  async createRecommendation(@Body() createRecommendationDto: CreateRecommendationDto): Promise<RecommendationResponseDto> {
    return this.recommendationService.createRecommendation(createRecommendationDto);
  }

  @Get('history/:userId')
  async getRecommendationHistory(@Param('userId', ParseIntPipe) userId: number): Promise<RecommendationResponseDto[]> {
    return this.recommendationService.getRecommendationHistory(userId);
  }
} 
