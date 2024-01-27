import "@styles/globals.css"
import Nav from "@components/Nav";
import Provider from "../components/Provider";

export const metadata = {
    title: "CodeTopia",
    description: "Discover AI Prompts",
    icons: {
        icon: {
            url: "icon.ico",
            type: "image/ico"
        }

    }
}


export default function RootLayout({children} : {
    children: React.ReactNode,
}){

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

