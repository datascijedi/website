{ pkgs, ... }: {
  channel = "stable-24.05";
  packages = [
  ];
  env = { PATH = ["/home/user/bin"]; };
  idx = {
    extensions = [
      "quarto.quarto"
    ];
    previews = {
      enable = true;
    };
    workspace = {
      onCreate = {
        install-quarto = ". /home/user/website/quarto_setup.sh";
      };
      onStart = {
        remove-prior-quarto-installations = "rm -rf /home/user/opt /home/user/bin";
        install-quarto = ". /home/user/website/quarto_setup.sh";
      };
    };
  };
}