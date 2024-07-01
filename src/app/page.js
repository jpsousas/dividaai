"use client"; // Adicione esta linha no topo

import React, { useState } from 'react';
import axios from 'axios';
//import NFCDataGrid from '../components/NFCDataGrid';
import Header from './components/Header'; 
import Footer from './components/Footer';
import DividiPopup from './components/popUp';
import { NFCDataGrid } from './components/Table';


const Page = () => {
  const [data, setData] = useState(null); // Estado para armazenar os dados da NFC-e
  const [totalValue, setTotalValue] = useState(0); // Estado para armazenar o valor total da compra
  const [loading, setLoading] = useState(false); // Estado para controlar o loading
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Estado para controlar a abertura do popup 
  const [error, setError] = useState(null); // Estado para armazenar erros
  const [numeroPessoas, setNumeroPessoas] = useState(1); 
  // Função para lidar com o submit do formulário (simulação)
  const handleSubmit = async (url) => {
    setLoading(true); // Ativa o loading

    try {
      const response = await axios.post('http://localhost:5000/process_nfc', { url });
      console.log('Response data:', response.data);

      // Define os dados recebidos e o valor total da compra
      setData(response.data.items); // Assumindo que response.data.items contém os itens da NFC-e
      setTotalValue(response.data.total_value); // Define o valor total da compra

      // Limpa erros anteriores
      setError(null);
    } catch (error) {
      console.error('Erro ao processar NFC-e:', error);
      setError('Erro ao processar NFC-e. Tente novamente mais tarde.');
    } finally {
      setLoading(false); // Desativa o loading
    }
  };
   
  const handleConfirm = (numeroPessoas) => {
    setNumeroPessoas(numeroPessoas);
    setIsPopupOpen(false);
  }
  
 //adapatar o chamamento do NFCDataGrid para receber os dados la de nome e qtd devedores
  return (
    
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Header onSubmit={handleSubmit} />
    <main style={{ flex: '1', padding: '20px' }}>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <button onClick={() => setIsPopupOpen(true)}>Dividir Conta</button>
       <DividiPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} onConfirm={handleConfirm} />
      {data && <NFCDataGrid data={data} totalValue={totalValue} numeroPessoas={numeroPessoas} />}
    </main>
    <Footer />
   
  </div>
  );
};

export default Page;
