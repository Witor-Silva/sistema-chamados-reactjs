import "./modal.css";
import { FiX } from "react-icons/fi";
import UploadFile from "../../components/UploadFile/index";

export default function Modal({ conteudo, close }) {
  return (
    <div className="modal">
      <div className="container">
        <button className="close" onClick={close}>
          <FiX size={25} color="#fff" />
        </button>

        <main>
          <h2>Detalhes do chamado</h2>

          <div className="row">
            <span>
              Cliente: <i>{conteudo.cliente}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Assunto: <i>{conteudo.assunto}</i>
            </span>

            <span>
              Criado em: <i>{conteudo.createdFormat}</i>
            </span>
          </div>
          <div className="row">
            <span>
              Status:
              <i
                className="status-badge"
                style={{
                  color: "#fff",
                  backgroundColor:
                    conteudo.status === "Aberto"
                      ? "#999"
                      : conteudo.status === "Progresso"
                      ? "#FF9000"
                      : "#5cb85c",
                }}
              >
                {conteudo.status}
              </i>
            </span>
          </div>

          {conteudo.complemento !== "" && (
            <>
              <h3>Complemento</h3>
              <p>{conteudo.complemento}</p>
            </>
          )}
          <div>
            <UploadFile />
          </div>
        </main>
      </div>
    </div>
  );
}
