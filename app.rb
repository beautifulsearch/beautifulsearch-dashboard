require 'sinatra/base'
require 'sinatra/reloader'
require 'sinatra/namespace'

require_relative 'dashboard/controller'
require_relative 'collections/controller'

class App < Sinatra::Base
  set :root, File.dirname(__FILE__)
  # autoload controller, models, helpers and initializers
  # NOTE: autoload created subtle bugs when files were updated
  # require File.join(root, '/config/initializers/autoloader.rb')

  enable :sessions, :logging, :static

  configure :development do
    # configure reloader in developerment environment only
    register Sinatra::Reloader
    # enable reloading for non-modules like models and services
    also_reload 'collections/*.rb'
    also_reload 'models/*.rb'
    also_reload 'helpers/*.rb'
  end

  # register user defined helpers
  # helper BeautifulSearch::Helpers::Dashboard

  # register user defined controllers
  register BeautifulSearch::DashboardController
  register BeautifulSearch::CollectionsController
end
