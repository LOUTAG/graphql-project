
/*** components ***/
import Header from "./Header";
import Footer from "./Footer";

const Layout =({children})=>{
    return(
        <>
            <Header />
            <main className="flex flex-wrap items-center justify-center pt-[3.125rem] overflow-x-hidden min-h-screen">
                {children}
            </main>
            <Footer />
        </>
    )
}
export default Layout;