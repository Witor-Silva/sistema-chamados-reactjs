const formatCNPJ = (value) => {
  return value
    .replace(/\D/g, "") // Remove qualquer coisa que não seja dígito
    .replace(/^(\d{2})(\d)/, "$1.$2") // Adiciona um ponto após os primeiros 2 dígitos
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // Adiciona um ponto após os próximos 3 dígitos
    .replace(/\.(\d{3})(\d)/, ".$1/$2") // Adiciona uma barra após os próximos 3 dígitos
    .replace(/(\d{4})(\d)/, "$1-$2") // Adiciona um hífen após os próximos 4 dígitos
    .replace(/(-\d{2})\d+?$/, "$1"); // Limita a 14 dígitos (CNPJ completo)
};

//   const MyComponent = () => {
//     const [cnpj, setCnpj] = useState('');

//     const handleCnpjChange = (e) => {
//       setCnpj(formatCNPJ(e.target.value));
//     };

//     return (
//         <div>
//           <label>CNPJ</label>
//           <input
//             type="text"
//             placeholder="Digite o CNPJ"
//             value={cnpj}
//             onChange={handleCnpjChange}
//           />
//         </div>
//       );
//     };

export default formatCNPJ;
// export default MyComponent;
