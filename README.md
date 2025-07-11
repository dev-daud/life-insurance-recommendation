# Life Insurance Recommendation MVP

A full-stack life insurance recommendation engine built with Next.js, NestJS, PostgreSQL, and Docker.

## 🏗️ Architecture

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: NestJS with TypeScript
- **Database**: PostgreSQL
- **DevOps**: Docker & Docker Compose
- **Deployment**: AWS-ready configuration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Git

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd Life-Insurance-Recommendation
```

2. **Start the development environment**
```bash
# Start all services with Docker Compose
docker-compose up -d

# Or run services individually:
# Backend
cd backend
npm install
npm run start:dev

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

3. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Database: postgresql://localhost:5432/life_insurance

### Environment Variables

Create `.env` files in both `backend` and `frontend` directories:

**backend/.env**
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/life_insurance
JWT_SECRET=your-secret-key
PORT=3001
```

**frontend/.env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📚 API Documentation

### POST /recommendation

Calculate life insurance recommendation based on user profile.

**Request Body:**
```json
{
  "age": 30,
  "income": 75000,
  "dependents": 2,
  "riskTolerance": "medium"
}
```

**Response:**
```json
{
  "recommendation": "Term Life - $750,000 for 20 years",
  "explanation": "Based on your age, income, and dependents, we recommend a term life insurance policy...",
  "coverage": 750000,
  "term": 20,
  "type": "term"
}
```

## 🗄️ Database Schema

```sql
-- Users table for storing recommendation requests
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  age INTEGER NOT NULL,
  income INTEGER NOT NULL,
  dependents INTEGER NOT NULL,
  risk_tolerance VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recommendations table for storing generated recommendations
CREATE TABLE recommendations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  recommendation_text TEXT NOT NULL,
  explanation TEXT NOT NULL,
  coverage INTEGER NOT NULL,
  term INTEGER NOT NULL,
  type VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔒 Security Features

- Input validation and sanitization
- Rate limiting (10 requests per minute)
- CORS configuration
- Environment variable protection
- SQL injection prevention with TypeORM

## 🚀 AWS Deployment

### Using AWS ECS (Recommended)

1. **Build and push Docker images**
```bash
# Build images
docker build -t life-insurance-frontend ./frontend
docker build -t life-insurance-backend ./backend

# Tag for ECR
docker tag life-insurance-frontend:latest <account-id>.dkr.ecr.<region>.amazonaws.com/life-insurance-frontend:latest
docker tag life-insurance-backend:latest <account-id>.dkr.ecr.<region>.amazonaws.com/life-insurance-backend:latest

# Push to ECR
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/life-insurance-frontend:latest
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/life-insurance-backend:latest
```

2. **Setup RDS PostgreSQL**
```bash
# Create RDS instance
aws rds create-db-instance \
  --db-instance-identifier life-insurance-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username postgres \
  --master-user-password <password> \
  --allocated-storage 20
```

3. **Create ECS Task Definition**
```json
{
  "family": "life-insurance-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "frontend",
      "image": "<account-id>.dkr.ecr.<region>.amazonaws.com/life-insurance-frontend:latest",
      "portMappings": [{"containerPort": 3000}]
    },
    {
      "name": "backend",
      "image": "<account-id>.dkr.ecr.<region>.amazonaws.com/life-insurance-backend:latest",
      "portMappings": [{"containerPort": 3001}],
      "environment": [
        {"name": "DATABASE_URL", "value": "postgresql://postgres:<password>@<rds-endpoint>:5432/life_insurance"}
      ]
    }
  ]
}
```

### Alternative: Vercel + Render

1. **Deploy Frontend to Vercel**
```bash
cd frontend
vercel --prod
```

2. **Deploy Backend to Render**
- Connect GitHub repository
- Create new Web Service
- Set build command: `cd backend && npm install && npm run build`
- Set start command: `cd backend && npm run start:prod`

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test
npm run test:e2e

# Frontend tests
cd frontend
npm run test
npm run test:e2e
```

## 📊 Monitoring & Logging

- Application logs are structured for CloudWatch
- Health check endpoints available
- Performance metrics tracked

## 🔧 Development

### Code Standards

- ESLint + Prettier configuration
- TypeScript strict mode
- Conventional commits
- Pre-commit hooks with Husky

### Project Structure

```
Life-Insurance-Recommendation/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── modules/
│   │   ├── common/
│   │   └── main.ts
│   ├── test/
│   └── package.json
├── frontend/                # Next.js App
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   ├── public/
│   └── package.json
├── docker/                  # Docker configurations
├── docker-compose.yml
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License. 
