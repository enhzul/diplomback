class Role {
  constructor(id, grant_type, client_id, refresh_token, created_at) {
    this.id = id;
    this.grant_type = grant_type;
    this.client_id = client_id;
    this.refresh_token = refresh_token;
    this.created_at = created_at;
  }
}
module.exports = Role;
