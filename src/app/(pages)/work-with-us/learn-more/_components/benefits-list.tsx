import {
  BarChart,
  Bell,
  Calendar,
  CreditCard,
  Globe,
  Info,
  Megaphone,
  MousePointer,
  Star,
  Users,
} from "lucide-react";
import Benefits from "../types/Benefits";

const benefits: Benefits[] = [
  {
    title: "Gerenciamento Eficiente de Agendamentos",
    description:
      "Organize e acompanhe todos os agendamentos de clientes em um só lugar, reduzindo a chance de erros e sobrecarga.",
    icon: <Calendar />,
  },
  {
    title: "Notificações e Lembretes Automáticos",
    description:
      "Envie lembretes automáticos para os clientes e receba notificações para reduzir o número de ausências e cancelamentos de última hora.",
    icon: <Bell />,
  },
  {
    title: "Acesso a Relatórios e Estatísticas",
    description:
      "Obtenha insights detalhados sobre o desempenho do salão, como número de atendimentos, receitas e preferências dos clientes.",
    icon: <BarChart />,
  },
  {
    title: "Gestão de Funcionários e Tarefas",
    description:
      "Gerencie a agenda de cada profissional do salão, atribua tarefas e visualize a disponibilidade de todos os membros da equipe.",
    icon: <Users />,
  },
  {
    title: "Integração com Pagamentos Online",
    description:
      "Permita que os clientes paguem pelos serviços diretamente pelo aplicativo, facilitando o processo de pagamento e aumentando a eficiência.",
    icon: <CreditCard />,
  },
  {
    title: "Marketing e Promoções",
    description:
      "Crie e gerencie campanhas promocionais, envie ofertas especiais e acesse ferramentas de marketing para atrair e fidelizar clientes.",
    icon: <Megaphone />,
  },
  {
    title: "Feedback e Avaliações",
    description:
      "Receba feedback dos clientes e colete avaliações sobre os serviços prestados, ajudando a melhorar a qualidade e o atendimento do salão.",
    icon: <Star />,
  },
  {
    title: "Plataforma Confiável e Intuitiva",
    description:
      "Acesso a uma plataforma fácil de usar que ajuda clientes a encontrarem e agendarem seus serviços com facilidade.",
    icon: <Globe />,
  },
  {
    title: "Recursos Exclusivos",
    description:
      "Acesso a ferramentas e funcionalidades exclusivas para se destacar no mercado competitivo.",
    icon: <Info />,
  },
];
export const BenefitsList = () => {
  return (
    <div className="container">
      <h1 className="font-bold md:text-2xl text-lg mb-6">Benefícios</h1>
      <div className="flex flex-wrap gap-3 justify-center ">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="bg-black text-wrap border border-muted flex flex-col items-center text-center w-screen lg:w-1/4 p-3 rounded-xl"
          >
            <div className="m-2">{benefit.icon}</div>
            <h1 className="font-bold text-lg">{benefit.title}</h1>
            <p className="text-sm">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
