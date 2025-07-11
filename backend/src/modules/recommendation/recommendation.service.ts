import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Recommendation } from './entities/recommendation.entity';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { RecommendationResponseDto } from './dto/recommendation-response.dto';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Recommendation)
    private readonly recommendationRepository: Repository<Recommendation>,
  ) {}

  async createRecommendation(createRecommendationDto: CreateRecommendationDto): Promise<RecommendationResponseDto> {
    const { age, income, dependents, riskTolerance } = createRecommendationDto;

    // Create and save user
    const user = this.userRepository.create({
      age,
      income,
      dependents,
      riskTolerance,
    });
    const savedUser = await this.userRepository.save(user);

    // Generate recommendation using business logic
    const recommendationData = this.generateRecommendation(age, income, dependents, riskTolerance);

    // Create and save recommendation
    const recommendation = this.recommendationRepository.create({
      userId: savedUser.id,
      recommendationText: recommendationData.recommendation,
      explanation: recommendationData.explanation,
      coverage: recommendationData.coverage,
      term: recommendationData.term,
      type: recommendationData.type,
    });
    const savedRecommendation = await this.recommendationRepository.save(recommendation);

    return {
      recommendation: savedRecommendation.recommendationText,
      explanation: savedRecommendation.explanation,
      coverage: savedRecommendation.coverage,
      term: savedRecommendation.term,
      type: savedRecommendation.type,
      userId: savedUser.id,
      createdAt: savedRecommendation.createdAt,
    };
  }

  private generateRecommendation(age: number, income: number, dependents: number, riskTolerance: string) {
    // Basic income multiplier based on dependents
    const baseMultiplier = Math.max(5, 8 + (dependents * 2));
    let coverage = income * baseMultiplier;

    // Age-based adjustments
    if (age < 30) {
      coverage *= 1.2; // Young people may need more coverage for longer period
    } else if (age > 50) {
      coverage *= 0.8; // Older people may need less coverage
    }

    // Risk tolerance adjustments
    switch (riskTolerance.toLowerCase()) {
      case 'high':
        coverage *= 1.3; // High risk tolerance = higher coverage
        break;
      case 'low':
        coverage *= 0.9; // Low risk tolerance = more conservative coverage
        break;
      // medium stays as is
    }

    // Round to nearest 50k
    coverage = Math.round(coverage / 50000) * 50000;

    // Determine insurance type and term based on age and risk tolerance
    let type: string;
    let term: number;
    let explanation: string;

    if (age < 40) {
      type = 'term';
      term = riskTolerance === 'low' ? 20 : 30;
      explanation = `Given your young age (${age}), term life insurance is typically the most cost-effective option. `;
    } else if (age < 55) {
      type = riskTolerance === 'high' ? 'whole' : 'term';
      term = type === 'whole' ? 0 : 20; // Whole life doesn't have a term
      explanation = `At age ${age}, you have flexibility in choosing between term and whole life insurance. `;
    } else {
      type = 'whole';
      term = 0;
      explanation = `Given your age (${age}), whole life insurance provides both coverage and investment benefits. `;
    }

    // Build detailed explanation
    explanation += `With ${dependents} dependent${dependents !== 1 ? 's' : ''} and an income of $${income.toLocaleString()}, `;
    explanation += `we recommend ${coverage.toLocaleString()} in coverage. `;
    explanation += `Your ${riskTolerance} risk tolerance suggests ${type === 'term' ? 'term life insurance for maximum cost efficiency' : 'whole life insurance for long-term wealth building'}.`;

    const recommendationText = type === 'term' 
      ? `${type.charAt(0).toUpperCase() + type.slice(1)} Life - $${coverage.toLocaleString()} for ${term} years`
      : `${type.charAt(0).toUpperCase() + type.slice(1)} Life - $${coverage.toLocaleString()}`;

    return {
      recommendation: recommendationText,
      explanation,
      coverage,
      term,
      type,
    };
  }

  async getRecommendationHistory(userId: number): Promise<RecommendationResponseDto[]> {
    const recommendations = await this.recommendationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    return recommendations.map(rec => ({
      recommendation: rec.recommendationText,
      explanation: rec.explanation,
      coverage: rec.coverage,
      term: rec.term,
      type: rec.type,
      userId: rec.userId,
      createdAt: rec.createdAt,
    }));
  }
} 
