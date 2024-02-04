# frozen_string_literal: true

require 'minitest/autorun'
require_relative '../lib/onvo'

# All tests related to Onvo's datasource endpoints
class DatasourcesTest < Minitest::Test
  def setup
    @endpoint = ENV['ONVO_API_ENDPOINT']
    @api_key = ENV['ONVO_API_KEY']
    @onvo = Onvo.new(@endpoint, @api_key)
  end

  def test_onvo_initializer
    options = {
      headers: {
        'x-api-key': @api_key,
        'Content-Type': 'application/json'
      }
    }
    assert_equal options, @onvo.options
  end

  SAMPLE_DATASOURCE_PARAMS = {
    'description': 'Ruby Integration Test Data Source',
    'title': 'Ruby Integration Test Data Source',
    "source": 'file',
    'config': '{"url":"https://eiexmihxmtknazmbqnsa.supabase.co/storage/v1/object/sign/data-sources/357c281c-4347-4778-a575-6aabe4c831bc/datasource:dc66cd9b-7fe8-47e2-8370-2d19f8f3200f/zillow.csv?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkYXRhLXNvdXJjZXMvMzU3YzI4MWMtNDM0Ny00Nzc4LWE1NzUtNmFhYmU0YzgzMWJjL2RhdGFzb3VyY2U6ZGM2NmNkOWItN2ZlOC00N2UyLTgzNzAtMmQxOWY4ZjMyMDBmL3ppbGxvdy5jc3YiLCJpYXQiOjE3MDY5NjQ0ODksImV4cCI6MTczODUwMDQ4OX0.XJHdWIn4ezrOyHZrcMoPldpt98Lu3f8D-W5VW2kllSk","filename":"zillow.csv","type":"csv"}'
  }.freeze

  def create_sample_datasource
    @onvo.create_datasource(SAMPLE_DATASOURCE_PARAMS)
  end

  def with_sample_datasource
    id = create_sample_datasource['id']
    yield id
    @onvo.delete_datasource_by_id(id)
  end

  def test_get_datasources
    assert_silent { @onvo.get_datasources }
  end

  def test_create_and_delete_datasource
    assert_silent do
      datasource_id = create_sample_datasource['id']
      @onvo.delete_datasource_by_id(datasource_id)
    end
  end

  def test_get_datasource_by_id
    with_sample_datasource do |datasource_id|
      assert_silent { @onvo.get_datasource_by_id(datasource_id) }
    end
  end

  def test_populate_datasource_by_id
    with_sample_datasource do |datasource_id|
      assert_silent { @onvo.populate_data_source_by_id(datasource_id) }
    end
  end

  def test_get_datasource_data_by_id
    with_sample_datasource do |datasource_id|
      assert_silent { @onvo.get_datasource_data_by_id(datasource_id) }
    end
  end

  def test_update_datasource_by_id
    with_sample_datasource do |datasource_id|
      assert_silent do
        @onvo.update_datasource_by_id(datasource_id, { title: 'Renaming Test' })
      end
    end
  end
end
