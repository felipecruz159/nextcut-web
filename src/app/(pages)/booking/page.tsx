'use client'
import { useState } from 'react';
import Calendar from 'react-calendar';
import { isToday, isBefore, subDays, isSameDay, getDay } from 'date-fns'; // Importando getDay do date-fns
import '../../CSS/calendar.css'; // Importando o CSS

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const MeuCalendario = () => {
   const [value, onChange] = useState<Value>(new Date()); // Estado para armazenar a data selecionada

   // Calcula a data de ontem
   const yesterday = subDays(new Date(), 1); // Subtrai 1 dia da data atual

   // Data do dia 12/11/2024
   const disableDate = new Date(2024, 10, 12); // 10 é novembro (os meses começam do 0)

   // Função para verificar se o dia é o atual
   const tileClassName = ({ date, view }: { date: Date; view: string }) => {
      // Verifica se o dia é o hoje
      if (isToday(date)) {
         return 'react-calendar__tile--today'; // Aplica uma classe especial para o dia de hoje
      }

      // Verifica se é o dia 12/11/2024
      if (isSameDay(date, disableDate)) {
         return 'react-calendar__tile--disabled'; // Aplica uma classe de estilo para o dia desabilitado
      }

      // Desabilita os dias antes de ontem e aplica uma classe
      if (isBefore(date, yesterday)) {
         return 'react-calendar__tile--disabled'; // Aplica uma classe de estilo para os dias desabilitados
      }

      // Desabilita os domingos
      if (getDay(date) === 0) { // 0 significa domingo
         return 'react-calendar__tile--disabled'; // Aplica uma classe de estilo para o dia desabilitado
      }

      return '';
   };

   // Função para desabilitar os dias antes de ontem, o dia específico (12/11/2024) e os domingos
   const tileDisabled = ({ date }: { date: Date }) => {
      return (
         isBefore(date, yesterday) ||
         isSameDay(date, disableDate) || // Desabilita o dia 12/11/2024
         getDay(date) === 0 // Desabilita os domingos
      );
   };

   // Função que será chamada ao selecionar um dia
   const handleDateChange = (newValue: Value, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onChange(newValue); // Atualiza o estado com a nova data
      console.log("Data selecionada:", newValue); // Exibe a data selecionada no console
   };

   return (
      <>
         <div className="calendar-container">
            <Calendar
               onChange={handleDateChange} // Passa a função para atualizar o estado com a data selecionada
               value={value} // Passa o valor atual para o calendário, o que marca o dia selecionado
               className="react-calendar"
               tileClassName={tileClassName} // Passando a função para o calendário
               tileDisabled={tileDisabled} // Passando a função para desabilitar os dias
            />
         </div>
      </>
   );
}

export default MeuCalendario;
