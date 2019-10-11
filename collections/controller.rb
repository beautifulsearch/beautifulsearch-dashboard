module BeautifulSearch
  module CollectionsController
    def self.registered(app)
      home = lambda do
        "Collection list!!"
      end

      app.get '/collections', &home
    end
  end
end
