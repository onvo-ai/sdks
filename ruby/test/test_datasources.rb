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

  SAMPLE_DATASOURCE_PARAMS = {
    description: 'Ruby Integration Test Data Source',
    title: 'Ruby Integration Test Data Source',
    source: 'api',
    config: '{"type":"json","method":"GET","transform":"products","url":"https://dummyjson.com/products","headers":"{}"}'
  }.freeze

  def create_sample_datasource
    @onvo.datasources.create(SAMPLE_DATASOURCE_PARAMS)
  end

  def with_sample_datasource
    id = create_sample_datasource['id']
    yield id
    @onvo.datasources.delete(id)
  end

  def test_list_datasources
    assert_silent { @onvo.datasources.list }
  end

  def test_create_and_delete_datasource
    assert_silent do
      datasource_id = create_sample_datasource['id']
      @onvo.datasources.delete(datasource_id)
    end
  end

  def test_get_datasource
    with_sample_datasource do |datasource_id|
      assert_silent { @onvo.datasources.get(datasource_id) }
    end
  end

  def test_populate_datasource
    with_sample_datasource do |datasource_id|
      assert_silent { @onvo.datasources.fetch_column_descriptions(datasource_id) }
    end
  end

  def test_get_datasource_data
    with_sample_datasource do |datasource_id|
      assert_silent { @onvo.datasources.get_data(datasource_id) }
    end
  end

  def test_update_datasource
    with_sample_datasource do |datasource_id|
      assert_silent do
        @onvo.datasources.update(datasource_id, { title: 'Renaming Test' })
      end
    end
  end
end
