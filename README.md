NextJS frontend using redux to manage auth state.
CMS route will build posts by using ReactDOMServer to convert templates to html with embedded tailwind classes. Templates are saved as JSON.
Express API using jwt/passport for auth.

AUTH FLOW:
1. csrf token is fetched
2. cookies are fetched and then loaded into redux store
3. middleware detects when action is fulfilled and loads auth by reading cookie & decoding jwt (persist login)
4. user attempts to log in
5. api checks if user exists and compares user/pass combo
6. if exists, api signs jwt and stores into response cookie
7. cookies are again fetched/loaded into redux/auth loads again and sees access token

TODO:
- test post using tailwind
- cms
- refresh tokens + rotation
- rate limit api
