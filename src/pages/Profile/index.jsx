import { useContext, useState } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../context/auth';

export default function Profile() {

    const { user } = useContext(AuthContext);
    

    return (
        <div>
            <Header />

            <div className='content'>
                <Title name="Minha conta">
                    <FiSettings size={25} />
                </Title>
                <div className='container'>
                
                <form className='form-profile'>

                <label className='label-avatar'>
                    <label>
                        <FiUpload color='#fff' size={25}/>
                    </label>

                    <input type='file' accept='image/*'/> <br />
                    {}
                </label>
                </form>
                
                </div>

            </div>
        </div>
    )
}