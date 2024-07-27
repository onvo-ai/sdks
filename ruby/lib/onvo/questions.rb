# frozen_string_literal: true

require 'uri'
require_relative '../resource'

# Dashboard Question endpoints
class Questions < Resource
  # list questions from a dashboard
  #
  # @param dashboard_id [String] ID of the dashboard
  # @return [Array] list of questions in the given dashboard
  def list(dashboard_id)
    base_get('/questions', query: { dashboard: dashboard_id })
  end

  # create a question in a dashboard
  #
  # @param dashboard_id [String] ID of the dashoard to create the question in
  # @param query [String] the answer to the question asked
  def create(dashboard_id, query)
    base_post('/questions', body: { dashboard: dashboard_id, messages: [{ role: 'user', content: query }] })
  end

  # delete a question
  #
  # @param id [String] ID of the question to delete
  # @return [Hash] status of delete. Returns {"success": true} if successful.
  def delete(id)
    base_delete("/questions/#{id}")
  end

  # TODO : Add update method once tested on postman
end