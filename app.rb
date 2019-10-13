require 'sinatra/base'
require 'sinatra/reloader'
require 'sinatra/namespace'

require_relative 'lib/dashboard/dashboard_controller'
require_relative 'lib/collections/collections_controller'

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
      # search in root layouts if not found inside individual plugins
      super('layouts', name, engine, &block)
    end
  end

  # autoload controller, models, helpers and initializers
  # NOTE: autoload created subtle bugs when files were updated
  # require File.join(root, '/config/initializers/autoloader.rb')

  enable :sessions, :logging, :static

  configure :development do
    enable :reloader, :dump_errors, :raise_errors
    register Sinatra::Reloader
    also_reload 'models/*.rb'
    also_reload 'helpers/*.rb'
    also_reload 'lib/**/*.rb'
  end

  # user defined helpers
  # helper BeautifulSearch::Helpers::Dashboard

  # user defined controllers
  register BeautifulSearch::DashboardController
  register BeautifulSearch::CollectionsController
end
