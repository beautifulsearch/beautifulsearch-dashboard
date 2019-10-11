require_relative '../../models/instance'

module BeautifulSearch
  module DashboardController
    def self.registered(app)
      home = lambda do
        erb :dashboard_home
      end

      app.namespace '/dashboard' do
        get '', &home
      end
    end
  end
end
