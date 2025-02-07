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
        };
        ctl =
          with pkgs;
          writeShellApplication {
            name = "ctl";
            text = with builtins; readFile ./ctl/ctl;
          };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = [
            pkgs.git
            pkgs.bash
            pkgs.bashly
            ctl
            pkgs.nodejs
            pkgs.nodePackages.npm
          ];
        };
        packages.default =
          let
            commitHashShort =
              if (builtins.hasAttr "shortRev" inputs.self) then
                inputs.self.shortRev
              else
                inputs.self.dirtyShortRev;
          in
          pkgs.buildNpmPackage {
            pname = "lazy-promise";
            version = commitHashShort;
            src = pkgs.lib.cleanSourceWith {
              src = pkgs.lib.cleanSource ./.;
              filter =
                path: type:
                let
                  baseName = builtins.baseNameOf path;
                in
                baseName == "package-lock.json"
                || baseName == "package.json"
                || baseName == "tsconfig.json"
                || baseName == "tsconfig.build.json"
                || pkgs.lib.hasPrefix (toString ./src) (toString path) && !(pkgs.lib.hasSuffix ".test.ts" baseName);
            };
            npmDepsHash = "sha256-mTJdK9wUPEbmCjbQ8JeJ2vhIJGA1e2UPdktnW1+CCDI=";
            installPhase = ''
              mkdir -p $out/dist
              cp -r dist $out/
            '';
          };
      }
    );
}
