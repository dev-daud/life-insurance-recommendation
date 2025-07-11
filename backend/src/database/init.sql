-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  age INTEGER NOT NULL CHECK (age >= 18 AND age <= 80),
  income INTEGER NOT NULL CHECK (income >= 0),
  dependents INTEGER NOT NULL CHECK (dependents >= 0),
  risk_tolerance VARCHAR(10) NOT NULL CHECK (risk_tolerance IN ('low', 'medium', 'high')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create recommendations table
CREATE TABLE IF NOT EXISTS recommendations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recommendation_text TEXT NOT NULL,
  explanation TEXT NOT NULL,
  coverage INTEGER NOT NULL CHECK (coverage > 0),
  term INTEGER NOT NULL CHECK (term >= 0),
  type VARCHAR(20) NOT NULL CHECK (type IN ('term', 'whole')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_recommendations_user_id ON recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_created_at ON recommendations(created_at);

-- Insert sample data for testing (optional)
INSERT INTO users (age, income, dependents, risk_tolerance) VALUES
(30, 75000, 2, 'medium'),
(25, 50000, 0, 'high'),
(45, 100000, 3, 'low')
ON CONFLICT DO NOTHING; 
