# frozen_string_literal: true

require_relative './base_template'

SAMPLE_EMBED_USER_PARAMS = {
  id: 'sample-embed-user-id',
  name: 'Rails Integration Test User',
  email: 'test@test.com',
  metadata: {
    hello: 'world'
  }
}.freeze

# All tests related to Onvo's embed user endpoints
class EmbedUsersTest < BaseTemplate
  def before_all
    super
    @sample_embed_user_id = @onvo.embed_users.upsert(
      SAMPLE_EMBED_USER_PARAMS
    )['id'] # skipping test create
  end

  def test_list_embed_users
    assert_silent { @onvo.embed_users.list }
  end

  def test_get_embed_user
    assert_silent { @onvo.embed_users.get(@sample_embed_user_id) }
  end

  def test_get_embed_user_access_token
    assert_silent { @onvo.embed_users.get_access_token(@sample_embed_user_id) }
  end

  def after_all
    @onvo.embed_users.delete(@sample_embed_user_id) # skipping test delete
  end
end
