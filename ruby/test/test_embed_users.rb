# frozen_string_literal: true

require 'minitest/autorun'
require_relative '../lib/onvo'

# All tests related to Onvo's embed user endpoints
class EmbedUsersTest < Minitest::Test
  def setup
    @endpoint = ENV['ONVO_API_ENDPOINT']
    @api_key = ENV['ONVO_API_KEY']
    @onvo = Onvo.new(@endpoint, @api_key)
  end

  def create_sample_embed_user
    @onvo.upsert_embed_user(
      'sample-embed-user-id',
      'Rails Integration Test User',
      'test@test.com',
      { 'hello': 'world' }
    )
  end

  def with_sample_embed_user
    id = create_sample_embed_user['id']
    yield id
    @onvo.delete_embed_user_by_id(id)
  end

  def test_get_embed_users
    assert_silent { @onvo.get_embed_users }
  end

  def test_get_embed_user_by_id
    with_sample_embed_user do |user_id|
      assert_silent { @onvo.get_embed_user_by_id(user_id) }
    end
  end

  def test_create_and_delete_embed_user
    assert_silent do
      sample_embed_user_id = create_sample_embed_user["id"]
      @onvo.delete_embed_user_by_id(sample_embed_user_id)
    end
  end

  def test_get_embed_user_access_token
    with_sample_embed_user do |user_id|
      assert_silent { @onvo.get_embed_user_access_token(user_id) }
    end
  end
end
