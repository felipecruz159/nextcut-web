import Header from "@/app/_components/header";
import BackButton from "@/app/_components/ui/backButton";
import RegisterProfessionalForm from "./_components/register-professional-form";

const RegisterProfessional = () => {
   return (
      <>
         <Header />
         <div className="px-6 py-5">
            <BackButton />
         </div>
         <div className="px-6">
            <h1>Estamos quase lá!</h1>
            <p className="py-3 text-muted-foreground">Preencha os campos antes de finalizarmos o seu cadastro como parceiro(a)!</p>
         </div>
         <div className="px-6">
            <RegisterProfessionalForm />
         </div>
      </>
   );
}

export default RegisterProfessional;