import { useState } from "react";
import { NFTStorage, File } from "nft.storage";
import useWeb3 from "../hooks/useWeb3";

const nftStorage = new NFTStorage({
  token: process.env.REACT_APP_NFT_STORAGE_KEY,
});

const store = async (name, description, data, fileName, type) => {
  const metadata = await nftStorage.store({
    name,
    description,
    image: new File([data], fileName, { type }),
  });
  console.log(metadata);
  return metadata;
};

export const ERC721Minter = () => {
  const { userAddress, mintNFT } = useWeb3();
  const [blob, setBlob] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [base64, setBase64] = useState(null);
  const [onGoing, setOnGoing] = useState(false);
  const [tokenId, setTokenId] = useState(null);
  const [type, setType] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const select = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      readAsBlob(file);
      readAsBase64(file);
      setType(file.type);
      setFileName(file.name);
    }
  };

  const readAsBlob = (file) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      console.log(reader.result);
      setBlob(reader.result);
    };
  };

  const readAsBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      setBase64(reader.result);
    };
  };

  const submit = async () => {
    setOnGoing(true);
    try {
      const metadata = await store(name, description, blob, fileName, type);
      const inputUrl = metadata.url.replace(/^ipfs:\/\//, "");

      const tx = await mintNFT(userAddress, inputUrl);
      const receipt = await tx.wait();
      console.log(receipt);

      const event = receipt.logs[0];
      const _tokenId = event.transactionIndex + 1;
      setTokenId(_tokenId);
      setBase64(null);
      window.alert("NFT успешно создан!");
    } catch (err) {
      console.error(err);
    } finally {
      setOnGoing(false);
    }
  };

  return (
    <div className="wrapper">
      <p className="title">
        Шаг1: Создайте NFT актива
      </p>
      <input
        placeholder="Название актива"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
      <input
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
      />
      <input type="file" accept="image/*" onChange={select} />
      {base64 ? (
          <img src={base64} alt="hoge" className="image" />
      ) : (
        <></>
      )}
      {onGoing ? (
        <div className="center">
          Подождите...
        </div>
      ) : (
        <button onClick={submit}>
          Создать
        </button>
      )}
      {tokenId ? <p>Идентификатор актива: {tokenId}</p> : <></>}
    </div>
  );
};
