{
  description = "A lazy promise that waits until you ask it to get to work.";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-24.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    { ... }@inputs:
    inputs.flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import inputs.nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
        ctl =
          with pkgs;
          writeShellApplication {
            name = "ctl";
            text = with builtins; readFile ./ctl/ctl;
          };
      in
      {
        devShell = pkgs.mkShell {
          packages = [
            pkgs.git
            pkgs.bash
            pkgs.bashly
            ctl
            pkgs.nodejs
            pkgs.nodePackages.npm
          ];
        };
      }
    );
}
