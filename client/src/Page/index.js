import Home from '../components/Home';
import  PageContent from '../PageContent'



function Page({ currentPage }) {

    const renderPage = () => {
      switch (currentPage.name) {
        case 'Home':
            return <Home />
        // case 'Collection':
        //   return <Collection />;
        // case 'Browse':
        //   return <Browse />;
        // // case 'Random':
        // //   return <Random />;
        // case 'About':
        //   return <About />;
        default:
          return <Home />;
      }
    };
  
    return (
      <section>
        {/* <h2>{currentPage.name}</h2> */}
        <PageContent>{renderPage()}</PageContent>
      </section>
    );
  }
  export default Page;