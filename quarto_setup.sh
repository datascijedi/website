# Sets up Quarto and renders the website

echo "Quarto setup has begun. Please wait until it's ready to start using Quarto."

# Set the version of Quarto using the form `#.#.#.` and omitting any preceding "v" character
# Quarto releases can be found here: https://github.com/quarto-dev/quarto-cli/releases/
QUARTO_VERSION='1.5.57'

# Set this URL to change the Quarto version for deploys
QUARTO_TARBALL_URL=https://github.com/quarto-dev/quarto-cli/releases/download/v${QUARTO_VERSION}/quarto-${QUARTO_VERSION}-linux-amd64.tar.gz

# The directory to render to. Should match specification in `netlify.toml`
QUARTO_OUTPUT_DIR='_site'

QUARTO_TARBALL_BASENAME=${QUARTO_TARBALL_URL##*/}
QUARTO_SHORT_NAME=${QUARTO_TARBALL_BASENAME%-linux-amd64.tar.gz}

# Download Quarto
wget ${QUARTO_TARBALL_URL} &> /dev/null
if [ ! -f ${QUARTO_TARBALL_BASENAME} ]; then
  echo 'ERROR: Quarto tarball is missing, please check QUARTO_TARBALL_URL.'
  exit 1
fi

# Install Quarto
mkdir ~/opt
tar -C ~/opt -xvzf ${QUARTO_TARBALL_BASENAME} &> /dev/null
mkdir ~/bin
ln -s ~/opt/${QUARTO_SHORT_NAME}/bin/quarto ~/bin/quarto
export PATH=~/bin:$PATH
rm ${QUARTO_TARBALL_BASENAME}

# Only render up front for production deployments (not for Project IDX or Codespaces)
if [ -z ${IDX_CHANNEL} ] && [ -z ${CODESPACE_VSCODE_FOLDER} ]; then
  quarto render --output-dir ${QUARTO_OUTPUT_DIR}
fi

echo "Quarto setup is ready."