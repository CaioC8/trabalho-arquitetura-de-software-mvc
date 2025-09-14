import { useState } from "react";
import * as api from "../api/apiService";
import Formulario, {
  type CampoConfig,
  type BotaoConfig,
} from "./components/Formulario";
import "./index.css";

type Acao = "buscar" | "adicionar" | "alterar" | "deletar";

function App() {
  const [acaoAtiva, setAcaoAtiva] = useState<Acao>("buscar");
  const [formData, setFormData] = useState({ id: "", nome: "", email: "" });
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const executarAcao = async (acaoFn: () => Promise<any>) => {
    setLoading(true);
    setError(null);
    setResultado(null);
    try {
      const response = await acaoFn();
      setResultado(response.data);
    } catch (err: any) {
      const errorData = err.response?.data;
      setError(errorData?.mensagem || err.message || "Ocorreu um erro.");
    } finally {
      setLoading(false);
    }
  };

  const acoes = {
    buscarTodos: () => executarAcao(api.getTodosUsuarios),
    buscarPorId: () =>
      executarAcao(() => api.getUsuarioPorId(Number(formData.id))),
    adicionarUsuario: () =>
      executarAcao(() =>
        api.criarUsuario({ nome: formData.nome, email: formData.email })
      ),
    alterarUsuario: () =>
      executarAcao(() =>
        api.atualizarUsuario(Number(formData.id), {
          nome: formData.nome,
          email: formData.email,
        })
      ),
    deletarUsuario: () =>
      executarAcao(() => api.deletarUsuario(Number(formData.id))),
  };

  // Lógica para gerar a configuração do formulário com base na ação ativa
  const getFormConfig = (): {
    campos: CampoConfig[];
    botoes: BotaoConfig[];
  } => {
    switch (acaoAtiva) {
      case "buscar":
        return {
          campos: [
            {
              name: "id",
              label: "Buscar por ID",
              type: "number",
              placeholder: "ID do usuário",
            },
          ],
          botoes: [
            { label: "Buscar por ID", onClick: acoes.buscarPorId },
            { label: "Buscar Todos", onClick: acoes.buscarTodos },
          ],
        };
      case "adicionar":
        return {
          campos: [
            {
              name: "nome",
              label: "Nome",
              type: "text",
              placeholder: "Nome do usuário",
            },
            {
              name: "email",
              label: "Email",
              type: "email",
              placeholder: "E-mail do usuário",
            },
          ],
          botoes: [{ label: "Enviar", onClick: acoes.adicionarUsuario }],
        };
      case "alterar":
        return {
          campos: [
            {
              name: "id",
              label: "ID do Usuário a Alterar",
              type: "number",
              placeholder: "ID do usuário",
            },
            {
              name: "nome",
              label: "Novo Nome",
              type: "text",
              placeholder: "Deixe em branco para não alterar",
            },
            {
              name: "email",
              label: "Novo Email",
              type: "email",
              placeholder: "Deixe em branco para não alterar",
            },
          ],
          botoes: [
            {
              label: "Alterar",
              onClick: acoes.alterarUsuario,
              className: "put",
            },
          ],
        };
      case "deletar":
        return {
          campos: [
            {
              name: "id",
              label: "ID do Usuário a Deletar",
              type: "number",
              placeholder: "ID do usuário",
            },
          ],
          botoes: [
            {
              label: "Deletar",
              onClick: acoes.deletarUsuario,
              className: "delete",
            },
          ],
        };
    }
  };

  const formConfig = getFormConfig();

  return (
    <main>
      <section className="controles">
        <nav>
          {(["buscar", "adicionar", "alterar", "deletar"] as Acao[]).map(
            (acao) => (
              <button
                key={acao}
                className={acaoAtiva === acao ? "active" : ""}
                onClick={() => setAcaoAtiva(acao)}
              >
                {acao.charAt(0).toUpperCase() + acao.slice(1)}
              </button>
            )
          )}
        </nav>
        <div className="formulario-container">
          <Formulario
            campos={formConfig.campos}
            botoes={formConfig.botoes}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        </div>
      </section>

      <section className="resultados">
        <h2>Resultado</h2>
        {loading && <p className="loading">Carregando...</p>}
        {error && <p className="error">{error}</p>}
        {resultado && <pre>{JSON.stringify(resultado, null, 2)}</pre>}
      </section>
    </main>
  );
}

export default App;
