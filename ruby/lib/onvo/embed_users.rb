# frozen_string_literal: true

# Embed user endpoints
module EmbedUsers
  def get_embed_users
    base_get('/embed-users')
  end

  def get_embed_user_by_id(id)
    base_get("/embed-users/#{id}")
  end

  def delete_embed_user_by_id(id)
    base_delete("/embed-users/#{id}")
  end

  def upsert_embed_user(id, name, email, metadata = {})
    base_post(
      '/embed-users',
      {
        'id': id,
        'name': name,
        'email': email,
        'metadata': metadata
      }
    )
  end

  def get_embed_user_access_token(id)
    base_get("/embed-users/#{id}/token")
  end
end
