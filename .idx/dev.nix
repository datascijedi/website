{ pkgs, ... }: {
  channel = "unstable";

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.quarto
  ];

  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "quarto.quarto"
    ];

    # Enable previews
    previews = {
      enable = true;
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        default.openFiles = [ "CONTRIBUTING.md" ];
      };
    };
  };
}
