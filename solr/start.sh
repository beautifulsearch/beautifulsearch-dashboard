# check for relaod flag
# this would remove the old zip file
# clone the new zip file
# extract the zip
# and remove all the old containers
if [[ $* == *--reload* ]]; then
  # remove all conatiner
  docker-compose down
  # this syntax will avoid error in case the file doesn't exist
  rm -f -- bs.zip
  rm -rf -- bs
  # downlaod the file as bs.zip
  # TODO: get a generic link which will always point to the latest zip
  wget http://demo.supermind.org/beautifulsearch_20191110.zip -O bs.zip
  # create directory if required
  mkdir -p bs
  # unzip content to the right directory
  unzip bs.zip -d bs
fi

docker-compose up -d
