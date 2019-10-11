require_relative '../models/instance'

module BeautifulSearch
  module DashboardController
    def self.registered(app)
      app.register Sinatra::Namespace

      home = lambda do
        Instance.help
      end

      app.namespace '/dashboard' do
        get '', &home
      end
    end
  end
end
