import { useState } from "react";
import useWeb3 from "../hooks/useWeb3";

export const ERC721Checker = () => {

  const { userAddress, getTokenURI } = useWeb3();
  const [tokenId, setTokenId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [onGoing, setOnGoing] = useState(false);

  const submit = async () => {
    setOnGoing(true);
    try {
      const tokenUri = await getTokenURI(tokenId);
      const url = tokenUri.replace(/^ipfs:\/\//, "https://nftstorage.link/ipfs/");
      const res = await fetch(url);
      const data = await res.json();
      setName(data.name);
      setDescription(data.description);
      setImage(data.image.replace(/^ipfs:\/\//, "https://ipfs.io/ipfs/"));
    } catch (err) {
      console.error(err);
    } finally {
      setOnGoing(false);
    }
  };

  return (
    <div className="wrapper">
      <p className="title">Шаг2: Получите информацию об активе</p>
      <input
        placeholder="Идентификатор актива"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
        type="text"
      />
      {onGoing ? (
        <div className="center">Подождите...</div>
      ) : (
        <button onClick={submit}>Получить информацию</button>
      )}
      {name ? <p>Название актива: {name}</p> : <></>}
      {description ? <p>Описание: {description}</p> : <></>}
      {image ? <img src={image} alt="image" className="image" /> : <></>}
    </div>
  );
};
