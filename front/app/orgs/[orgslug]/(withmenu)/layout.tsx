import "@styles/globals.css";
import { Menu } from "@components/UI/Elements/Menu/Menu";
import AuthProvider from "@components/Security/AuthProvider";

export default async function RootLayout({ children, params }: { children: React.ReactNode , params:any}) {
  
  return (
    <>
      <AuthProvider>
        <Menu orgslug={params.orgslug}></Menu>
        {children}
      </AuthProvider>
    </>
  );
}
