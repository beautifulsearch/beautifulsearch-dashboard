require 'sinatra/base'
require 'sinatra/reloader'
require 'sinatra/namespace'

require_relative 'lib/dashboard/controller'
require_relative 'lib/collections/controller'

# This value can come from some other place
# based on which plugin mount and template lookup will be done
PLUGINS = [
  'dashboard',
  'collections'
]

class App < Sinatra::Base
  set :root, File.dirname(__FILE__)
  set :views, PLUGINS.map {|plugin| "lib/#{plugin}/templates" }
  helpers do
    def find_template(views, name, engine, &block)
      Array(views).each { |v| super(v, name, engine, &block) }
    end
  end

  # autoload controller, models, helpers and initializers
  # NOTE: autoload created subtle bugs when files were updated
  # require File.join(root, '/config/initializers/autoloader.rb')

  enable :sessions, :logging, :static, :dump_errors

  # configure reloader in developerment environment only
  configure :development do
    enable :reloader
    register Sinatra::Reloader
    also_reload 'models/*.rb'
    also_reload 'helpers/*.rb'
    also_reload 'lib/**/*.rb'
  end

  # register user defined helpers
  # helper BeautifulSearch::Helpers::Dashboard

  # register user defined controllers
  register BeautifulSearch::DashboardController
  register BeautifulSearch::CollectionsController
end
