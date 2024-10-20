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

<h3>NPM Packages</h3>
<ul>
<li>radix-ui</li>
<li>clsx</li>
<li>class-variance-authority</li>
<li>framer-motion</li>
<li>gsap</li>
<li>lucide-react</li>
<li>sonner</li>
<li>swiper</li>
<li>tailwind</li>
<li>shadcn</li>
<li>magicui</li>
<li>react-router</li>
<li>emotion</li>
</ul>
<p><img src="https://cdn.worldvectorlogo.com/logos/radix-ui.svg" width="60" height="60"> <img src="https://cva.style/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fwallpaper-hd.6da17633.jpg&w=1920&q=75" width="50" height="60"><img src="https://www.ejable.com/wp-content/uploads/2022/04/Framer-Motion.webp" width="70" height="60"><img src="https://avatars.githubusercontent.com/u/66879934?s=48&v=4p" width="60" height="60"><img src="https://swiperjs.com/images/swiper-logo.svg" width="60" height="60"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" width="50" height="60"><img src="https://avatars.githubusercontent.com/u/139895814?s=200&v=4" width="60" height="60"><img src="https://avatars.githubusercontent.com/u/166878038?s=200&v=4" width="60" height="60"><img src="https://reactrouter.com/_brand/React%20Router%20Brand%20Assets/React%20Router%20Logo/One%20Color/Dark.svg" width="60" height="60"><img src="https://raw.githubusercontent.com/emotion-js/emotion/main/emotion.png" width="60" height="60"></p>


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
