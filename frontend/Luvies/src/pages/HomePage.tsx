import Header from '../layout/Header.tsx'
import Footer from '../layout/Footer.tsx'

import PosterSlider from '../components/PosterSlider.tsx'

export const HomePage = () => {
    return (
        <>
        <Header />
        <div className="image-container">
            <PosterSlider />
        </div>
        <Footer />
        </>
    )
}

export default HomePage;