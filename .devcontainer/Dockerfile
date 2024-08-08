ARG VARIANT=1.4.555
FROM ghcr.io/quarto-dev/quarto:${VARIANT}

ARG USERNAME=jedi

RUN \
    usermod -a -G jedi-group ${USERNAME} \
    && umask 0002
    
