import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import AppBanner from "../../components/appBanner";
import { ConfigContext } from "../../utils/configContext";
import type { TemplateConfig } from "../../utils/configType";
import Header from "./_components/header";
import Features from "./_components/features";
import Partners from "./_components/partners";
import Faq from "./_components/faq";
import HowItWorks from "./_components/howItWorks";
import Pricing from "./_components/pricing";
import Proof from "./_components/proof";
import Showcase from "./_components/showcase";
import Testimonials from "./_components/testimonials";

interface Props {
  config: TemplateConfig;
}

function Home({ config }: Props) {
  return (
    <ConfigContext.Provider value={config}>
      <main>
        <Navbar />
        <Header />
        <Partners />
        <Features />
        <HowItWorks />
        <div className="section-alt">
          <Showcase />
        </div>
        <Pricing />
        <Proof />
        <Testimonials />
        <Faq />
        <AppBanner />
        <Footer />
      </main>
    </ConfigContext.Provider>
  );
}

export default Home;
