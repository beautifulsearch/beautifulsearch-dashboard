module BeautifulSearch
  module CollectionsController
    def self.registered(app)
      home = lambda do
         erb :collections_home
      end

      app.get '/collections', &home
    end
  end
end
