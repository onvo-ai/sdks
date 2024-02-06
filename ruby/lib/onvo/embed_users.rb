# frozen_string_literal: true

require_relative '../resource_template'

# Embed user endpoints
class EmbedUsers < ResourceTemplate
  def list
    base_get('/embed-users')
  end

  def get(id)
    base_get("/embed-users/#{id}")
  end

  def delete(id)
    base_delete("/embed-users/#{id}")
  end

  def upsert(id, name, email, metadata = {})
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

  def get_access_token(id)
    base_get("/embed-users/#{id}/token")
  end
end
