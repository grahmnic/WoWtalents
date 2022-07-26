NextJS frontend using redux and atomic design w/ styled components.
Express API with DI pattern using awilix.
JWT/passport auth.

AUTH FLOW:
1. csrf token is fetched
2. cookies are fetched and then loaded into redux store
3. middleware detects when action is fulfilled and loads auth by reading cookie & decoding jwt (persist login)
4. user attempts to log in
5. api checks if user exists and compares user/pass combo
6. if exists, api signs jwt and stores into response cookie
7. cookies are again fetched/loaded into redux/auth loads again and sees access token

TODO:
- blp texture mappings
- in-tooltip editor
- talent tree(s)
- choice nodes
- tree backgrounds
- add new talents
- talent ranks
- export loadouts to passcodes
- pre-existing class templates
- spell damage summary ratios
- save loadouts to storage
- custom resource types
