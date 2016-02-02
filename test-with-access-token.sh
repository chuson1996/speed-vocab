accessToken=$(cat accessToken_temp.txt)
curl -s -X GET \
	-H "Authorization: Bearer $accessToken" \
	http://localhost:3000/api/user | jq -r