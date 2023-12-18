import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title)
      setAddress(data.address)
      setAddedPhotos(data.photos)
      setDescription(data.description)
      setPerks(data.perks)
      setExtraInfo(data.extraInfo)
      setCheckIn(data.checkIn)
      setCheckOut(data.checkOut)
      setMaxGuests(data.maxGuests)
    });
  }, [id]);

  // const handleChange = (name) => (value) => {
  //     setFormData((prev) => ({
  //         ...prev,
  //         [name]: value,
  //       })
  //       );
  //   };

  // const [formData, setFormData] = useState({});

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  async function addNewPlace(e) {
    e.preventDefault();
    await axios.post("/places", {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    setRedirect(true);
  }

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={addNewPlace}>
        {preInput(
          "Título",
          "Título para o seu espaço. deve ser pequeno e cativante como em uma propaganda"
        )}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="título, por exemplo: Meu lindo apartamento"
        />
        {preInput("Endereço", "Endereço do local")}
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="endereço"
        />
        {preInput("Fotos", "Mais = melhor")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Descrição", "descrição do local")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {preInput("Vantagens", "selecione todas as vantagens do seu lugar")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Informações extras", "regras do local, etc")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        {preInput(
          "Horários check-in e check-out",
          "adicione horários de check-in e check-out, lembre-se de deixar uma janela de tempo para limpar o espaço entre os convidados"
        )}
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2 -mb-1">Horário do check-in</h3>
            <input
              type="text"
              value={chekIn}
              onChange={(e) => setChekIn(e.target.value)}
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Horário do check-out</h3>
            <input
              type="text"
              value={chekOut}
              onChange={(e) => setChekOut(e.target.value)}
              placeholder="23"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Máximo número de convidados</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Salvar</button>
      </form>
    </div>
  );
}
