import { Fragment } from "react";

import HomeNavbar from "../../components/home/HomeNavbar/HomeNavbar";
import Hero from "../../components/home/Hero/Hero";
import FeatureSection from "../../components/home/FeatureSection/FeatureSection";
import HowItWorks from "../../components/home/HowItWorks/HowItWorks";
import CallToAction from "../../components/home/CallToAction/CallToAction";
import HomeFooter from "../../components/home/HomeFooter/HomeFooter";

import "./Home.css";

function Home() {

    return (

        <Fragment>

            <div className="home-page">

                <HomeNavbar />

                <main className="home-main">

                    <Hero />

                    <FeatureSection />

                    <HowItWorks />

                    <CallToAction />

                </main>

                <HomeFooter />

            </div>

        </Fragment>

    );

}

export default Home;