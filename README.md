<h1>FortuneForest 🌴🌳</h1>

FortuneForest is a Web3 based game hosted on ICP's decentralized network. With the ultimate aim to restore Philippines ecological and forest biodiversity through reforestation while provididng entertainment and worth while accomplishment to every Ecogamers!


###### GIT ######
Exclude the following folders on git repo:
1. node_modules
2. .dfx
3. \src\declarations
4. \target
5. .env


### Installation ###
# install Rust on WSL
1. curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
2. source $HOME/.cargo/env
3. rustup target add wasm32-unknown-unknown
4. rustup target list --installed

# GCC
1. sudo apt update
2. sudo apt install build-essential

# RUN
1. cd FortuneForest
2. npm install
3. dfx start --background
4. cargo clean
5. cargo build
6. dfx deploy

# UPDATING BACKEND
dfx canister install --mode=upgrade fortuneForest_backend
Note: The database in canister will be reset if 'dfx deploy' is used

# Removing all canisters
1. dfx start or dfx start --background
2. go to folder (ex. cd fortuneForest)
3. dfx canister uninstall-code --all
4. dfx stop
Note: The database in canister won't reset if 'dfx stop' is used or even pc shutdown