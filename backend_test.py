import requests
import json
import uuid
import time
import sys

# Backend URL from frontend/.env
BACKEND_URL = "https://a95636cf-7d48-4a97-8f77-49a869ec2479.preview.emergentagent.com"
API_BASE_URL = f"{BACKEND_URL}/api"

def test_root_endpoint():
    """Test the root endpoint (/api/)"""
    print("\n=== Testing Root Endpoint (/api/) ===")
    try:
        response = requests.get(f"{API_BASE_URL}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        assert "message" in response.json(), "Response missing 'message' field"
        assert response.json()["message"] == "Hello World", f"Expected 'Hello World', got {response.json()['message']}"
        
        print("✅ Root endpoint test passed")
        return True
    except Exception as e:
        print(f"❌ Root endpoint test failed: {str(e)}")
        return False

def test_create_status_check():
    """Test creating a status check (POST /api/status)"""
    print("\n=== Testing Create Status Check (POST /api/status) ===")
    try:
        client_name = f"test_client_{uuid.uuid4()}"
        payload = {"client_name": client_name}
        
        response = requests.post(f"{API_BASE_URL}/status", json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        assert "id" in response.json(), "Response missing 'id' field"
        assert response.json()["client_name"] == client_name, f"Expected client_name '{client_name}', got {response.json()['client_name']}"
        
        print("✅ Create status check test passed")
        return True, client_name
    except Exception as e:
        print(f"❌ Create status check test failed: {str(e)}")
        return False, None

def test_get_status_checks(client_name=None):
    """Test retrieving status checks (GET /api/status)"""
    print("\n=== Testing Get Status Checks (GET /api/status) ===")
    try:
        response = requests.get(f"{API_BASE_URL}/status")
        print(f"Status Code: {response.status_code}")
        print(f"Response contains {len(response.json())} status checks")
        
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        assert isinstance(response.json(), list), "Expected a list response"
        
        # If we created a status check earlier, verify it's in the response
        if client_name:
            found = False
            for status in response.json():
                if status["client_name"] == client_name:
                    found = True
                    break
            
            assert found, f"Could not find status check with client_name '{client_name}' in response"
            print(f"✅ Successfully found created status check with client_name '{client_name}'")
        
        print("✅ Get status checks test passed")
        return True
    except Exception as e:
        print(f"❌ Get status checks test failed: {str(e)}")
        return False

def run_all_tests():
    """Run all tests and return overall success status"""
    print("\n=== Starting Backend API Tests ===")
    print(f"Backend URL: {BACKEND_URL}")
    
    # Test results
    results = {}
    
    # Test root endpoint
    results["root_endpoint"] = test_root_endpoint()
    
    # Test create status check
    create_result, client_name = test_create_status_check()
    results["create_status_check"] = create_result
    
    # Test get status checks
    results["get_status_checks"] = test_get_status_checks(client_name)
    
    # Overall result
    all_passed = all(results.values())
    
    print("\n=== Test Summary ===")
    for test_name, passed in results.items():
        print(f"{test_name}: {'✅ Passed' if passed else '❌ Failed'}")
    
    print(f"\nOverall Result: {'✅ All tests passed' if all_passed else '❌ Some tests failed'}")
    return all_passed

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)