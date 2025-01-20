import LandPage from './landpage';
import { Navbar } from './navbar';
import CarReveal from "./car_reveal";
export default function HomePage() {
    return (
        <>
            <div>
            <Navbar/>
                <div className="relative row-start-2 row-end-3 items-center">
                    <LandPage />
                </div>
                <div className="row-start-3 row-end-4 overflow-hidden">
                    <CarReveal />
                </div>
            </div>
        </>
    );
}
  