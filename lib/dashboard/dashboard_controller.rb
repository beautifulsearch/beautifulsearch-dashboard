require_relative '../../models/instance'

module BeautifulSearch
  module DashboardController
    def self.registered(app)
      app.register Sinatra::Namespace

      home = lambda do
        erb :dashboard_home, layout: :application
      end

      app.namespace '/dashboard' do
        get '', &home
      end
    end
  end
end
