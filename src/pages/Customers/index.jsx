import { useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import FormatCnpj from "../../components/FormatCnpj/index";

import { FiUser } from "react-icons/fi";

import { db } from "../../services/firebaseConnection";
import { addDoc, collection, updateDoc } from "firebase/firestore";

import { toast } from "react-toastify";

export default function Customers() {
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    if (nomeEmpresa !== "" && cnpj !== "" && endereco !== "") {
      await addDoc(collection(db, "customers"), {
        nomeFantsaia: nomeEmpresa,
        cnpj: cnpj,
        endereco: endereco,
      })
        .then(() => {
          setNomeEmpresa("");
          setCnpj("");
          setEndereco("");
          toast.success("Empresa cadastrada com sucesso!");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Erro ao fazer o cadastro!");
        });
    } else {
      toast.error("Preencha todos os campos!");
    }
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name={"Clientes"}>
          <FiUser size={25} />
        </Title>
        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Nome fantasia</label>
            <input
              type="text"
              placeholder="Nome da empresa"
              value={nomeEmpresa}
              onChange={(e) => setNomeEmpresa(e.target.value)}
            />

            <label>CNPJ</label>
            <input
              type="text"
              placeholder="Digite o CNPJ"
              value={cnpj}
              onChange={(e) => setCnpj(FormatCnpj(e.target.value))}
            />

            <label>Endereço</label>
            <input
              type="text"
              placeholder="Endereço da empresa"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
