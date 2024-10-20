import "./upload.css";
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { db, storage } from "../../services/firebaseConnection"; // Firebase imports
import { doc, setDoc, updateDoc } from "firebase/firestore"; // Firestore imports
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage imports
import { toast } from "react-toastify";

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
    setUploading(true);

    if (typeof acceptedFiles[0] === 'undefined') {
      toast.error('Nenhum arquivo foi selecionado.');
      setUploading(false);
      return;
    }

    const file = acceptedFiles[0];

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Tipo de arquivo não permitido. Selecione uma imagem JPEG ou PNG.');
      setUploading(false);
      return;
    }

    try {
      const storageRef = ref(storage, `uploads/${file.name}`);
      const uploadResult = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(uploadResult.ref);

      // Atualize o caminho com a coleção e o ID corretos
      const docRef = doc(db, "your_collection", "your_document_id");

      // Use setDoc para criar ou atualizar o documento
      await setDoc(docRef, {
        imageUrl: downloadURL,
      }, { merge: true }); // 'merge: true' mantém os dados existentes no documento

      toast.success('Arquivo salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar arquivo:', error);
      toast.error(`Falha ao salvar arquivo`);
    } finally {
      setUploading(false);
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
