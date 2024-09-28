FROM debian:12

# COPY . .

# Install Quarto
RUN rm -rf ~/opt ~/bin
RUN . ~/website/quarto_setup.sh

# Install Git
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends git \
    && git config --global --add safe.directory /workspaces/website