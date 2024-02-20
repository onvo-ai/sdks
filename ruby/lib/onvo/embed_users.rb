# frozen_string_literal: true

require_relative '../resource'

# Embed user endpoints
class EmbedUsers < Resource
  def list
    base_get('/embed-users')
  end

  def get(id)
    base_get("/embed-users/#{id}")
  end

  def delete(id)
    base_delete("/embed-users/#{id}")
  end

  def upsert(body)
    base_post('/embed-users', body: body)
  end

  def get_access_token(id)
    base_get("/embed-users/#{id}/token")
  end
end
