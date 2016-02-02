APP_ID=3hIXSU01WBdCfF3izKz9dA
CLIENT_APIKEY_ID=44ZB7KQ7PW8SEM9H06KXNGNZU
CLIENT_APIKEY_SECRET=iSGgDG6fGMHNM9dvXfZxP23zubNOqe0FI57hSFtBKeM
APPLICATION_HREF=https://api.stormpath.com/v1/applications/3hIXSU01WBdCfF3izKz9dA


valueEncrypted=$(echo "admin:Chuson123" | openssl enc -base64)
# valueEncrypted=YWRtaW46Q2h1c29uMTIz
echo $valueEncrypted
# echo https://api.stormpath.com/v1/applications/$APP_ID/loginAttempts
body="{ \
       \"type\": \"basic\", \
       \"value\": \"$valueEncrypted\" \
     }"
# echo $body
accountHref=$(curl -s -X POST -u $CLIENT_APIKEY_ID:$CLIENT_APIKEY_SECRET \
	$APPLICATION_HREF/loginAttempts \
	--data "$body" \
    -H 'Content-Type: application/json' \
    -H "Accept: application/json" | jq -r '.account.href')
echo accountHref $accountHref

apiKeysHref=$(curl -s -X GET -u $CLIENT_APIKEY_ID:$CLIENT_APIKEY_SECRET \
	$accountHref \
	-H 'Content-Type: application/json' | jq -r '.apiKeys.href')

apiKeys=$(curl -s -X GET -u $CLIENT_APIKEY_ID:$CLIENT_APIKEY_SECRET \
	$apiKeysHref \
	-H 'Content-Type: application/json' | jq -r '.items[0]')
echo apiKeys $apiKeys

account_id=$(echo $apiKeys | jq -r '.id')
account_secret=$(echo $apiKeys | jq -r '.secret')
# echo $account_id
# echo $account_secret

accessToken=$(curl -s -X POST \
	-u $account_id:$account_secret \
	http://localhost:3000/oauth/token \
	-d grant_type=client_credentials | jq -r '.access_token')
echo $accessToken > accessToken_temp.txt

curl -s -X GET \
	-H "Authorization: Bearer $accessToken" \
	http://localhost:3000/api/users | jq -r