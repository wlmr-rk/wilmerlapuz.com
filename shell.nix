{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "js-ts-dev-env";
  buildInputs = with pkgs; [ nodejs_20 yarn ];
  shellHook = '' 
    echo "📜 JavaScript/TypeScript development environment activated!"
    echo "   To start a new project: yarn init (or npm init)"
  ''; 
}
