import "@styles/globals.css"
import Nav from "@components/Nav";
import Provider from "../components/Provider";

export const metadata = {
    title: "CodeTopia",
    description: "Discover AI Prompts"
}


export default function RootLayout({children} : {
    children: React.ReactNode,
}){

// console.log("HELLO", session);

  return (
    <html lang="en">
        <body>
            <Provider>
                <div className="main">
                    <div className="gradient"/>                
                </div>
                <main className="app">
                    <Nav/>
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

