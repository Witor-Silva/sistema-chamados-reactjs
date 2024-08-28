import { useContext, useState } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../context/auth';
import { db, storage } from '../../services/firebaseConnection';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { toast } from 'react-toastify';

import './profile.css';



export default function Profile() {

    const { user, storageUser, setUser, logout } = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl) // <-- Estado para enviar url da imagem para o banco de dados
    const [imageAvatar, setImageAvatar] = useState(null);  // <-- Estado para armazenar o arquivo enviado para o banco de dados

    const [nome, setNome] = useState(user && user.name); // , <-- Estado para exibir o cadastro do nome do banco de dados
    const [email, setEmail] = useState(user && user.email); // <-- Estado para exibir o cadastro de email do banco de dados

    function handleFile(e){
        if(e.target.files[0]){
            const image = e.target.files[0]
    
            if(image.type === 'image/jpeg' || 'image/jpg' || 'image/png'){
                setImageAvatar(image)
                setAvatarUrl(URL.createObjectURL(image))
    
            }else{
                alert( "Envie uma image do tipo JPEG, JPG ou PNG !" )
                setAvatarUrl(null);
                return;
            }
        }
    }

    async function handleUpload(){
        const currentUid = user.uid;

        const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)

        const uploadTask = uploadBytes(uploadRef, imageAvatar)
        .then(() => {
            console.log('ENVIADO COM SUCESSO')
        })

    }

    async function handleSubmit(e){
        e.preventDefault();

        if(imageAvatar === null && nome !== ''){
            //Atualizar apenas o nome do usurario
            const docRef = doc(db, "users", user.uid) // <-- "users" é o nome da collection (tabela) do banco de dados
            await updateDoc(docRef, {
                name: nome,
            })
            .then(()=> {
                let data = {
                    ...user,
                    name: nome,
                }
                setUser(data);
                storageUser(data);
                toast.success("Atualizado com sucesso!")
            })
        }
        
        if(imageAvatar !== null && nome !== ""){
            //Atualizar a image e o nome do usuario
        handleUpload()
        
        }
    }


    return (
        <div>
            <Header />

            <div className='content'>
                <Title name="Minha conta">
                    <FiSettings size={25} />
                </Title>
                <div className='container'>

                    <form className='form-profile' onSubmit={handleSubmit}>

                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#fff' size={25} />
                            </span>

                            <input type='file' accept='image/*' onChange={handleFile}/> <br />

                            {avatarUrl === null ? (
                                <img src={avatar} alt='Foto de perfil' width={250} height={250} />
                            ) : (
                                <img src={avatarUrl} alt='Foto de perfil' width={250} height={250} />
                            )}
                        </label>

                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(changeName) => setNome(changeName.target.value)} /> {/*onChange para alterar o nome do usuario */}

                        <label>Email</label>
                        <input type="text" value={email} disabled={true} />

                        <button type="submit">Salvar</button>
                    </form>
                </div>

                    <div className="container">
                        <button className="logout-btn" onClick={() => logout()}>Sair</button>
                    </div>

            </div>
        </div>
    )
}