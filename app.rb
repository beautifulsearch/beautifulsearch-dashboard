require 'sinatra/base'
require "sinatra/reloader"
require "sinatra/namespace"

class App < Sinatra::Base
  set :root, File.dirname(__FILE__)
  # autoload controller, models, helpers and initializers
  require File.join(root, '/config/initializers/autoloader.rb')

  enable :sessions, :logging, :static

  register Sinatra::Namespace

  configure :development do
    # configure reloader in developerment environment only
    register Sinatra::Reloader
    # enable reloading for non-modules like models and services
    also_reload 'models/*.rb'
  end

  # register user defined helpers
  # helper BeautifulSearch::Helpers::Dashboard

  # register user defined controllers
  register BeautifulSearch::DashboardController
end
