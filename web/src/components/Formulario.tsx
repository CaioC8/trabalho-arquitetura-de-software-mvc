import React from "react";

export interface CampoConfig {
  name: "id" | "nome" | "email";
  label: string;
  type: "text" | "number" | "email";
  placeholder: string;
}

export interface BotaoConfig {
  label: string;
  onClick: () => void;
  className?: string;
}

interface FormularioProps {
  campos: CampoConfig[];
  botoes: BotaoConfig[];
  formData: { id: string; nome: string; email: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Formulario: React.FC<FormularioProps> = ({
  campos,
  botoes,
  formData,
  handleInputChange,
}) => {
  return (
    <>
      {campos.map((campo) => (
        <div className="form-grupo" key={campo.name}>
          <label htmlFor={campo.name}>{campo.label}</label>
          <input
            type={campo.type}
            name={campo.name}
            id={campo.name}
            value={formData[campo.name]}
            onChange={handleInputChange}
            placeholder={campo.placeholder}
          />
        </div>
      ))}

      {botoes.map((botao, index) => (
        <div className="form-grupo" key={index}>
          <button onClick={botao.onClick} className={botao.className}>
            {botao.label}
          </button>
        </div>
      ))}
    </>
  );
};

export default Formulario;
