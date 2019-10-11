# autoloader - requires all the fieles automatically to avoid manual imports

paths = %w[config/initializers/*.rb controllers/*.rb models/*.rb helpers/*.rb].map(&:freeze).freeze
paths.each do |path|
  Dir[File.join(App.root, path)].each do |file|
    next if file.include?('initializers/autoloader') # skip me
    require file
  end
end
