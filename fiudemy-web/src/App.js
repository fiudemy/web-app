import * as React from 'react';
/*import ProductCategories from './modules/views/ProductCategories';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import ProductValues from './modules/views/ProductValues';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import ProductCTA from './modules/views/ProductCTA';*/
import AppAppBar from './modules/views/AppAppBar';
import ProductHero from './modules/views/ProductDescription';
import withRoot from './modules/withRoot';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <React.Fragment>
          <AppAppBar />
          <ProductHero />
        </React.Fragment>
      </header>
    </div>
  );
}

export default withRoot(App);

/*
<ProductHero />
          <ProductValues />
          <ProductCategories />
          <ProductHowItWorks />
          <ProductCTA />
          <ProductSmokingHero />
          <AppFooter />

*/