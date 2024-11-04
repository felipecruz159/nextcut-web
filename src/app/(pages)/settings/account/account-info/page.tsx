import { AlternativeHeader } from "@/app/_components/alternativeHeader";
import AccountInfoForm from "./_components/accountInfoForm";

export const AccountInfo = async () => {

    return (
      <div className="container">
        <AlternativeHeader variant={'logo'} />
        <p className="text-center text-muted-foreground m-1">Seu e-mail não pode ser alterado, porque é a informação principal de acesso à sua conta.</p>
        <AccountInfoForm />
      </div>
    );
  };
  
  export default AccountInfo;
  
  