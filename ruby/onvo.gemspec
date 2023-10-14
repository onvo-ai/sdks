# frozen_string_literal: true

Gem::Specification.new do |s|
  s.name                  = 'onvo'
  s.version               = '0.0.1'
  s.summary               = 'A gem to provide utilities to seamlessly communicate with the Onvo platform, allowing developers to integrate AI-powered dashboards into their products.'
  s.authors               = ['Ronnel Davis', 'Bryan Davis']
  s.files                 = ['lib/onvo.rb']
  s.required_ruby_version = '>= 2.6.0'
  s.add_dependency 'httparty', '~> 0.13.7'
end