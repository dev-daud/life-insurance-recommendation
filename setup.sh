#!/bin/bash

echo "🚀 Setting up Life Insurance Recommendation MVP..."

# Create environment files
echo "📄 Creating environment files..."

# Backend environment
cat > backend/.env << EOF
DATABASE_URL=postgresql://postgres:password@localhost:5432/life_insurance
JWT_SECRET=your-secret-key-change-in-production
PORT=3001
NODE_ENV=development
EOF

# Frontend environment
cat > frontend/.env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3001
EOF

echo "✅ Environment files created!"

# Install dependencies
echo "📦 Installing dependencies..."

# Backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# Frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "✅ Dependencies installed!"

# Start services
echo "🐳 Starting services with Docker Compose..."
docker-compose up -d

echo "✅ Setup complete! 🎉"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:3001"
echo "🗄️ Database: postgresql://localhost:5432/life_insurance"
echo ""
echo "Run 'docker-compose logs -f' to see logs"
echo "Run 'docker-compose down' to stop services" 
