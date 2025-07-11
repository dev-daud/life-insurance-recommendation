#!/bin/bash

echo "🧪 Testing Life Insurance API..."

API_URL="http://localhost:3001/api"

# Test health endpoint
echo "🏥 Testing health endpoint..."
curl -s "$API_URL/health" | jq '.'

echo ""

# Test recommendation endpoint
echo "💡 Testing recommendation endpoint..."
curl -s -X POST "$API_URL/recommendation" \
  -H "Content-Type: application/json" \
  -d '{
    "age": 30,
    "income": 75000,
    "dependents": 2,
    "riskTolerance": "medium"
  }' | jq '.'

echo ""

# Test with different parameters
echo "💡 Testing with high risk tolerance..."
curl -s -X POST "$API_URL/recommendation" \
  -H "Content-Type: application/json" \
  -d '{
    "age": 25,
    "income": 50000,
    "dependents": 0,
    "riskTolerance": "high"
  }' | jq '.'

echo ""

# Test with older age
echo "💡 Testing with older age..."
curl -s -X POST "$API_URL/recommendation" \
  -H "Content-Type: application/json" \
  -d '{
    "age": 55,
    "income": 100000,
    "dependents": 3,
    "riskTolerance": "low"
  }' | jq '.'

echo ""

# Test validation error
echo "❌ Testing validation error..."
curl -s -X POST "$API_URL/recommendation" \
  -H "Content-Type: application/json" \
  -d '{
    "age": 17,
    "income": -1000,
    "dependents": -1,
    "riskTolerance": "invalid"
  }' | jq '.'

echo ""
echo "✅ API tests completed!" 
