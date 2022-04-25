# TODO


Client updates are automatic
versions are stored locally
hash of client version is part of server payload along with user session token
- versions are revoked the same as user sessions, except you can exchange a valid
- user session token with an old version with a new version after updating.

how do we keep clients from tampering with their codebase? or do we even care? since everything is enforced again on the server side?