'use strict';

require('dotenv').config();

exports.encodeURI = (values) => {
  let body = [];
  for (let key in values) {
    let encodedKey = encodeURIComponent(key);
    let encodedValue = encodeURIComponent(values[key]);
    body.push(`${encodedKey}=${encodedValue}`);
  }
  return body.join('&');
}

exports.fetchToken = async () => {
  let response = await fetch(`https://${process.env.TOKEN_TEST_DOMAIN}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: encodeURI({
      client_id: process.env.TOKEN_CLIENT_ID,
      client_secret: process.env.TOKEN_CLIENT_SECRET,
      audience: process.env.TOKEN_CLIENT_AUDIENCE
    }),
  });

  let json = await response.json();
  return json.access_token;
}
