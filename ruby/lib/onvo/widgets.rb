# frozen_string_literal: true

require_relative '../resource'

# Dashboard Widget endpoints
class Widgets < Resource
  def initialize(endpoint, api_key, questions)
    super(endpoint, api_key)
    @questions = questions
  end

  # List out the widgets linked to a dashboard
  #
  # @param dashboard_id [String] The dashboard id to list widgets for
  # @return [Array] A list of all the widgets
  def list(dashboard_id)
    base_get('/widgets', query: { dashboard: dashboard_id })
  end

  # Get the details of a widget
  #
  # @param widget_id [String] The widget id to get
  # @return [Hash] The details of the widget
  def get(widget_id)
    base_get("/widgets/#{widget_id}")
  end

  # Create a new widget
  #
  # @param dashboard_id [String] The dashboard id to create the widget in
  # @param query [String] The query upon which a widget is created
  # @return [Hash] The details of the created widget
  def create(dashboard_id, query)
    conversation = @questions.create(dashboard_id, query)['messages']
    raw_widget_text = conversation.filter { |message| message['role'] == 'tool' }.last['content']

    code = raw_widget_text[/```python(?<code>[\S\n\t\v ]*)```\n```json/, :code].strip
    cache = JSON.parse(raw_widget_text[/```json(?<cache>[\S\n\t\v ]*)```/, :cache].strip)

    data = { dashboard: dashboard_id, code: code, cache: cache, messages: conversation }

    base_put('/widgets', body: data)
  end

  # Update the details of a widget. Note : updated data is not re-analyzed by the LLM
  #
  # @param widget_id [String] The widget id
  # @param body [Hash] The details to update
  # @return [Hash] The details of the updated widget
  def update(widget_id, body)
    base_post("/widgets/#{widget_id}", body: body)
  end

  # Delete a widget
  #
  # @param widget_id [String] The widget id to delete
  # @return [Hash] status of delete. Returns {"success": true} if successful.
  def delete(widget_id)
    base_delete("/widgets/#{widget_id}")
  end

  # Export a widget
  #
  # @param widget_id [String] The widget id to export
  # @param format [String] The export format
  # @return [Any] The widget in the requested format
  def export(widget_id, format)
    base_get("/widgets/#{widget_id}/export?format=#{format}")
  end

  # Request an edit to a widget. Note : updated data is re-analyzed by the LLM
  #
  # @param widget_id [String] The widget id to edit
  # @param body [Hash] The details of the edit
  # @return [Hash] The details of the updated widget
  def request_edit(widget_id, body)
    base_patch("/widgets/#{widget_id}", body: body)
  end

  # Execute code in the context of a widget. Note : The code uploaded does not modify the widget. This endpoint is used to ensure that the widget code works.
  #
  # @param widget_id [String] The widget id
  # @param code [String] The code to execute
  # @return [Hash] The details of the widget that would be created
  def execute_code(widget_id, code)
    base_post("/widgets/#{widget_id}/execute-code", body: { code: code })
  end
end
