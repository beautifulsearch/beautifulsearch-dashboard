module BeautifulSearch
  module DashboardController
    def self.registered(app)
      home = lambda do
        ::Instance.help
      end

      app.get '/dashboard', &home
    end
  end
end
