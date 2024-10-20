<h1>FortuneForest 🌴🌳</h1>

FortuneForest is a Web3 based game hosted on ICP's decentralized network. With the ultimate aim to restore Philippines ecological and forest biodiversity through reforestation while provididng entertainment and worth while accomplishment to every Ecogamers!


###### GIT ######
Exclude the following folders on git repo:
1. node_modules
2. .dfx
3. \src\declarations
4. \target
5. .env


### Prerequisites ###
# Install Rust on WSL
1. curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
2. source $HOME/.cargo/env
3. rustup target add wasm32-unknown-unknown
4. rustup target list --installed

# GCC
1. sudo apt update
2. sudo apt install build-essential

### First Run ###
# RUN
1. cd FortuneForest
2. npm install
3. dfx start --background
4. cargo clean; cargo build
5. dfx deploy

# UPDATING BACKEND
1. dfx canister call fortuneForest_backend save_users_to_stable_storage '()' #always save current database
2. cargo clean; cargo build #ONLY IF THERE IS NEW PACKAGE
3. dfx deploy

# Removing all canisters
1. dfx start or dfx start --background
2. go to folder (ex. cd fortuneForest)
3. dfx canister uninstall-code --all
4. dfx stop

#NPM Packages
![Alt text](https://cdn.worldvectorlogo.com/logos/radix-ui.svg) radix-ui
clsx
class-variance-authority
framer-motion
gsap
lucide-react
sonner
swiper
tailwind
shadcn
magicui
react-router
emotion

<hr>
<h1>Tech Stack</h1>

* Internet Computer Protocol
* ReactJS
* TypeScript

<h1> Meet the Team </h1>

<p>Project Manager: Vince Austria</p>
<p>Backend Developer: Jefferson Regacho</p>
<p>Frontend Developers: Gian Alcantara & Azer Sagucio</p>
<p>Frontend Designer: Laurence Enarin </p>
