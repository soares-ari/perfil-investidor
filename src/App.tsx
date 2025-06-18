import { useState } from 'react';

type Perfil = 'conservador' | 'moderado' | 'arrojado' | null;

const perguntas = [
  {
    id: 1,
    texto: 'Qual sua experiência com investimentos?',
    opcoes: [
      { texto: 'Nenhuma', valor: 1 },
      { texto: 'Alguma', valor: 2 },
      { texto: 'Ampla', valor: 3 },
    ],
  },
  {
    id: 2,
    texto: 'Como você reage a perdas financeiras?',
    opcoes: [
      { texto: 'Fico muito desconfortável', valor: 1 },
      { texto: 'Aceito perdas moderadas', valor: 2 },
      { texto: 'Aceito grandes riscos', valor: 3 },
    ],
  },
  {
    id: 3,
    texto: 'Qual seu objetivo principal ao investir?',
    opcoes: [
      { texto: 'Preservar capital', valor: 1 },
      { texto: 'Equilibrar risco e retorno', valor: 2 },
      { texto: 'Maximizar retorno', valor: 3 },
    ],
  },
];

function App() {
  const [respostas, setRespostas] = useState<number[]>(Array(perguntas.length).fill(0));
  const [perfil, setPerfil] = useState<Perfil>(null);

  const handleResposta = (indice: number, valor: number) => {
    const novasRespostas = [...respostas];
    novasRespostas[indice] = valor;
    setRespostas(novasRespostas);
  };

  const calcularPerfil = () => {
    const soma = respostas.reduce((acc, val) => acc + val, 0);
    const media = soma / respostas.length;

    if (media <= 1.5) setPerfil('conservador');
    else if (media <= 2.3) setPerfil('moderado');
    else setPerfil('arrojado');
  };

  const resetar = () => {
    setRespostas(Array(perguntas.length).fill(0));
    setPerfil(null);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: 600, margin: '0 auto' }}>
      <h1>Descubra seu Perfil de Investidor</h1>

      {perfil === null ? (
        <>
          {perguntas.map((pergunta, i) => (
            <div key={pergunta.id} style={{ marginBottom: '1.5rem' }}>
              <strong>{pergunta.texto}</strong>
              <div>
                {pergunta.opcoes.map((opcao, j) => (
                  <label key={j} style={{ display: 'block', marginTop: 4 }}>
                    <input
                      type="radio"
                      name={`pergunta-${i}`}
                      value={opcao.valor}
                      checked={respostas[i] === opcao.valor}
                      onChange={() => handleResposta(i, opcao.valor)}
                    />
                    {' '}{opcao.texto}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button onClick={calcularPerfil} disabled={respostas.includes(0)}>
            Enviar
          </button>
        </>
      ) : (
        <>
          <h2>Seu perfil é: {perfil.toUpperCase()}</h2>
          <button onClick={resetar}>Refazer questionário</button>
        </>
      )}
    </main>
  );
}

export default App;
