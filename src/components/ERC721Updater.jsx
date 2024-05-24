import { useState } from "react";
import useWeb3 from "../hooks/useWeb3";

export const ERC721Updater = () => {

  const { updateTokenURI } = useWeb3();
  const [tokenId, setTokenId] = useState("");
  const [newTokenURI, setNewTokenURI] = useState("");
  const [onGoing, setOnGoing] = useState(false);

  const submit = async () => {
    setOnGoing(true);
    try {
      await updateTokenURI(tokenId, newTokenURI);
      console.log("Метаданные токена обновленны успешно");
    } catch (err) {
      console.error("Ошибка обновления метаданных:", err);
    } finally {
      setOnGoing(false);
    }
  };

  return (
    <div className="wrapper">
      <p className="title">Шаг 3: Обновите описание актива</p>
      <input
        placeholder="Идентификатор актива"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
        type="text"
      />
      <input
        placeholder="Описание"
        value={newTokenURI}
        onChange={(e) => setNewTokenURI(e.target.value)}
        type="text"
      />
      <input type="file" accept="image/*" />
      {onGoing ? (
        <div className="center">Пожалуйста, подождите</div>
      ) : (
        <button onClick={submit}>Обновить</button>
      )}
    </div>
  );
};
