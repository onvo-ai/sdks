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
