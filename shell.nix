{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell {
  name = "rust-dev-env";
  buildInputs = with pkgs; [
    rustc
    cargo
    rust-analyzer
    openssl
    pkg-config
    llvmPackages.libclang
    rustfmt
    clippy
    lld
    bacon
    gcc
    glibc.dev
    zola
    dioxus-cli
    rustup
  ];
  CARGO_TARGET_X86_64_UNKNOWN_LINUX_GNU_LINKER = "/nix/store/0fsnicvfpf55nkza12cjnad0w84d6ba7-gcc-wrapper-14.2.1.20250322/bin/gcc";
  RUST_SRC_PATH = pkgs.rustPlatform.rustLibSrc;
  RUSTC_WRAPPER = "/nix/store/nphlld0my29p3fcywmv25wfgfids15n0-sccache-0.10.0/bin/sccache";
  shellHook = '' 
    export PS1="🦀(rust-dev) $PS1" # $PS1 for shell's $PS1, not Nix's
    echo "🦀 Rust development environment activated!"
  '';
}
