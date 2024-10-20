import "./upload.css";
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { db, storage } from "../../services/firebaseConnection"; // Firebase imports
import { doc, updateDoc } from "firebase/firestore"; // Firestore imports
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage imports

function UploadFile() {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [uploading, setUploading] = useState(false); // Estado para indicar se o upload está acontecendo

  // Função para lidar com os arquivos selecionados
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader();

    file.onload = function () {
      setPreview(file.result);
    };

    file.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });

  // Função para manipular o envio e salvar no Firebase Storage
  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setUploading(true); // Definindo o estado de upload como verdadeiro

    // Verifica se há um arquivo
    if (typeof acceptedFiles[0] === 'undefined') return;

    const file = acceptedFiles[0]; // Pega o primeiro arquivo aceito

    try {
      // Cria uma referência no Firebase Storage para o arquivo
      const storageRef = ref(storage, `uploads/${file.name}`);

      // Faz o upload do arquivo
      const uploadResult = await uploadBytes(storageRef, file);

      // Obtém o URL de download do arquivo
      const downloadURL = await getDownloadURL(uploadResult.ref);

      // Atualiza o Firestore com o link da imagem
      const docRef = doc(db, "your_collection", "your_document_id"); // Atualize o caminho conforme necessário
      await updateDoc(docRef, {
        imageUrl: downloadURL, // Nome do campo no Firestore
      });

      console.log('Arquivo enviado e URL salvo no Firestore:', downloadURL);
    } catch (error) {
      console.error('Erro ao fazer upload ou salvar no Firestore:', error);
    } finally {
      setUploading(false); // Upload finalizado
    }
  }

  return (
    <form className="form" onSubmit={handleOnSubmit}>
      <div className="container-upload">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? <p>Solte os arquivos aqui ...</p> : <p>Arraste arquivos para cá ou clique para selecionar</p>}
        </div>

        {/* Pré-visualização da imagem */}
        {preview && (
          <p>
            <img
              src={preview as string}
              alt="Upload preview"
              height={150}
              width={450}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                const newTab = window.open(); // Abre uma nova aba
                if (newTab) {
                  const style = newTab.document.createElement('style');
                  style.innerHTML = `
                    .align-file {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      height: 100vh;
                      margin: 0;
                    }
                  `;
                  newTab.document.head.appendChild(style);

                  newTab.document.body.classList.add('align-file');
                  newTab.document.body.innerHTML = `<img src="${preview as string}" alt="Upload preview" />`;
                }
              }}
            />
          </p>
        )}
      </div>

      {/* Botão de submissão com estado de upload */}
      <button disabled={uploading}>{uploading ? "Uploading..." : "Submit"}</button>
    </form>
  );
}

export default UploadFile;
