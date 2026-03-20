import styles from "./page.module.scss"
import Page from "@/components/ui/Page"
import CatalogPresentationSection from "@/components/CatalogPresentationSection"
import FirstScreenSection from "@/components/MainPage/FirstScreenSection"
import LifeSpaceSection from "@/components/MainPage/LifeSpaceSection"
import GlleryAbout from "@/components/MainPage/GlleryAbout"
import BestOffersSection from "@/components/MainPage/BestOffersSection"
import PersonalDiscountFormSection from "@/components/MainPage/PersonalDiscountFormSection"
import ExcursionSection from "@/components/MainPage/ExcursionSection"
import PurchaseWaysSection from "@/components/MainPage/PurchaseWaysSection"
import AboutTabs from "@/components/MainPage/AboutTabs"
import GallerySection from "@/components/MainPage/GallerySection"
import FaqSection from "@/components/MainPage/FaqSection"
import ResidentsStoriesSlider from "@/components/ResidentsStoriesSlider"
import MortgageHelpSection from "@/components/MainPage/MortgageHelpSection"
import Location from "@/components/location"
import SuggestSection from "@/components/MainPage/SuggestSection"
import AutoHotOfferDialog from "@/components/AutoHotOfferDialog"

export default function Home() {
  return (
    <Page className={styles.page}>
      <FirstScreenSection />

      <CatalogPresentationSection />

      <AboutTabs />

      <BestOffersSection />

      <PersonalDiscountFormSection />

      <GlleryAbout />

      <GallerySection />

      <SuggestSection />

      <PurchaseWaysSection />

      <MortgageHelpSection />

      <LifeSpaceSection />

      <FaqSection />

      <ResidentsStoriesSlider />

      <ExcursionSection />

      <Location />

      <AutoHotOfferDialog />
    </Page>
  )
}
