1. Создайте ваше DApp с Bunzz

Пожалуйста, перейдите на Bunzz https://app.bunzz.dev/.

Для этого приложения вам нужно как минимум развернуть смарт-контракт "NFT (IPFS Mintable)".

2. Настройте окружение

Создание хранилища NFT
NFT Storage — это бесплатное хранилище для NFT.
Пожалуйста, перейдите на эту страницу и войдите в систему.
https://nft.storage/
Вы можете получить ваш API ключ на странице API Keys.

Добавьте REACT_APP_NFT_STORAGE_KEY в файл .env.

REACT_APP_NFT_STORAGE_KEY=ВАШ_NFT_STORAGE_KEY
Добавьте INFURA_KEY
Добавьте REACT_APP_INFURA_KEY в файл .env.


REACT_APP_INFURA_KEY=ВАШ_INFURA_KEY
Вы можете обратиться к этому руководству: https://ethereumico.io/knowledge-base/infura-api-key-guide/

Добавьте название сети
Добавьте REACT_APP_NETWORK в файл .env.

*** Не делитесь личными ключами на github ***

3. Обновите constant.js
Откройте файл utils/constant.js.

Добавьте это в NETWORK_LIST

goerli: {
    chainName: "Goerli Testnet",
    chainIdHex: "0x5",
    chainId: 5,
    RPC: "https://goerli.infura.io/v3/" + process.env.REACT_APP_INFURA_KEY,
    contracts: {
        ERC721URIStorage: ""
    }
}
Установите ERC721URIStorage с адресом контракта, который вы развернули.

4. Запустите приложение

$ yarn install
$ yarn start




