# Sets up Quarto and renders the website

# Set this URL to change the Quarto version for deploys
# Quarto releases can be found here: https://github.com/quarto-dev/quarto-cli/releases/
QUARTO_TARBALL_URL='https://github.com/quarto-dev/quarto-cli/releases/download/v1.4.555/quarto-1.4.555-linux-amd64.tar.gz'
# The directory to render to. Should match specification in `netlify.toml`
QUARTO_OUTPUT_DIR='_site'

QUARTO_TARBALL_BASENAME=${QUARTO_TARBALL_URL##*/}
QUARTO_SHORT_NAME=${QUARTO_TARBALL_BASENAME%-linux-amd64.tar.gz}

wget ${QUARTO_TARBALL_URL} &> /dev/null
if [ ! -f ${QUARTO_TARBALL_BASENAME} ]; then
  echo 'ERROR: Quarto tarball is missing, please check QUARTO_TARBALL_URL.'
  exit 1
fi

mkdir ~/opt
tar -C ~/opt -xvzf ${QUARTO_TARBALL_BASENAME} &> /dev/null
mkdir ~/bin
ln -s ~/opt/${QUARTO_SHORT_NAME}/bin/quarto ~/bin/quarto
export PATH=$PATH:~/bin
quarto render --output-dir ${QUARTO_OUTPUT_DIR}
