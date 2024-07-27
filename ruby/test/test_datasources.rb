# frozen_string_literal: true

require_relative './base_template'

SAMPLE_DATASOURCE_PARAMS = {
  description: 'Ruby Integration Test Data Source',
  title: 'Ruby Integration Test Data Source',
  source: 'api',
  config: '{"type":"json","method":"GET","transform":"products","url":"https://dummyjson.com/products","headers":"{}"}'
}.freeze

# All tests related to Onvo's datasource endpoints
class DatasourcesTest < BaseTemplate
  def before_all
    super
    @sample_datasource_id = @onvo.datasources.create(SAMPLE_DATASOURCE_PARAMS)['id'] # skipping test create
  end

  def test_list_datasources
    assert_silent { @onvo.datasources.list }
  end

  # TODO : diagnose and fix 500 error
  # def test_upload_file
    # assert_silent do
    #   @onvo.datasources.upload_file(@sample_datasource_id, 'test/fixtures/test.json')
    # end
  # end

  def test_initialize_datasource
    assert_silent do
      @onvo.datasources.initialize_datasource(@sample_datasource_id)
    end
  end

  def test_get_datasource
    assert_silent { @onvo.datasources.get(@sample_datasource_id) }
  end

  def test_update_datasource
    assert_silent do
      @onvo.datasources.update(@sample_datasource_id, { title: 'Renaming Test' })
    end
  end

  def after_all
    @onvo.datasources.delete(@sample_datasource_id)
  end
end
